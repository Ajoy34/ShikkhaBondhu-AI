// Simple in-memory feedback store
// This is a placeholder implementation

interface Feedback {
  id: string;
  message: string;
  rating?: number;
  timestamp: number;
}

const feedbackStore: Feedback[] = [];

export function addFeedback(message: string, rating?: number): void {
  const feedback: Feedback = {
    id: Date.now().toString(),
    message,
    rating,
    timestamp: Date.now()
  };
  feedbackStore.push(feedback);
  console.log('Feedback added:', feedback);
}

export function getFeedback(): Feedback[] {
  return [...feedbackStore];
}

export function downloadFeedback(): void {
  const data = JSON.stringify(feedbackStore, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `feedback-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  console.log('Feedback downloaded');
}
