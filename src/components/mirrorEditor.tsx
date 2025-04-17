"use client";
import { useState, useRef, useEffect } from "react";
import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import ModeSelector from "@/components/ModeSelector";
import { Session } from "next-auth";


export function MindmapEditor({ session, htmlContents }: { session: Session, htmlContents: string }) {
  const editorRef = useRef<EditorView | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [htmlContent, setHtmlContent] = useState(htmlContents);
  console.log(session)

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
            setHtmlContent(newContent);
          }
        }),
      ],
    });

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [htmlContent]); // 👈 empty dependency array = run only once on mount

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
      iframeRef.current.srcdoc = htmlContents;
    }
  }, [htmlContents]);

  return (
    
    <div className="flex flex-col w-screen">
      <ModeSelector editorRef={editorRef} session={session} />
      <div id="mindmap" className="w-[90vw] h-[700px] ml-[40px] flex gap-4">
        <div
          ref={editorContainerRef}
          className="text-left editor-container w-1/2 h-full border border-gray-300 rounded-md p-2 bg-gray-50 overflow-auto mt-4"
        />
        <iframe
          title="HTML Preview"
          id="view"
          ref={iframeRef}
          className="w-3/4 h-full border border-gray-300 mb-4 mt-4"
          srcDoc={htmlContent}
          allowFullScreen
        />
      </div></div>
    
  );
}
