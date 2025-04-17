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
export default async function MindmapPage({ searchParams }: { searchParams: { id?: string } }) {
  const session = await getServerSession(authOptions);
  const mindmapId = searchParams.id;
  let htmlContent = `Firefox’s Picture-in-Picture mode for algorithm videos or the Research Assistant 

on the right sidebar can get you video links easily.

Turns out, clarity isn’t about stuffing more into your brain; 

it’s about seeing what’s already there.`;
  if (mindmapId) {
    const result = await getMindmapById(mindmapId as string);
    htmlContent = result.htmlContent;
    console.log(htmlContent)
  }
  if (!session?.user?.email) {
    redirect("/api/auth/signin"); // Redirect to login
  }
  const mindmaps = await getUserMindmaps(session.user.email);
  console.log(session, mindmaps);
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
                Youtube to <span className="text-purple-200">MindMap</span>
            </h1>
            <div className="flex">
            <MindmapEditor session={session} htmlContents={htmlContent}/>
            </div>
           
            </div>
            { <TaskadeSidebar/> }
    </div>
          
    
  );
}
