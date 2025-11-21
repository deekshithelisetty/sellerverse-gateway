import { Home, Network, Sparkles, Settings, Landmark, Package, Webhook } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
  { title: 'ONDC', url: '/dashboard/ondc', icon: Network, gradient: 'from-purple-500 to-pink-500' },
  { title: 'NBBL', subtitle: '(Settlement Agency)', url: '/dashboard/nbbl', icon: Landmark, gradient: 'from-green-500 to-teal-500' },
  { title: 'Experiences', url: '/dashboard/experiences', icon: Sparkles, gradient: 'from-pink-500 to-rose-500' },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings, gradient: 'from-gray-500 to-slate-500' },
  { title: 'Hookpoint', url: '/dashboard/hookpoint', icon: Webhook, gradient: 'from-orange-500 to-red-500' },
];

export function AppSidebar({ 
  collapsed, 
  onToggle 
}: { 
  collapsed: boolean; 
  onToggle: () => void;
}) {
  const { interestedCategories } = useSettings();
  
  // Use collapsed prop to determine if expanded
  const isExpanded = !collapsed;

  // Split menu items: before Settings, Settings, and after Settings
  const settingsIndex = menuItems.findIndex(item => item.title === 'Settings');
  const beforeSettings = menuItems.slice(0, settingsIndex);
  const settingsAndAfter = menuItems.slice(settingsIndex);

  // Create dynamic category items
  const categoryGradients = [
    'from-red-500 to-orange-500',
    'from-blue-500 to-indigo-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-amber-500',
    'from-violet-500 to-purple-500',
    'from-cyan-500 to-blue-500',
  ];

  const dynamicCategories = interestedCategories.map((category, index) => ({
    title: category,
    url: `/dashboard/${category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`,
    icon: Package,
    gradient: categoryGradients[index % categoryGradients.length],
  }));

  const renderMenuItem = (item: typeof menuItems[0], index: number) => {
    const linkContent = (
      <NavLink
        to={item.url}
        end={item.url === '/dashboard'}
        className={({ isActive }) =>
          !isExpanded
            ? `group flex items-center justify-center px-0 w-full py-2 transition-all`
            : `group flex items-center gap-3 px-2 py-1.5 rounded-lg transition-all ${
                isActive
                  ? 'glass-card border border-white/20 shadow-lg'
                  : 'hover:glass hover:border hover:border-white/10'
              }`
        }
      >
        <div className={`${!isExpanded ? 'w-9 h-9' : 'w-8 h-8'} rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform ${!isExpanded ? 'shadow-lg' : 'shadow-md'} flex-shrink-0`}>
          <item.icon className={`${!isExpanded ? 'h-5 w-5' : 'h-4 w-4'} text-white`} strokeWidth={2} />
        </div>
        {isExpanded && (
          <div className="flex flex-col">
            <span 
              className={`text-xs font-semibold ${
                item.title === 'Hookpoint' 
                  ? 'bg-clip-text text-transparent' 
                  : ''
              }`}
              style={item.title === 'Hookpoint' ? { backgroundImage: 'linear-gradient(to right, #FF512F, #DD2476)' } : {}}
            >
              {item.title}
            </span>
            {item.subtitle && (
              <span className="text-[10px] font-normal opacity-80 leading-tight">{item.subtitle}</span>
            )}
          </div>
        )}
      </NavLink>
    );

    return linkContent;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation Menu */}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-3 pr-2">
          {/* Render items before Settings */}
          {beforeSettings.map((item, index) => (
            <div key={item.title}>
              {renderMenuItem(item, index)}
            </div>
          ))}

          {/* Render dynamic categories with animation */}
          <AnimatePresence>
            {dynamicCategories.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {renderMenuItem(item, beforeSettings.length + index)}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Render Settings and items after Settings */}
          {settingsAndAfter.map((item, index) => (
            <div key={item.title}>
              {renderMenuItem(item, settingsIndex + index)}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}