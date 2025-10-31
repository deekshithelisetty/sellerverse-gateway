import { Home, Network, Sparkles, ShoppingBag, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
  { title: 'ONDC', url: '/dashboard/ondc', icon: Network, gradient: 'from-purple-500 to-pink-500' },
  { title: 'Experiences', url: '/dashboard/experiences', icon: Sparkles, gradient: 'from-pink-500 to-rose-500' },
  { title: 'Retail', url: '/dashboard/retail', icon: ShoppingBag, gradient: 'from-orange-500 to-yellow-500' },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings, gradient: 'from-gray-500 to-slate-500' },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="glass-card border-white/20">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 p-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/dashboard'}
                      className={({ isActive }) =>
                        `group flex ${open ? 'flex-row' : 'flex-col'} items-center gap-2 px-3 py-4 rounded-xl transition-all ${
                          isActive
                            ? 'glass-card border border-white/20 shadow-lg'
                            : 'hover:glass hover:border hover:border-white/10'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className={`${open ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg flex-shrink-0`}>
                            <item.icon className={`${open ? 'h-4 w-4' : 'h-5 w-5'} text-white`} />
                          </div>
                          <span className={`${open ? 'text-sm' : 'text-[10px]'} font-semibold text-center ${!open && 'mt-1'}`}>
                            {item.title}
                          </span>
                        </>
                      )}
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