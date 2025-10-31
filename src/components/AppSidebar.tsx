import { Home, Network, Sparkles, ShoppingBag, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'ONDC', url: '/dashboard/ondc', icon: Network },
  { title: 'Experiences', url: '/dashboard/experiences', icon: Sparkles },
  { title: 'Retail', url: '/dashboard/retail', icon: ShoppingBag },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

export function AppSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === '/dashboard'}
            className={({ isActive }) =>
              `group flex flex-col items-center gap-2 px-3 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-white/20 border border-white/30 shadow-md'
                  : 'hover:bg-white/10 hover:border hover:border-white/20'
              }`
            }
          >
            <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/20">
              <item.icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium text-center">{item.title}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Animated Divider */}
      <div className="relative px-4">
        <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
      </div>
    </div>
  );
}