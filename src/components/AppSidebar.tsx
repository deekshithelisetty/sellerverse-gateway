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
    <div className="flex items-center gap-4">
      {menuItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.url}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isActive
                ? 'glass-card border border-white/20 font-semibold'
                : 'hover:glass hover:border hover:border-white/10'
            }`
          }
        >
          <item.icon className="h-4 w-4" />
          <span className="text-sm">{item.title}</span>
        </NavLink>
      ))}
    </div>
  );
}