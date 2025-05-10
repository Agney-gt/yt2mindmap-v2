// app/mindmap/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust path as needed
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar-ssr"; // Adjust path if needed
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { getUserMindmaps } from '@/lib/getMindmaps';
import { MindmapEditor } from "@/components/mirrorEditor";
import { getMindmapById } from "@/lib/getMindmaps";

export default async function MindmapPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>; 
}) {
  const session = await getServerSession(authOptions);
  const mindmapId = await searchParams.then((params) => params.id);
  
  let htmlContent = `1`;
  if (mindmapId) {
    const result = await getMindmapById(mindmapId as string);
    htmlContent = result.htmlContent;
  
  }
  if (!session?.user?.email) {
    redirect("/api/auth/signin"); // Redirect to login
  }
  // console.time("getUserMindmaps");
  // const mindmaps = await getUserMindmaps(session.user.email);
  // console.timeEnd("getUserMindmaps");
  return (
    
    <div className="flex h-screen">
          {session && <div>
            {session && (
            <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger />
            </SidebarProvider>
          )}</div> }
        <div className="flex-1 text-center">
     
            <h1 className="flex justify-center text-3xl font-bold items-center tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Youtube to&nbsp;<span className="text-blue-300 ">MindMap</span>
            </h1>
            <div className="flex">
           <MindmapEditor session={session} htmlContents={htmlContent}/>
            </div>
           
            </div>
            
    </div>
          
    
  );
}
