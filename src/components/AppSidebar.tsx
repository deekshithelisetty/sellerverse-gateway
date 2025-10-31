import { Home, Network, Sparkles, ShoppingBag, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'ONDC', url: '/dashboard/ondc', icon: Network },
  { title: 'Experiences', url: '/dashboard/experiences', icon: Sparkles },
  { title: 'Retail', url: '/dashboard/retail', icon: ShoppingBag },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="glass-card border-white/20">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gradient font-semibold">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'glass-card border-white/20 rounded-xl hover:scale-105 transition-all'
                          : 'hover:glass hover:border-white/10 rounded-xl hover:scale-105 transition-all'
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
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