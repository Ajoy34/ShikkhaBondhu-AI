import React, { useState } from 'react';
import { X, Upload, FileText, Loader, MessageSquare, Send, Trash2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface PDFChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const PDFChat: React.FC<PDFChatProps> = ({ isOpen, onClose }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('অনুগ্রহ করে শুধুমাত্র PDF ফাইল আপলোড করুন।');
      return;
    }

    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      alert('ফাইল খুব বড়! সর্বোচ্চ ২০ MB পর্যন্ত আপলোড করতে পারবেন।');
      return;
    }

    setIsProcessing(true);
    setPdfFile(file);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      
      // Convert to base64 in chunks
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
        binary += String.fromCharCode(...chunk);
      }
      const base64 = btoa(binary);
      
      setPdfBase64(base64);
      
      // Add welcome message
      setMessages([{
        id: Date.now().toString(),
        content: `✅ PDF "${file.name}" সফলভাবে আপলোড হয়েছে!\n\n📄 ফাইল সাইজ: ${(file.size / 1024 / 1024).toFixed(2)} MB\n\nএখন আপনি এই PDF সম্পর্কে যেকোনো প্রশ্ন করতে পারেন! 🎓`,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('PDF processing error:', error);
      alert('PDF প্রসেস করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!inputValue.trim() || !pdfBase64) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: 'উত্তর খুঁজছি...',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash' 
      });

      const prompt = `আপনি একজন সহায়ক শিক্ষক। এই PDF ডকুমেন্ট থেকে নিচের প্রশ্নের উত্তর দিন:

প্রশ্ন: ${inputValue}

নির্দেশনা:
1. এই PDF ডকুমেন্ট সাবধানে পড়ুন (OCR করে যদি স্ক্যান করা ইমেজ হয়)
2. শুধুমাত্র এই ডকুমেন্ট থেকে তথ্য ব্যবহার করুন
3. উত্তর বাংলায় দিন (যদি প্রশ্ন বাংলায় হয়) বা ইংরেজিতে (যদি প্রশ্ন ইংরেজিতে হয়)
4. যদি সম্ভব হয়, ডকুমেন্টের কোন পৃষ্ঠা বা সেকশন থেকে তথ্যটি পেয়েছেন তা উল্লেখ করুন
5. যদি ডকুমেন্টে উত্তর না থাকে, স্পষ্টভাবে বলুন "এই ডকুমেন্টে এই তথ্য পাওয়া যায়নি"

উত্তর:`;

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'application/pdf',
            data: pdfBase64
          }
        },
        { text: prompt }
      ]);

      const response = result.response;
      const answer = response.text();

      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: answer,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Question error:', error);
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `দুঃখিত, উত্তর পেতে সমস্যা হয়েছে: ${error?.message || 'Unknown error'}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePDF = () => {
    setPdfFile(null);
    setPdfBase64('');
    setMessages([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              PDF Chat - যেকোনো PDF থেকে উত্তর পান
            </h2>
            <p className="text-sm text-gray-600 mt-1 font-bangla">
              আপনার নিজের PDF আপলোড করুন এবং প্রশ্ন করুন
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {!pdfFile ? (
            // Upload area
            <div className="flex-1 flex items-center justify-center p-8">
              <label className="w-full max-w-md">
                <div className="border-3 border-dashed border-purple-300 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all">
                  <Upload className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-bangla">
                    PDF ফাইল আপলোড করুন
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 font-bangla">
                    ক্লিক করুন বা ফাইল drag & drop করুন
                  </p>
                  <p className="text-xs text-gray-500 font-bangla">
                    সর্বোচ্চ: 20 MB | ফরম্যাট: PDF
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isProcessing}
                  />
                </div>
              </label>
            </div>
          ) : (
            // Chat area
            <div className="flex-1 flex flex-col">
              {/* PDF Info */}
              <div className="bg-purple-50 p-4 border-b border-purple-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">{pdfFile.name}</p>
                    <p className="text-xs text-gray-600">
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemovePDF}
                  className="p-2 hover:bg-purple-100 rounded-full transition-colors"
                  title="Remove PDF"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="whitespace-pre-wrap font-bangla">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString('bn-BD', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleAskQuestion()}
                    placeholder="এই PDF সম্পর্কে প্রশ্ন করুন..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500 font-bangla"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleAskQuestion}
                    disabled={isLoading || !inputValue.trim()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center font-bangla">
                  💡 টিপস: নির্দিষ্ট প্রশ্ন করুন, যেমন "এই ডকুমেন্টের সারসংক্ষেপ দাও" বা "অধ্যায় ৩ এর মূল পয়েন্টগুলো কি?"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-2xl">
            <div className="text-center">
              <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-800 font-bangla">
                PDF প্রসেস হচ্ছে...
              </p>
              <p className="text-sm text-gray-600 font-bangla">
                অনুগ্রহ করে অপেক্ষা করুন
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFChat;
