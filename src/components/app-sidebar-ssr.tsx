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
  import Link from "next/link";
  import DeleteButton from "./sidebarWithDeleteButton";
  interface SavedMindmap {
    id: string;
    title: string;
    createdAt: string;
  }
  
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
                        <Link href={`/mindmap?id=${item.id}`} className="flex flex-col flex-grow">
                        <span className="truncate max-w-[75%] whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.title}
                        </span>
                          <span className="text-xs">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </Link>
                        <DeleteButton mindmapId={item.id}/>
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
  