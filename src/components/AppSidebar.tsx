import { Home, Network, Sparkles, ShoppingBag, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'ONDC', url: '/dashboard/ondc', icon: Network },
  { title: 'Experiences', url: '/dashboard/experiences', icon: Sparkles },
  { title: 'Retail', url: '/dashboard/retail', icon: ShoppingBag },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

export function AppSidebar() {
  return (
    <nav className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.url}
          end={item.url === '/dashboard'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive
                ? 'glass-card border border-white/20 font-semibold shadow-lg'
                : 'hover:glass hover:border hover:border-white/10 hover:scale-105'
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          <span className="text-sm font-medium">{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
}