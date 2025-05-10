'use client';

import { useState } from 'react'; // adjust this import based on your project structure
import { Session } from 'next-auth'; // Ensure this import matches your project setup
import { EditorView } from '@codemirror/view'; // Ensure this import matches your project setup
import { Button } from '@/components/ui/button'; // Adjust this import based on your project structure
import { Loader2, Save, Maximize, Code } from 'lucide-react'; // Ensure this import matches your project setup

interface mindmapButtonsProps {
  editorRef: React.RefObject<EditorView | null>;
  session: Session;
  taskId: string;

}
const  MindmapButtons = ({ editorRef, session, taskId }: mindmapButtonsProps) => {

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
    const iframe = document.getElementById('mindmapView') as HTMLIFrameElement;
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };
  return (
    
    <div className="fixed bottom-0 right-0 h-1/2 z-50 flex items-center ">
            
            <div className="flex flex-col space-y-4 space-x-2 mb-4 mt-10" id="buttons">
            <Button variant="default" size="icon" onClick={handleSave} disabled={saving} title="Save Changes">
              {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="text-black w-4 h-4" />}
            </Button>
            <Button variant="default" size = "icon" title = 'Fullscreen' onClick={enterFullscreen}><Maximize className="text-black w- h-4" /></Button>
            <Button variant="default" size = "icon" title='Fix Syntax' onClick={() => {
              
              if (editorRef.current) {
                const currentContent = editorRef.current.state.doc.toString().replace(/\\"/g, '');
                const match = currentContent.match(/<div class="mermaid">([\s\S]*?)<\/div>/) || currentContent.match(/<div class='mermaid'>([\s\S]*?)<\/div>/)
                const extracted = match? match[1] : "";
                const cleaned = extracted
                  .replace(/\\n/g, '').replace(/\\/g, '')
                  .replace(/(?<!\()\((?!\()/g, '')   // remove ( not part of ((
                  .replace(/(?<!\))\)(?!\))/g, '')  // remove ) not part of ))
                  .replace(/(\.\.\.|\[|\])/g, ''); // remove extra spaces
                const fullMatch = match? match[0]: "";
                const updatedMatch = `<div class="mermaid">${cleaned}</div>`;
                const fixedContent = currentContent.replace(fullMatch, updatedMatch);
                editorRef.current.dispatch({
                  changes: { from: 0, to: editorRef.current.state.doc.length, insert: fixedContent }
                });
              }
            }}><Code className='text-black h-4 w-4' /></Button>
            {/* <Button variant="outline" onClick={handleStartTour}>Show tour</Button> */ }
          </div>
          </div>

 
      
    
    
  );
};

export default MindmapButtons;
