export type FeedbackType = 'bug' | 'ui' | 'content' | 'idea';

export interface FeedbackItem {
  id: string;
  type: FeedbackType;
  message: string;
  contact?: string;
  pageUrl: string;
  userAgent?: string;
  createdAt: string; // ISO string
}

const LS_KEY = 'sb_feedback';

function readAll(): FeedbackItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as FeedbackItem[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: FeedbackItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export function getFeedback(): FeedbackItem[] {
  return readAll();
}

export function addFeedback(partial: Omit<FeedbackItem, 'id' | 'createdAt' | 'userAgent'>): FeedbackItem {
  const item: FeedbackItem = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    ...partial,
  };
  const all = readAll();
  all.unshift(item);
  writeAll(all);
  return item;
}

export function clearFeedback() {
  writeAll([]);
}

export function exportFeedback(): string {
  const all = readAll();
  return JSON.stringify(all, null, 2);
}

export function downloadFeedback(filename = 'feedback.json') {
  const data = exportFeedback();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
