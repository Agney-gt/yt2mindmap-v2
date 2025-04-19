// app/mindmap/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust path as needed
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar-ssr"; // Adjust path if needed
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getUserMindmaps } from '@/lib/getMindmaps';
import { TaskadeSidebar } from "@/components/TaskadeSidebar";
import { MindmapEditor } from "@/components/mirrorEditor";
import { getMindmapById } from "@/lib/getMindmaps";

export default async function MindmapPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>; 
}) {
  const session = await getServerSession(authOptions);
  const mindmapId = await searchParams.then((params) => params.id);
  
  let htmlContent = `Use Google's Picture-in-Picture extension and Canva’s Grab Text for the best viewing and editing experience.`;
  if (mindmapId) {
    const result = await getMindmapById(mindmapId as string);
    htmlContent = result.htmlContent;
  
  }
  if (!session?.user?.email) {
    redirect("/api/auth/signin"); // Redirect to login
  }
  const mindmaps = await getUserMindmaps(session.user.email);

  return (
    <div className="flex h-screen">
          <div>
            {session && (
            <SidebarProvider>
              <AppSidebar mindmaps={mindmaps}/>
              <SidebarTrigger />
            </SidebarProvider>
          )}</div>
        <div className="flex-1 text-center">
     
            <h1 className="flex justify-center text-3xl font-bold items-center tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Youtube to <span className="text-purple-100">   MindMap</span>
            </h1>
            <div className="flex">
            <MindmapEditor session={session} htmlContents={htmlContent}/>
            </div>
           
            </div>
            { <TaskadeSidebar/> }
    </div>
          
    
  );
}
