'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import DeleteButton from './sidebarWithDeleteButton';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
interface Props {
  id: string;
  title: string;
  createdAt: string;
}

export default function SidebarMindmapLink({ id, title, createdAt }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setLoading(isPending);
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
            <> <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          <span className="text-sm italic">Loading...</span></>
          
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
