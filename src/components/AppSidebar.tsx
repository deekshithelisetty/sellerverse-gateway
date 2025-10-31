import { Home, Network, Sparkles, ShoppingBag, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
  { title: 'ONDC', url: '/dashboard/ondc', icon: Network, gradient: 'from-purple-500 to-pink-500' },
  { title: 'Experiences', url: '/dashboard/experiences', icon: Sparkles, gradient: 'from-pink-500 to-rose-500' },
  { title: 'Retail', url: '/dashboard/retail', icon: ShoppingBag, gradient: 'from-orange-500 to-yellow-500' },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings, gradient: 'from-gray-500 to-slate-500' },
];

export function AppSidebar() {
  return (
    <nav className="flex flex-col gap-3">
      {menuItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.url}
          end={item.url === '/dashboard'}
          className={({ isActive }) =>
            `group flex flex-col items-center gap-2 px-3 py-4 rounded-2xl transition-all ${
              isActive
                ? 'glass-card border border-white/20 shadow-lg scale-105'
                : 'hover:glass hover:border hover:border-white/10 hover:scale-105'
            }`
          }
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
            <item.icon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-center">{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
}