import { useState } from 'react';
import { Button } from '@/components/ui/button'; // or wherever your Button component is from

export function FeedbackButton({ feedback }:{feedback: string}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
       className = 'mt-6'
        onClick={async () => {
          try {
            setLoading(true);
            const response = await fetch('/api/feedback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ feedback }),
            });

            if (!response.ok) {
              console.error('Failed to submit feedback');
              return;
            }

            setSubmitted(true);
          } catch (error) {
            console.error('Error submitting feedback:', error);
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading || submitted}
      >
        {submitted ? 'Submitted!' : loading ? 'Submitting...' : 'Submit Feedback'}
      </Button>

      {submitted && <p className="text-green-600 mt-2">Feedback submitted successfully.</p>}
    </>
  );
}
