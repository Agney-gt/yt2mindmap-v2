'use client';

import { useState } from 'react'; // adjust this import based on your project structure
import { Session } from 'next-auth'; // Ensure this import matches your project setup
import { EditorView } from '@codemirror/view'; // Ensure this import matches your project setup
import { Button } from '@/components/ui/button'; // Adjust this import based on your project structure
import { Loader2 } from 'lucide-react'; // Ensure this import matches your project setup

interface mindmapButtonsProps {
  editorRef: React.RefObject<EditorView | null>;
  session: Session;
  taskId: string;

}
const  MindmapButtons = ({ editorRef, session, taskId }: mindmapButtonsProps) => {
  //const [inputValue, setInputValue] = useState('');

  //const editorRef = useRef<EditorView | null>(null);
  //const [TaskId, setTaskId] = useState('');

  const [saving, setSaving] = useState(false);
  
  const handleSave = async () => {
    if (!session?.user?.email) {
      console.error('User not authenticated');
      return;
    }
    setSaving(true);
    try {
      const currentHtml = editorRef.current?.state.doc.toString() ;
      const urlParams = new URLSearchParams(window.location.search);
      const mindmapId = urlParams.get('id');
      const endpoint = mindmapId ? `/api/mindmaps/${mindmapId}` : `/api/mindmaps/${taskId}`;
      const method = mindmapId ? 'PUT' : 'POST';
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Mindmap - ${new Date().toLocaleString()}`,
          htmlContent: currentHtml,
        }),
      });
      if (response.ok) {
        console.log('Mindmap saved:', await response.json());
      } else {
        console.error('Failed to save mindmap');
      }
    } catch (error) {
      console.error('Error saving mindmap:', error);
    } finally {
      setSaving(false);
    }
  };
  
  const enterFullscreen = () => {
    const iframe = document.getElementById('mindmap') as HTMLIFrameElement;
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };
  return (
    
      <div className="flex justify-center gap-2 mb-6">

            
            <div className="flex space-x-2 mb-4 mt-10" id="buttons">
            <Button variant="outline" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="animate-spin w-4 h-4" /> : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={enterFullscreen}>Go Fullscreen</Button>
            <Button variant="outline" onClick={() => {
              console.log(editorRef)
              if (editorRef.current) {
                console.log("here")
                const currentContent = editorRef.current.state.doc.toString();
                const fixedContent = currentContent.replace(/\\n/g, '');
                editorRef.current.dispatch({
                  changes: { from: 0, to: editorRef.current.state.doc.length, insert: fixedContent }
                });
              }
            }}>Fix Syntax</Button>
            {/* <Button variant="outline" onClick={handleStartTour}>Show tour</Button> */ }
          </div>
          </div>

 
      
    
    
  );
};

export default MindmapButtons;
