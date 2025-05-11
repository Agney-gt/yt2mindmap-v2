'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import DeleteButton from './sidebarWithDeleteButton';
import { useTransition } from 'react';
import { Progress } from "@/components/ui/progress"

interface Props {
  id: string;
  title: string;
  createdAt: string;
}

export default function SidebarMindmapLink({ id, title, createdAt }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setLoading(isPending);
    const start = Date.now()
    let frameID = 0;
    const updateProgress = () => {
      const elapsed = Date.now() - start
      const percentage = Math.min((elapsed / 8000) * 100, 100)
      setProgress(percentage)

      if (percentage < 100) {
        frameID = requestAnimationFrame(updateProgress)
      }
    }

    requestAnimationFrame(updateProgress)
    return () => cancelAnimationFrame(frameID)
  
  }, [isPending]);
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    setLoading(true);
    startTransition(() => {
        router.push(`/mindmap?id=${id}`);
      });
  };

  return (
    <div className="flex justify-between items-center w-full">
      <Link
        href={`/mindmap?id=${id}`}
        onClick={handleClick}
        className="flex flex-col flex-grow cursor-pointer"
      >
        {loading ? (
             <> 
             
             { <Progress value={progress} className="w-[60%]" /> }
             </>
          
        ) : (
          <>
          
            <span className="truncate max-w-[75%] whitespace-nowrap overflow-hidden text-ellipsis">
              {title}
            </span>
            <span className="text-xs">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </>
        )}
      </Link>
      <DeleteButton mindmapId={id} />
    </div>
  );
}
