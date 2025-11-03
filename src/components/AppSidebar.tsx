import { Home, Network, Sparkles, ShoppingBag, Settings, ChevronLeft, ChevronRight, Landmark, Package } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSettings } from '@/contexts/SettingsContext';
import { motion, AnimatePresence } from 'motion/react';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
  { title: 'ONDC', url: '/dashboard/ondc', icon: Network, gradient: 'from-purple-500 to-pink-500' },
  { title: 'NBBL (Settlement Agency)', url: '/dashboard/nbbl', icon: Landmark, gradient: 'from-green-500 to-teal-500' },
  { title: 'Experiences', url: '/dashboard/experiences', icon: Sparkles, gradient: 'from-pink-500 to-rose-500' },
  { title: 'Retail', url: '/dashboard/retail', icon: ShoppingBag, gradient: 'from-orange-500 to-yellow-500' },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings, gradient: 'from-gray-500 to-slate-500' },
];

export function AppSidebar({ 
  collapsed, 
  onToggle 
}: { 
  collapsed: boolean; 
  onToggle: () => void;
}) {
  const { interestedCategories } = useSettings();

  // Split menu items: before Settings and Settings
  const experiencesIndex = menuItems.findIndex(item => item.title === 'Experiences');
  const settingsIndex = menuItems.findIndex(item => item.title === 'Settings');
  const beforeSettings = menuItems.slice(0, settingsIndex);
  const settingsItem = menuItems[settingsIndex];

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
          `group flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-2 py-1.5 rounded-lg transition-all ${
            isActive
              ? 'glass-card border border-white/20 shadow-lg'
              : 'hover:glass hover:border hover:border-white/10'
          }`
        }
      >
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
          <item.icon className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-xs font-semibold whitespace-nowrap">{item.title}</span>
        )}
      </NavLink>
    );

    return collapsed ? (
      <Tooltip key={item.title}>
        <TooltipTrigger asChild>
          {linkContent}
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-background border border-white/20">
          <p>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    ) : linkContent;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 hover:bg-white/10"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-3 flex-1">
        <TooltipProvider delayDuration={0}>
          {/* Render items before Settings */}
          {beforeSettings.map((item, index) => renderMenuItem(item, index))}

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

          {/* Render Settings at the end */}
          {renderMenuItem(settingsItem, menuItems.length - 1)}
        </TooltipProvider>
      </nav>
    </div>
  );
}