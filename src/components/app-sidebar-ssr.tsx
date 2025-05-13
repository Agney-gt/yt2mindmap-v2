
// components/AppSidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  
} from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust path if needed
import { SidebarMindmaps } from "./SidebarMindmaps"; // Adjust path if needed



export async function AppSidebar() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  // Use Suspense for loading state
  return (
    <Sidebar id="left-sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-center justify-center text-bg-primary font-bold text-[18px] border border-blue-200'>Your Mindmaps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              
                <SidebarMindmaps/>
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}


