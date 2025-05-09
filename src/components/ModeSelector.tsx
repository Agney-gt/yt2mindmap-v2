'use client';
import { YouTubeEmbed } from '@next/third-parties/google';
import {  useState, useCallback } from 'react';
import { Button } from '@/components/ui/button'; // adjust this import based on your project structure
import Turnstile from './Turnstile'; // adjust this import based on your project structure
import { Input } from '@/components/ui/input'; // adjust this import based on your project structure
import { Loader2 } from 'lucide-react'; // adjust this import based on your project structure
import { Session } from 'next-auth'; // Ensure this import matches your project setup
import { EditorView } from '@codemirror/view'; // Ensure this import matches your project setup
import PricingPortal from "@/components/PricingPortal";
//import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { TaskadeSidebar } from "@/components/TaskadeSidebar";
interface ModeSelectorProps {
  editorRef: React.RefObject<EditorView | null>;
  session: Session;
  setTaskId: (taskId: string) => void;

}
const ModeSelector = ({ editorRef, session, setTaskId }: ModeSelectorProps) => {
  const [, setHtmlContent] = useState("");
  const [mode, setMode] = useState<string>('youtube');
  const [isVerified, setIsVerified] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vId, setVId] = useState<string>("5nTuScU70As");
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
  //const router = useRouter();
  const checkSubtitlesYT = async () => {
    
    
      const videoId = vId
    // Check for subtitles first
    const subtitleCheckResponse = await fetch('/api/check-subtitles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId }),
    });

    const subtitleData = await subtitleCheckResponse.json();
    
    return subtitleData.result
   

    }
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    
    setInputValue(e.target.value);
    getVideoId(e.target.value);
  };
  const handleVerification = useCallback(async () => {
    try {
      const response = await fetch("/api/chat-usage", { method: "GET" });
      const data = await response.json();
      if (data.usage_count > 1 && !data.isPaid) {
        setShowPricing(true);
      } else {
        setIsVerified(true);
      }
    } catch (error) {
      console.error("Error updating usage count:", error);
      setIsVerified(false);
    }
  }, []);
  
  const getVideoId = (inputValue: string) => {
    if (inputValue.includes("www.youtube.com/")) {
      setVId(inputValue.split('=')[1])
    }
    else if (inputValue.includes("youtu.be")) {
      setVId(inputValue.replace("https://","").split('/')[1]?.split('?')[0])
    }
  }
  
  
  const YouTubeEmbedMemo = useMemo(() => {
    return  (
      <div className="w-full max-w-3xl aspect-video mt-12 rounded-xl overflow-hidden">
        <YouTubeEmbed videoid={vId} height={16} />
      </div>
    ) ;
  }, [vId]);
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
    
    let flag = await checkSubtitlesYT();
    
    // Early return if video is not in English or captions are not loaded
    if (mode === 'youtube' && !flag) {
      setLoading(false);
      setError('This video is not in English or Captions not loaded yet... Please try another video.');
      return;
    }
    if (mode === 'longtext' ) {
      if (inputValue.length < 250) {
        setLoading(false);
        setError('Please enter a longer text (250 characters minimum).');
        return;
      }
      flag = true
    }
    try {
      const taskId = Math.random().toString(36).substring(2);
  
      // Common body for Redis set request
      const redisBody = mode === 'youtube'
        ? { taskId, vId, email: session?.user?.email }
        : { taskId, email: session?.user?.email };
  
      const RedisSetresponse = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(redisBody),
      });
      
      const { dbLength } = await RedisSetresponse.json();
      if (!RedisSetresponse.ok) {
        console.error("Failed to set Redis data:", await RedisSetresponse.text());
        setError('Rate Limit Exceeded. Please try again later.');
        return;
      }
      // Common body for YouTube transcript webhook
      const webhookBody = mode === 'youtube'
        ? { url: `https://www.youtube.com/watch?v=${vId}`, taskId, dbLength }
        : { url: inputValue , taskId, dbLength };
  
      const response = await fetch('/api/yt-transcript-webhook-old', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookBody),
      });
  
      if (response.ok) {
        // Increment chat usage count
        await fetch('/api/chat-usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        await checkTaskStatus(taskId);
      } else {
        console.error("Failed to submit webhook:", await response.text());
        setError('Failed to process video');
      }
    } catch (error) {
      console.error("Error submitting webhook:", error);
      setError('Rate Limit Exceeded. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
    
  const checkTaskStatus = async (taskId: string, maxRetries = 100 , interval = 5000) => {
    let attempts = 0;
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => {
        if (prev === loadingMessages.length - 1) {
          return loadingMessages.length - 1; // Keep the index at the last message
        }
        return prev + 1; // Otherwise, increment the index
      });
    }, 20000);

    while (attempts < maxRetries) {
      try {
        const res = await fetch(`/api/webhook?taskId=${taskId}`);
        const data = await res.json();
        setCurrentSteps(data.status);
     
        if (data.task.status == 'complete') {
          clearInterval(messageInterval);
          setMessageIndex(0)
          fetchHtmlContent(taskId);
          setTaskId(taskId);
          setLoading(false);
          setError(null);
          await new Promise(resolve => setTimeout(resolve, 2000));
          //router.push(`/mindmap?id=${taskId}`);
          return data.data;
        }
        await new Promise(resolve => setTimeout(resolve, interval));
        attempts++;
      } catch (error) {
        console.error("Error checking task status:", error);
        clearInterval(messageInterval);
        setMessageIndex(0)
        
      }
    }
    console.error("Task polling timed out.");
    clearInterval(messageInterval);
    setMessageIndex(0)
    
  };
  
  

  const VerificationBox = () => (
    <>{console.log("verification box")}
    <div className="flex flex-col items-center">
      
      <p className="mb-4 text-gray-600">Please complete the verification to continue</p>
      {(
        <Turnstile
          onVerify={handleVerification}
        />
      )}
    </div></>
  )
  
  const LoadingUI = () => (
    <>
    
    <div className="justify-center">
        <p dangerouslySetInnerHTML={{ __html: loadingMessages[messageIndex] }} />
        {CurrentStep && (
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600 capitalize">{CurrentStep}</p>
            <div className="w-64 h-2 bg-gray-200 rounded-full mt-2">
            </div>
          </div>
        )}
      </div> </>
  )
  return (
    
      <div className="flex flex-col justify-center gap-2 mb-6">
      
        { <PricingPortal isOpen={showPricing} /> }
        
        
        <div className="justify-center items-center">
          
        <Button variant={mode === 'youtube' ? 'default' : 'outline'} onClick={() => setMode('youtube')} className='m-1'>YouTube</Button>
      <Button variant={mode === 'longtext' ? 'default' : 'outline'} onClick={() => setMode('longtext')} className='m-1'>Long Text</Button>
        
        {!isVerified ? (
          // Show verification box if not verified
          <VerificationBox />  
              
            ) : (
              <> {<TaskadeSidebar/> }
          <div className="flex flex-col items-center justify-center">
            
            <Input
              id="input"
              placeholder={mode === "youtube" ? `https://www.youtube.com/watch?${vId}` : "Input Text Here"}
              value={inputValue}
              onChange={handleInputChange}
              className="mt-2 pl-2 pr-2 lg:w-1/3 mb-6 resize border overflow-auto w-2/3 h-20"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            {YouTubeEmbedMemo}
              {/* <MindmapButtons editorRef={editorRef} taskId={taskId} session={session} /> */}
              
            </div>
      
          <Button className = 'mt-4' variant="default" onClick={handleSubmitWebhook} disabled={loading}>
            {loading? <Loader2 className="animate-spin w-4 h-4" /> : 'Generate Mindmap'}
          </Button>

      
        {error ? <p className="text-red-600">{error}</p> : null}
      </>
            )}
            {loading && (
              <LoadingUI />
            )}
            </div>
            

      </div>
      
    
    
  );
};

export default ModeSelector;
