"use client"
import {
   
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
import SidebarMindmapLink from "./SidebarLink";
import { useEffect, useState  } from "react";
import { Loader2 } from 'lucide-react';
function LoadingSidebar() {
  return (
    <div className="p-4 flex items-center justify-center text-gray-500">Loading...<Loader2 className="animate-spin w-6 h-6 text-bg-primary" /></div>
    
  );
}
type Mindmap = {
  id: string;
  title: string;
  createdAt: string;
};

async function fetchMindmaps(): Promise<Mindmap[]> {
  const response = await fetch(`/api/mindmaps`, { method: "GET" });
  if (!response.ok) throw new Error("Failed to fetch mindmaps");
  return await response.json();
}
// Separate component to handle mindmap fetching and rendering
export function SidebarMindmaps() {
    const [mindmaps, setMindmaps] = useState<Mindmap[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadMindmaps() {
          try {
            
            const start = performance.now();
            const data = await fetchMindmaps();
            const end = performance.now();

            console.log(`Fetch took ${(end - start).toFixed(2)} milliseconds.`);
            setMindmaps(data) 
          } catch (err) {
            console.log(err)
          } finally {
            console.log("done")
            setLoading(false);
          }
        }
        
    loadMindmaps();
}, []);
    
if (loading) return <LoadingSidebar />;
  return (
    <>
      {mindmaps &&
        mindmaps.map((item: Mindmap) => (
          <SidebarMenuItem key={item.id} className="my-2">
            <SidebarMenuButton asChild>
              <div className="flex justify-between items-center w-full">
                <SidebarMindmapLink
                  id={item.id}
                  title={item.title}
                  createdAt={item.createdAt}
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
    </>
  );
}