'use client';
import { YouTubeEmbed } from '@next/third-parties/google';
import {  useState } from 'react';
import { Button } from '@/components/ui/button'; // adjust this import based on your project structure
import Turnstile from './Turnstile'; // adjust this import based on your project structure
import { Input } from '@/components/ui/input'; // adjust this import based on your project structure
import { Loader2 } from 'lucide-react'; // adjust this import based on your project structure
import { Session } from 'next-auth'; // Ensure this import matches your project setup
import { EditorView } from '@codemirror/view'; // Ensure this import matches your project setup
import PricingPortal from "@/components/PricingPortal";
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
interface ModeSelectorProps {
  editorRef: React.RefObject<EditorView | null>;
  session: Session;
  setTaskId: (taskId: string) => void;

}
const ModeSelector = ({ editorRef, session, setTaskId }: ModeSelectorProps) => {
  const [, setHtmlContent] = useState("");
  const [mode, setMode] = useState<'youtube' | 'longtext'>('youtube');
  const [isVerified, setIsVerified] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const YouTubeEmbedMemo = useMemo(() => {
    return inputValue.includes("https://www.youtube.com/") ? (
      <div className="w-full max-w-3xl aspect-video mt-12 rounded-xl overflow-hidden">
        <YouTubeEmbed videoid={inputValue.split("=")[1]} height={16} />
      </div>
    ) : null;
  }, [inputValue]);
  const fetchHtmlContent = async (taskId: string) => {
    //setLoading(true);
    try {
      const userEmail = session?.user?.email || 'anonymous';
      const response = await fetch(`https://yt2mapapi.blob.core.windows.net/html/user-${userEmail.split('@')[0]}/${taskId}.html`, { cache: 'no-store' });
      const text = await response.text();

      setHtmlContent(text);
      if (editorRef.current) {
        editorRef.current.dispatch({
          changes: { from: 0, to: editorRef.current.state.doc.length, insert: text },
        });
      }
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    } finally {
      //setLoading(false);
    }
  };
  const handleSubmitWebhook = async () => {
    setLoading(true);
    setError(null);
    try {
      // Extract video ID from URL
      if(mode == "youtube"){
        const videoId = inputValue.split('v=')[1]?.split('&')[0];
      if (!videoId) {
        setError('Invalid YouTube URL');
        setLoading(false);
        return;
      }

      // Check for subtitles first
      const subtitleCheckResponse = await fetch('/api/check-subtitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });

      const subtitleData = await subtitleCheckResponse.json();
      if (!subtitleData.hasSubtitles) {
        setError('This video does not have subtitles available');
        setLoading(false);
        return;
      }

      }
      const taskId = Math.random().toString(36).substring(2);
      const RedisSetresponse = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, email: session?.user?.email }),
      });
      const { dbLength } = await RedisSetresponse.json();
 
      const response = await fetch('/api/yt-transcript-webhook-old', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputValue, taskId, dbLength }),
      });
  
      if (response.ok) {
        // Increment chat usage count
        await fetch('/api/chat-usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
      
        await checkTaskStatus(taskId);
      } else {
        console.error("Failed to submit webhook:", await response.text());
        setError('Failed to process video');
      }
    } catch (error) {
      console.error("Error submitting webhook:", error);
      setError('An error occurred while processing the video');
    } finally {
      setLoading(false);
    }
  };
  const [CurrentStep, setCurrentSteps] = useState('');
  const loadingMessages = [
    'Processing video transcript...',
    'Analyzing content structure...',
    'Generating mindmap layout...',
    'Optimizing node connections...',
    'Applying visual styles...',
    'Finalizing mindmap...',
    'We are experiencing heavy load, your mindmap will be ready soon <sup>TM</sup>'
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  
  const checkTaskStatus = async (taskId: string, maxRetries = 200, interval = 5000) => {
    let attempts = 0;
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => {
        if (prev === loadingMessages.length - 1) {
          return loadingMessages.length - 1; // Keep the index at the last message
        }
        return prev + 1; // Otherwise, increment the index
      });
    }, 15000);

    while (attempts < maxRetries) {
      try {
        const res = await fetch(`/api/webhook?taskId=${taskId}`);
        const data = await res.json();
        setCurrentSteps(data.status);
     
        if (data.task.status == 'complete') {
          clearInterval(messageInterval);
          setLoading(false);
          setError(null);
         
          await new Promise(resolve => setTimeout(resolve, 2000));
          fetchHtmlContent(taskId);
          setTaskId(taskId);
          router.push(`/mindmap?id=${taskId}`);
          return data.data;
        }
        await new Promise(resolve => setTimeout(resolve, interval));
        attempts++;
      } catch (error) {
        console.error("Error checking task status:", error);
        clearInterval(messageInterval);
      }
    }
    console.error("Task polling timed out.");
    clearInterval(messageInterval);
  };
  
  return (
    
      <div className="flex flex-col justify-center gap-2 mb-6">
      
        { <PricingPortal isOpen={showPricing} /> }
        
        
        <div className="justify-center items-center">
          
        <Button
          variant={mode === 'youtube' ? 'default' : 'outline'}
          onClick={() => setMode('youtube')}
          className='m-1'
        >
          YouTube
        </Button>
        <Button
          variant={mode === 'longtext' ? 'default' : 'outline'}
          onClick={() => setMode('longtext')}
          className='m-1'
        >
          Long Text
        </Button>
        
        {!isVerified ? (
          
              <div className="flex flex-col items-center">
                <p className="mb-4 text-gray-600">Please complete the verification to continue</p>
                {(
                  <Turnstile
                    onVerify={async () => {
                      try {
                        const response = await fetch("/api/chat-usage", {
                          method: "GET",
                        });
                        const data = await response.json();
                        if (data.usage_count > 3 && !data.isSubscribed && !data.isPaid) {
                          setShowPricing(true);
                        } else {
                          setIsVerified(true);
                        }

                      } catch (error) {
                        console.error("Error updating usage count:", error);
                        setIsVerified(true);
                      }
                    }}
                  />
                )}
              </div>
            ) : (
              <>
                  <div className="flex flex-col items-center justify-center">
                    <Input
                      id="input"
                      placeholder="https://www.youtube.com/watch?v=5nTuScU70As"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="mt-2 pl-2 pr-2 w-1/3 mb-6 resize border overflow-auto"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                   {YouTubeEmbedMemo}
                      {/* <MindmapButtons editorRef={editorRef} taskId={taskId} session={session} /> */}
                      
                    </div>
              
                  <Button variant="default" onClick={handleSubmitWebhook} disabled={loading}>
                    {loading? <Loader2 className="animate-spin w-4 h-4" /> : 'Generate Mindmap'}
                  </Button>
             
                {error ? <p className="text-red-600">{error}</p> : null}
              </>
            )}
            {loading && (
              <div className="justify-center">
                <p dangerouslySetInnerHTML={{ __html: loadingMessages[messageIndex] }} />
                {CurrentStep && (
                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-600 capitalize">{CurrentStep}</p>
                    <div className="w-64 h-2 bg-gray-200 rounded-full mt-2">
                    </div>
                  </div>
                )}
              </div>
            )}
            </div>
            

      </div>
      
    
    
  );
};

export default ModeSelector;
