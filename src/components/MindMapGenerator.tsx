import React, { useState, useRef } from 'react';
import { Upload, FileText, Brain, Download, Loader, X, Image, Code } from 'lucide-react';

interface MindMapGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

type OutputFormat = 'mermaid' | 'markdown' | 'json' | 'text';

const MindMapGenerator: React.FC<MindMapGeneratorProps> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mindMapData, setMindMapData] = useState<string>('');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('mermaid');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      const validTypes = ['application/pdf', 'text/plain', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                         'image/png', 'image/jpeg', 'image/jpg'];
      
      if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.txt')) {
        setError('অসমর্থিত ফাইল ফরম্যাট। PDF, TXT, DOC, DOCX, বা ছবি ব্যবহার করুন।');
        return;
      }

      if (selectedFile.size > 20 * 1024 * 1024) { // 20MB limit
        setError('ফাইল খুব বড়! সর্বোচ্চ 20MB।');
        return;
      }

      setFile(selectedFile);
      setError('');
      setMindMapData('');
    }
  };

  const generateMindMap = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      // Read file content
      let fileContent = '';
      let fileBase64 = '';
      
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        fileContent = await file.text();
      } else {
        // For PDF/images, convert to base64
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        const chunkSize = 8192;
        for (let i = 0; i < bytes.length; i += chunkSize) {
          const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
          binary += String.fromCharCode(...chunk);
        }
        fileBase64 = btoa(binary);
      }

      // Call Gemini API
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

      let prompt = '';
      const parts: any[] = [];

      if (fileContent) {
        prompt = `Create a comprehensive mind map from this content. Format: ${outputFormat}

Content:
${fileContent}

Instructions:
1. Identify main topics and subtopics
2. Create hierarchical structure
3. Include key concepts and relationships
4. Format as ${outputFormat}`;
        
        parts.push({ text: prompt });
      } else {
        // For PDF/images
        const mimeType = file.type || 'application/pdf';
        parts.push({
          inlineData: {
            mimeType,
            data: fileBase64
          }
        });
        
        prompt = `Analyze this document and create a comprehensive mind map.

Format: ${outputFormat}

Instructions:
1. Extract all main topics and concepts
2. Organize in hierarchical structure  
3. Show relationships between ideas
4. Include important details
5. Format output as ${outputFormat}

${outputFormat === 'mermaid' ? `
Use Mermaid.js syntax:
\`\`\`mermaid
graph TD
  A[Main Topic] --> B[Subtopic 1]
  A --> C[Subtopic 2]
  B --> D[Detail 1]
\`\`\`
` : ''}

${outputFormat === 'markdown' ? `
Use Markdown format:
# Main Topic
- Subtopic 1
  - Detail 1
  - Detail 2
- Subtopic 2
` : ''}

${outputFormat === 'json' ? `
Use JSON format:
{
  "title": "Main Topic",
  "children": [
    {"title": "Subtopic 1", "children": [...]},
    {"title": "Subtopic 2", "children": [...]}
  ]
}
` : ''}`;
        
        parts.push({ text: prompt });
      }

      const result = await model.generateContent(parts);
      const response = result.response.text();
      
      setMindMapData(response);
    } catch (err: any) {
      console.error('Mind map generation error:', err);
      setError(`ত্রুটি: ${err.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadMindMap = () => {
    if (!mindMapData) return;

    const blob = new Blob([mindMapData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindmap-${Date.now()}.${outputFormat === 'mermaid' ? 'mmd' : outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderMindMapPreview = () => {
    if (!mindMapData) return null;

    if (outputFormat === 'mermaid') {
      // Show mermaid code with copy button
      return (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-96">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Mermaid Diagram Code:</span>
            <button
              onClick={() => navigator.clipboard.writeText(mindMapData)}
              className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
            >
              Copy
            </button>
          </div>
          <pre className="whitespace-pre-wrap">{mindMapData}</pre>
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500 rounded">
            <p className="text-blue-300 text-xs">
              💡 Paste this code in <a href="https://mermaid.live" target="_blank" rel="noopener noreferrer" className="underline">mermaid.live</a> to visualize
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border rounded-lg p-4 max-h-96 overflow-auto">
        <pre className="whitespace-pre-wrap text-sm">{mindMapData}</pre>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Mind Map Generator</h2>
              <p className="text-sm text-purple-100">Upload document → Generate mind map</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* File Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-all">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg"
              className="hidden"
            />
            
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer"
              >
                <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PDF, TXT, DOC, DOCX, or Images (max 20MB)
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-4">
                <FileText className="w-12 h-12 text-purple-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Output Format Selection */}
          {file && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Output Format:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setOutputFormat('mermaid')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    outputFormat === 'mermaid'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Code className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-medium">Mermaid.js</span>
                </button>
                
                <button
                  onClick={() => setOutputFormat('markdown')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    outputFormat === 'markdown'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <FileText className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-medium">Markdown</span>
                </button>
                
                <button
                  onClick={() => setOutputFormat('json')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    outputFormat === 'json'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Code className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-medium">JSON</span>
                </button>
                
                <button
                  onClick={() => setOutputFormat('text')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    outputFormat === 'text'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <FileText className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-medium">Plain Text</span>
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Generate Button */}
          {file && !isProcessing && !mindMapData && (
            <button
              onClick={generateMindMap}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
            >
              <Brain className="w-5 h-5" />
              <span>Generate Mind Map</span>
            </button>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="text-center py-12">
              <Loader className="w-12 h-12 mx-auto text-purple-600 animate-spin mb-4" />
              <p className="text-gray-700 font-semibold">Generating mind map...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          )}

          {/* Mind Map Preview */}
          {mindMapData && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Generated Mind Map:</h3>
                <button
                  onClick={downloadMindMap}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
              
              {renderMindMapPreview()}

              <button
                onClick={() => {
                  setFile(null);
                  setMindMapData('');
                  setError('');
                }}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Generate Another
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MindMapGenerator;
