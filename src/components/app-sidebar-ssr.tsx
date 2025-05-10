// components/AppSidebar.tsx
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
import { getUserMindmaps } from '@/lib/getMindmaps';
import SidebarMindmapLink from "./SidebarLink";
import { Suspense } from "react";
import { Loader2 } from 'lucide-react';

// Async function to fetch mindmaps
async function fetchMindmaps(email: string) {
  return await getUserMindmaps(email);
}

// Loading component
function LoadingSidebar() {
  return (
    <div className="p-4 text-gray-500">Loading...<Loader2 className="animate-spin w-6 h-6 text-bg-primary" /></div>
    
  );
}

export async function AppSidebar() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  // Use Suspense for loading state
  return (
    <Sidebar id="left-sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-center justify-center text-bg-primary font-bold text-[21px]'>Your Mindmaps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Suspense fallback={<LoadingSidebar />}>
                {/* Fetching and rendering mindmaps */}
                <SidebarMindmaps email={session.user.email} />
              </Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

// Separate component to handle mindmap fetching and rendering
async function SidebarMindmaps({ email }: { email: string }) {
  const mindmaps = await fetchMindmaps(email);

  return (
    <>
      {mindmaps && mindmaps.map((item) => (
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
