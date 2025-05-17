// app/mindmap/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust path as needed
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar-ssr"; // Adjust path if needed
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { getUserMindmaps } from '@/lib/getMindmaps';
import { MindmapEditor } from "@/components/mirrorEditor";
import { getMindmapById } from "@/lib/getMindmaps";
import Head from "next/head"; // Import Head
function removeHeaders(text: string) {
  // List of headers to be removed (including a space after the colon)
  const headers = [
      "Quote: ", "Rhetoric: ", "Counterpoint: ", "Rhetoric: ","Real-world Example: ","Sociopolitical Factors: ",
      "Cultural Reference: ", "Sociopolitical Context: ", 
      "Misconception: ", "Framework: ", "Pitfall: ", "Analogy: ", 
      "Thought Leader: ", "Method: ", "Case Study: ","Anecdote: ",
      "Trend: ", "Nuanced Insight: ","Pattern: ", "Academic Theory: ",
      "Appeal to Logic: ","Complexity: ", "Paradox: ", "Event: ", "Contradiction: ",
      "Data Point: ", "Metaphor", "Technological Innovation: ", "Historical Context: ","Cultural Context: ",
      "Economic Insight: ", "Psychological Insight: ", "Philosophical Insight: ",
  ];
  
  // Create a regex pattern by joining all headers with '|'
  const pattern = new RegExp(headers.join("|"), "g");
  
  // Replace all headers with an empty string
  return text.replace(pattern, "");

}  
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
    htmlContent = removeHeaders(htmlContent);
  
  }
  if (!session?.user?.email) {
    redirect("/api/auth/signin"); // Redirect to login
  }
  // console.time("getUserMindmaps");
  // const mindmaps = await getUserMindmaps(session.user.email);
  // console.timeEnd("getUserMindmaps");
  return (
    <>
    <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
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
          
    </>
  );
}
