import { Home, Network, Sparkles, Settings, Landmark, Package, Webhook } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user } = useAuth();
  
  // Use collapsed prop to determine if expanded
  const isExpanded = !collapsed;
  
  // Filter menu items based on role
  const getFilteredMenuItems = () => {
    if (user?.role === 'admin') {
      // Admin sees all menus including Hookpoint
      return menuItems;
    } else if (user?.role === 'user') {
      // User sees all menus except Hookpoint
      return menuItems.filter(item => item.title !== 'Hookpoint');
    }
    // Seller sees all menus except Hookpoint
    return menuItems.filter(item => item.title !== 'Hookpoint');
  };
  
  const filteredMenuItems = getFilteredMenuItems();

  // Split menu items: before Settings, Settings, and after Settings
  const settingsIndex = filteredMenuItems.findIndex(item => item.title === 'Settings');
  const beforeSettings = filteredMenuItems.slice(0, settingsIndex);
  const settingsAndAfter = filteredMenuItems.slice(settingsIndex);

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
          `group flex items-center ${!isExpanded ? 'justify-center px-0' : 'gap-3 px-2'} w-full py-2 ${isExpanded ? 'rounded-xl' : ''} transition-all duration-300 ease-in-out ${
            isExpanded && isActive
              ? 'glass border border-white/10'
              : isExpanded
              ? 'hover:glass hover:border hover:border-white/10'
              : ''
          }`
        }
      >
        <div 
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out ${!isExpanded ? 'shadow-lg' : 'shadow-md'}`}
          style={{ 
            transform: !isExpanded ? 'scale(1.125)' : 'scale(1)',
            transitionDelay: !isExpanded ? '100ms' : '0ms'
          }}
        >
          <item.icon 
            className={`h-4 w-4 text-white transition-all duration-300 ease-in-out`}
            strokeWidth={2}
            style={{ 
              transform: !isExpanded ? 'scale(1.25)' : 'scale(1)',
              transitionDelay: !isExpanded ? '100ms' : '0ms'
            }}
          />
        </div>
        <div className={`flex flex-col overflow-hidden transition-[max-width,opacity] duration-300 ease-in-out ${!isExpanded ? 'max-w-0 opacity-0 delay-0' : 'max-w-[160px] opacity-100 delay-0'}`}>
          <span 
            className={`text-xs font-semibold whitespace-nowrap ${
              item.title === 'Hookpoint' 
                ? 'bg-clip-text text-transparent' 
                : ''
            }`}
            style={item.title === 'Hookpoint' ? { backgroundImage: 'linear-gradient(to right, #FF512F, #DD2476)' } : {}}
          >
            {item.title}
          </span>
          {item.subtitle && (
            <span className="text-[10px] font-normal opacity-80 leading-tight whitespace-nowrap">{item.subtitle}</span>
          )}
        </div>
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

          {/* Render dynamic categories */}
          {dynamicCategories.map((item, index) => (
            <div key={item.title}>
              {renderMenuItem(item, beforeSettings.length + index)}
            </div>
          ))}

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