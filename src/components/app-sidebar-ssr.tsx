import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
  import { getServerSession } from "next-auth";
  import { authOptions } from "@/lib/auth"; // Adjust path if needed

  interface SavedMindmap {
    id: string;
    title: string;
    createdAt: string;
  }
  import SidebarMindmapLink from "./SidebarLink";
  
  export async function AppSidebar({mindmaps}: { mindmaps: SavedMindmap[] }) {
    const session = await getServerSession(authOptions);
  
    if (!session?.user?.email) return null;
  
 
  
    return (
      <Sidebar id="left-sidebar">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mindmaps && mindmaps.map((item) => (
                  <SidebarMenuItem key={item.id} className="my-2">
                    <SidebarMenuButton asChild>
                      <div className="flex justify-between items-center w-full">
                      <SidebarMindmapLink
                          id={item.id}
                          title={item.title}
                          createdAt={item.createdAt}
                        />
                        {/* NOTE: Delete button below won't work in a server component. See note below */}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
  