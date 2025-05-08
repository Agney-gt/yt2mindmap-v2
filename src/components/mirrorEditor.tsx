"use client";
import { useState, useRef, useEffect } from "react";
import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import ModeSelector from "@/components/ModeSelector";
import { Session } from "next-auth";
import MindmapButtons from "@/components/mindmapButtons";

export function MindmapEditor({ session, htmlContents }: { session: Session, htmlContents: string }) {
  const editorRef = useRef<EditorView | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [htmlContent, setHtmlContent] = useState(htmlContents);
  const [taskId, setTaskId] = useState('');

  // 1️⃣ Create editor once on mount
  useEffect(() => {
    if (!editorContainerRef.current || editorRef.current) return;

    editorRef.current = new EditorView({
      parent: editorContainerRef.current,
      doc: htmlContent,
      extensions: [
        basicSetup,
        html(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newContent = update.state.doc.toString();
            setHtmlContent(newContent); // Update state when editor content changes
          }
        }),
      ],
    });

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []); // once on load

  // 2️⃣ Update editor + iframe when htmlContents changes (e.g. from DB/API)
  useEffect(() => {
    setHtmlContent(htmlContents);
    if (editorRef.current) {
      editorRef.current.dispatch({
        changes: {
          from: 0,
          to: editorRef.current.state.doc.length,
          insert: htmlContents,
        },
      });
    }
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlContents; // Update iframe's srcdoc
    }
  }, [htmlContents]); // Run only when htmlContents changes

  return (
    <div className="flex flex-col w-screen">
      <ModeSelector editorRef={editorRef} session={session} setTaskId={setTaskId} />
      
     <div id="mindmap" className={`h-full flex flex-col flex-grow gap-4 ${htmlContent !== `1`? 'block' : 'hidden'}`}>
        
      <iframe
          title="HTML Preview"
          id="mindmapView"
          ref={iframeRef}
          className="w-full h-full border border-blue-500 mb-4 mt-4"
          srcDoc={htmlContent} // Binding srcDoc with htmlContent for live preview
          allowFullScreen
        />
        <div
          ref={editorContainerRef}
          className="text-left editor-container w-full h-full border border-gray-300 rounded-md p-2 bg-gray-50 overflow-auto mt-4"
        />
        
      </div>
      {htmlContent !== `1`? (
        <MindmapButtons editorRef={editorRef} taskId={taskId} session={session} />
      ): null}
    </div>
  );
}
