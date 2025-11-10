import React, { useState, useEffect, useRef } from 'react';
import { 
  Book, Send, Loader, AlertCircle, BookOpen, 
  MessageSquare, ArrowLeft, Sparkles, CheckCircle 
} from 'lucide-react';

// Lazy import to prevent initialization errors
let loadAllBooks: any;
let answerQuestion: any;
let getBookStats: any;
let BookData: any;

// Safe dynamic import
const initializeRAG = async () => {
  try {
    const module = await import('../utils/bookRAG');
    loadAllBooks = module.loadAllBooks;
    answerQuestion = module.answerQuestion;
    getBookStats = module.getBookStats;
    BookData = module.BookData;
    return true;
  } catch (error) {
    console.error('Failed to load bookRAG:', error);
    return false;
  }
};

interface BookChatProps {
  onBackToDashboard: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  sources?: { bookTitle: string; text: string; similarity: number }[];
  timestamp: Date;
}

const BookChat: React.FC<BookChatProps> = ({ onBackToDashboard }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [error, setError] = useState('');
  const [hasCriticalError, setHasCriticalError] = useState(false);
  const [ragInitialized, setRagInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize RAG on mount
  useEffect(() => {
    initializeRAG()
      .then((success) => {
        if (success) {
          setRagInitialized(true);
          loadBooksData();
        } else {
          setHasCriticalError(true);
          setError('Failed to initialize Book Chat system');
        }
      })
      .catch((err) => {
        console.error('Critical error initializing RAG:', err);
        setHasCriticalError(true);
        setError('একটি গুরুতর ত্রুটি ঘটেছে। (Critical error occurred)');
      });
  }, []);

  // Auto-scroll to bottom when new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadBooksData = async () => {
    setIsLoadingBooks(true);
    setError('');
    try {
      console.log('📚 Loading books from /book-data/...');
      const loadedBooks = await loadAllBooks();
      console.log(`✅ Loaded ${loadedBooks.length} books`, loadedBooks);
      setBooks(loadedBooks);
      
      if (loadedBooks.length > 0) {
        const stats = getBookStats(loadedBooks);
        setMessages([{
          id: 'welcome',
          type: 'assistant',
          content: `📚 **বইয়ের সাথে চ্যাট করুন!**\n\n✅ ${stats.totalBooks}টি বই লোড হয়েছে\n📖 বিষয়: ${stats.subjects.join(', ')}\n📝 মোট ${stats.totalChunks}টি অধ্যায়/বিষয়\n\nআপনার পাঠ্যবই সম্পর্কে যেকোনো প্রশ্ন করুন! যেমন:\n- "ক্রিয়া কাকে বলে?"\n- "সকর্মক ও অকর্মক ক্রিয়ার পার্থক্য কী?"\n- "সমাসের প্রকারভেদ বলো"\n\n💡 **টিপ:** Ollama চালু না থাকলেও keyword-based search দিয়ে কাজ করবে!`,
          timestamp: new Date()
        }]);
      } else {
        console.warn('⚠️ No books loaded');
        setError('কোন বই পাওয়া যায়নি। দয়া করে PDF প্রসেস করুন। (No books found. Please check if sample_bangla_grammar.json exists in /public/book-data/)');
      }
    } catch (err) {
      console.error('❌ Failed to load books:', err);
      setError('বই লোড করতে ব্যর্থ। (Failed to load books. Check console for details.)');
    } finally {
      setIsLoadingBooks(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading || !ragInitialized) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');
    
    try {
      // Get answer using RAG
      const result = await answerQuestion(input, books, 'user@example.com');
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: result.answer,
        sources: result.sources,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (err: any) {
      console.error('Error:', err);
      setError('একটি ত্রুটি ঘটেছে। (An error occurred)');
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'ক্রিয়া কাকে বলে?',
    'সকর্মক ক্রিয়া কী?',
    'বিশেষ্যের প্রকারভেদ বলো',
    'সমাস কাকে বলে?',
    'সন্ধি কী?'
  ];

  // Show critical error
  if (hasCriticalError) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-800 mb-2">Critical Error</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={onBackToDashboard}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Go Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingBooks) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
            <p className="text-gray-600 font-bangla">বই লোড হচ্ছে...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <button
            onClick={onBackToDashboard}
            className="flex items-center text-gray-600 hover:text-indigo-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-bangla">ড্যাশবোর্ডে ফিরে যান</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                পাঠ্যবই চ্যাট
              </h1>
              <p className="text-gray-600 mt-2 font-bangla">
                আপনার পাঠ্যবই থেকে যেকোনো প্রশ্নের উত্তর পান
              </p>
            </div>
            
            {books.length > 0 && (
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Book className="w-4 h-4" />
                  <span className="font-bangla">{books.length}টি বই লোড হয়েছে</span>
                </div>
                <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Ready to answer</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Powered by Gemini AI
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 300px)' }}>
          {/* Messages */}
          <div className="overflow-y-auto p-6 space-y-4" style={{ height: 'calc(100% - 100px)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-semibold text-indigo-600">AI Assistant</span>
                    </div>
                  )}
                  
                  <div className="whitespace-pre-wrap font-bangla">{message.content}</div>
                  
                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                        <Book className="w-3 h-3" />
                        তথ্যসূত্র:
                      </p>
                      {message.sources.map((source, index) => (
                        <div key={index} className="text-xs bg-white rounded-lg p-2 mb-2">
                          <div className="font-semibold text-indigo-600 mb-1">
                            📖 {source.bookTitle} ({source.similarity}% মিল)
                          </div>
                          <div className="text-gray-600 line-clamp-2">{source.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3">
                  <Loader className="w-5 h-5 animate-spin text-indigo-600" />
                  <span className="text-gray-600 font-bangla">উত্তর খোঁজা হচ্ছে...</span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 max-w-2xl">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 text-sm font-bangla">{error}</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (only show when no messages) */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 mb-2 font-bangla">উদাহরণ প্রশ্ন:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full transition-colors font-bangla"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="আপনার প্রশ্ন লিখুন... (যেমন: ক্রিয়া কাকে বলে?)"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
                disabled={isLoading || books.length === 0}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || books.length === 0}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="font-bangla">পাঠান</span>
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1 font-bangla">কিভাবে কাজ করে?</p>
              <p className="font-bangla">
                আপনার প্রশ্ন করার পর, AI পাঠ্যবই থেকে সবচেয়ে প্রাসঙ্গিক অংশ খুঁজে নেয় এবং সেখান থেকে উত্তর দেয়। 
                সকল উত্তর সরাসরি NCTB পাঠ্যবই থেকে নেওয়া।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookChat;
