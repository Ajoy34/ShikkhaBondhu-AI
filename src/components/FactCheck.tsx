import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle, Share2, Facebook, Twitter, Link as LinkIcon, Clock, TrendingUp, Users, Shield, ExternalLink, Copy, ArrowLeft } from 'lucide-react';

interface FactCheckResult {
  url: string;
  status: 'verified' | 'fake' | 'misleading' | 'unverified';
  confidence: number;
  title: string;
  summary: string;
  sources: string[];
  sharedCount: number;
  lastChecked: string;
  warning?: string;
}

interface FactCheckProps {
  onBackToDashboard?: () => void;
}

export default function FactCheck({ onBackToDashboard }: FactCheckProps) {
  const [url, setUrl] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleCheck = async () => {
    if (!url.trim()) return;

    setIsChecking(true);
    
    // Simulate API call - Replace with actual fact-checking API
    setTimeout(() => {
      const mockResult: FactCheckResult = {
        url: url,
        status: Math.random() > 0.5 ? 'verified' : 'fake',
        confidence: Math.floor(Math.random() * 30) + 70,
        title: 'COVID-19 Vaccine Safety Information',
        summary: 'This content has been fact-checked against multiple reliable sources. The information provided contains both accurate and misleading elements.',
        sources: [
          'World Health Organization (WHO)',
          'Centers for Disease Control (CDC)',
          'Bangladesh Health Ministry',
          'Reuters Fact Check'
        ],
        sharedCount: Math.floor(Math.random() * 10000) + 1000,
        lastChecked: new Date().toLocaleString(),
        warning: Math.random() > 0.5 ? 'This content contains unverified claims' : undefined
      };

      setResult(mockResult);
      setShowResult(true);
      setIsChecking(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50 border-green-200';
      case 'fake': return 'text-red-600 bg-red-50 border-red-200';
      case 'misleading': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'unverified': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-8 h-8" />;
      case 'fake': return <XCircle className="w-8 h-8" />;
      case 'misleading': return <AlertTriangle className="w-8 h-8" />;
      case 'unverified': return <AlertTriangle className="w-8 h-8" />;
      default: return <AlertTriangle className="w-8 h-8" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Fact Check Result`, '_blank');
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => {
              setShowResult(false);
              setResult(null);
              setUrl('');
            }}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Check Another Link</span>
          </button>

          {/* Result Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Status Header */}
            <div className={`p-8 border-b-4 ${getStatusColor(result.status)}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(result.status)}
                  <div>
                    <h2 className="text-3xl font-black capitalize">{result.status}</h2>
                    <p className="text-sm opacity-75">Confidence: {result.confidence}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-75">Last Checked</div>
                  <div className="text-xs font-mono">{result.lastChecked}</div>
                </div>
              </div>

              {result.warning && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold">{result.warning}</p>
                </div>
              )}
            </div>

            {/* URL Section */}
            <div className="p-6 bg-gray-50 border-b">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Checked URL</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-mono break-all">
                  {result.url}
                </div>
                <button
                  onClick={() => copyToClipboard(result.url)}
                  className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                  title="Copy URL"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                  title="Open URL"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Content Analysis */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Content Title</h3>
              <p className="text-gray-700 font-semibold mb-6">{result.title}</p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Analysis Summary</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{result.summary}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{result.sharedCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Times Shared</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                  <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{result.confidence}%</div>
                  <div className="text-xs text-gray-600">Confidence</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{result.sources.length}</div>
                  <div className="text-xs text-gray-600">Sources Checked</div>
                </div>
              </div>

              {/* Verified Sources */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Sources</h3>
              <div className="space-y-2 mb-6">
                {result.sources.map((source, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-xl p-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{source}</span>
                  </div>
                ))}
              </div>

              {/* Share Options */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">Share This Report</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={shareOnFacebook}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="font-semibold">Share on Facebook</span>
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="flex items-center space-x-2 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="font-semibold">Share on Twitter</span>
                </button>
                <button
                  onClick={() => copyToClipboard(window.location.href)}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span className="font-semibold">Copy Report Link</span>
                </button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold text-yellow-900 mb-2">Disclaimer</p>
                <p>This fact-check report is generated based on automated analysis and multiple verified sources. While we strive for accuracy, we recommend verifying critical information through official channels. Always use critical thinking when consuming online content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back to Dashboard Button */}
        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
            <span className="font-bangla">ড্যাশবোর্ডে ফিরুন</span>
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 px-6 py-3 rounded-full mb-6 shadow-lg">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 font-semibold">AI-Powered Fact Checking</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Fact Check
            <span className="block text-3xl font-bangla text-indigo-600 mt-2">
              তথ্য যাচাই
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-3">
            Verify social media links, news articles, and online content instantly
          </p>
          <p className="text-lg text-gray-500 font-bangla max-w-2xl mx-auto">
            সোশ্যাল মিডিয়া লিংক, সংবাদ এবং অনলাইন কন্টেন্ট তাৎক্ষণিকভাবে যাচাই করুন
          </p>
        </div>

        {/* Main Check Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-start space-x-3 mb-6">
            <Search className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <label className="block text-lg font-bold text-gray-900 mb-2">
                Enter URL to Fact Check
                <span className="block text-sm font-bangla text-gray-600 font-normal mt-1">
                  যাচাই করতে URL লিখুন
                </span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://facebook.com/... or any social media link"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              />
            </div>
          </div>

          <button
            onClick={handleCheck}
            disabled={!url.trim() || isChecking}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
          >
            {isChecking ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Shield className="w-6 h-6" />
                <span>Check Now / এখনই যাচাই করুন</span>
              </>
            )}
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mb-4">
              <Facebook className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Social Media Links</h3>
            <p className="text-sm font-bangla text-indigo-600 mb-2">সোশ্যাল মিডিয়া লিংক</p>
            <p className="text-gray-600 text-sm">
              Check Facebook, Twitter, Instagram posts and stories for misinformation
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Analysis</h3>
            <p className="text-sm font-bangla text-green-600 mb-2">রিয়েল-টাইম বিশ্লেষণ</p>
            <p className="text-gray-600 text-sm">
              Get instant fact-check results with confidence scores and verified sources
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4">
              <Share2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Share Reports</h3>
            <p className="text-sm font-bangla text-purple-600 mb-2">রিপোর্ট শেয়ার করুন</p>
            <p className="text-gray-600 text-sm">
              Share fact-check reports on social media to combat misinformation
            </p>
          </div>
        </div>

        {/* Recent Checks */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-6 h-6 text-indigo-600 mr-3" />
            Recent Fact Checks
            <span className="ml-3 text-lg font-bangla text-gray-600">সাম্প্রতিক যাচাই</span>
          </h2>

          <div className="space-y-4">
            {[
              { status: 'fake', title: 'COVID-19 cure claim', confidence: 92, time: '2 hours ago' },
              { status: 'verified', title: 'Government policy update', confidence: 95, time: '5 hours ago' },
              { status: 'misleading', title: 'Election result prediction', confidence: 78, time: '1 day ago' }
            ].map((check, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`p-2 rounded-lg ${getStatusColor(check.status)}`}>
                    {getStatusIcon(check.status)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{check.title}</h4>
                    <p className="text-sm text-gray-500">{check.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{check.confidence}%</div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
