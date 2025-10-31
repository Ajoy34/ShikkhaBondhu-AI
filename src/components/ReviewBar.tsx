import { useEffect, useMemo, useState } from 'react';
import { addFeedback, downloadFeedback, getFeedback } from '../utils/feedbackStore';

function usePreviewEnabled() {
  return useMemo(() => {
    // Enable when env var set or URL has ?review=1
    const envEnabled = import.meta.env?.VITE_REVIEW_MODE === '1' || import.meta.env?.VITE_REVIEW_MODE === 1 || import.meta.env?.VITE_REVIEW_MODE === true;
    const urlEnabled = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('review') === '1';
    return Boolean(envEnabled || urlEnabled);
  }, []);
}

export default function ReviewBar() {
  const enabled = usePreviewEnabled();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'bug' | 'ui' | 'content' | 'idea'>('idea');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (enabled) {
      setCount(getFeedback().length);
    }
  }, [enabled]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!enabled) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setToast('Please write your feedback');
      return;
    }
    addFeedback({
      type,
      message: message.trim(),
      contact: contact.trim() || undefined,
      pageUrl: typeof window !== 'undefined' ? window.location.href : 'unknown',
    });
    setMessage('');
    setContact('');
    setToast('Feedback saved');
    setOpen(false);
    setCount((c) => c + 1);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Banner */}
      <div className="bg-yellow-100 border-b-2 border-yellow-300 text-yellow-900 py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧪</span>
            <span className="font-semibold">Preview Mode</span>
            <span className="hidden md:inline text-sm text-yellow-800">Not published yet — share your feedback before release.</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="px-3 py-1.5 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm font-semibold">
              Give Feedback
            </button>
            <button onClick={() => downloadFeedback()} className="px-3 py-1.5 bg-white text-yellow-800 border-2 border-yellow-400 rounded-md hover:bg-yellow-50 text-sm font-semibold">
              Export ({count})
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-4 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Share your feedback</h3>
                <p className="text-yellow-100 text-sm">It stays on your device. You can export and send to the team.</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-2xl font-bold leading-none">×</button>
            </div>

            <form onSubmit={submit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500">
                  <option value="bug">Bug</option>
                  <option value="ui">UI/UX</option>
                  <option value="content">Content/Text</option>
                  <option value="idea">Idea/Suggestion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Your feedback</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Write what to improve or fix..." className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">How can we reach you? (optional)</label>
                <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Email or phone" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500" />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-16 right-4 bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg text-sm z-[60]">
          {toast}
        </div>
      )}
    </div>
  );
}
