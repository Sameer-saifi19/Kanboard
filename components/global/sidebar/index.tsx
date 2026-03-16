import Link from "next/link";
import { menuItems, personalMenuItems } from "./menu-items";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import WorkspaceSwitch from "../workspace-switch";

type Props = {
  activeOrganizationId: string;
  userId: string;
};

export default function DashboardSidebar({
  activeOrganizationId,
  userId,
}: Props) {
  const workspaceItems = menuItems(activeOrganizationId);
  const personalItems = personalMenuItems(userId);
  const { open } = useSidebar();
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
            <Link href={process.env.NEXT_PUBLIC_APP_URL!} className="flex items-center gap-2">
              <h1 className="uppercase tracking-tighter text-primary text-2xl font-extrabold mb-2">
                {open ? "Kanboard" : "K"}
              </h1>
            </Link>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup className="space-y-2">
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              <WorkspaceSwitch/>
              {workspaceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex min-w-0 items-center gap-2">
                      {item.icon}
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Personal Settings</SidebarGroupLabel>
            <SidebarMenu>
              {personalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex min-w-0 items-center gap-2">
                      {item.icon}
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
