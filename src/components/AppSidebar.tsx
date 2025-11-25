import { Home, Network, Sparkles, Settings, Landmark, Package, Webhook, FolderTree, ChevronDown, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCategoryPermissions } from '@/contexts/CategoryContext';
import { categories } from '@/lib/categories';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
  { title: 'Category Management', url: '/dashboard/category-management', icon: FolderTree, gradient: 'from-indigo-500 to-purple-500' },
  { title: 'ONDC', url: '/dashboard/ondc', icon: Network, gradient: 'from-purple-500 to-pink-500' },
  { title: 'NBBL', subtitle: '(Settlement Agency)', url: '/dashboard/nbbl', icon: Landmark, gradient: 'from-green-500 to-teal-500' },
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
  const { getUserSubcategoryStatus } = useCategoryPermissions();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  // Use collapsed prop to determine if expanded
  const isExpanded = !collapsed;
  
  // Get categories with enabled subcategories for the logged-in user
  const getUserEnabledCategories = () => {
    if (!user?.email) return [];
    
    const enabledCategories: Array<{ category: typeof categories[0]; subcategories: Array<{ id: string; name: string }> }> = [];
    
    categories.forEach(category => {
      const enabledSubcategories = category.subcategories.filter(subcategory => 
        getUserSubcategoryStatus(user.email, category.id, subcategory.id)
      );
      
      if (enabledSubcategories.length > 0) {
        enabledCategories.push({
          category,
          subcategories: enabledSubcategories.map(s => ({ id: s.id, name: s.name }))
        });
      }
    });
    
    return enabledCategories;
  };
  
  const userEnabledCategories = getUserEnabledCategories();
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };
  
  // Filter menu items based on role
  const getFilteredMenuItems = () => {
    if (user?.role === 'admin') {
      // Admin sees all menus including Hookpoint, but excludes ONDC and NBBL
      return menuItems.filter(item => item.title !== 'ONDC' && item.title !== 'NBBL');
    } else if (user?.role === 'user') {
      // User sees all menus except Hookpoint and Category Management
      return menuItems.filter(item => item.title !== 'Hookpoint' && item.title !== 'Category Management');
    }
    // Seller sees all menus except Hookpoint and Category Management
    return menuItems.filter(item => item.title !== 'Hookpoint' && item.title !== 'Category Management');
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

  const dynamicCategories = interestedCategories.map((category, index) => {
    // Special handling for Experience category
    const isExperience = category.toLowerCase() === 'experience';
    return {
      title: category,
      url: isExperience ? '/dashboard/experiences' : `/dashboard/${category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`,
      icon: isExperience ? Sparkles : Package,
      gradient: isExperience ? 'from-pink-500 to-rose-500' : categoryGradients[index % categoryGradients.length],
    };
  });

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

          {/* Render user-enabled categories with subcategories */}
          {user?.role === 'user' && userEnabledCategories.map(({ category, subcategories }) => {
            const isCategoryExpanded = expandedCategories.has(category.id);
            const Icon = category.icon;
            const categoryGradient = 'from-indigo-500 to-purple-500';
            
            return (
              <div key={category.id} className="flex flex-col">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`group flex items-center ${!isExpanded ? 'justify-center px-0' : 'gap-3 px-2'} w-full py-2 ${isExpanded ? 'rounded-xl' : ''} transition-all duration-300 ease-in-out hover:glass hover:border hover:border-white/10`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${categoryGradient} flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out ${!isExpanded ? 'shadow-lg' : 'shadow-md'}`}
                    style={{ 
                      transform: !isExpanded ? 'scale(1.125)' : 'scale(1)',
                      transitionDelay: !isExpanded ? '100ms' : '0ms'
                    }}
                  >
                    <Icon 
                      className={`h-4 w-4 text-white transition-all duration-300 ease-in-out`}
                      strokeWidth={2}
                      style={{ 
                        transform: !isExpanded ? 'scale(1.25)' : 'scale(1)',
                        transitionDelay: !isExpanded ? '100ms' : '0ms'
                      }}
                    />
                  </div>
                  <div className={`flex items-center flex-1 overflow-hidden transition-[max-width,opacity] duration-300 ease-in-out ${!isExpanded ? 'max-w-0 opacity-0 delay-0' : 'max-w-[160px] opacity-100 delay-0'}`}>
                    <span className="text-xs font-semibold whitespace-nowrap flex-1">
                      {category.name}
                    </span>
                    {isExpanded && (
                      isCategoryExpanded ? (
                        <ChevronDown className="h-3 w-3 text-foreground/60 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-foreground/60 flex-shrink-0" />
                      )
                    )}
                  </div>
                </button>
                
                {/* Subcategories */}
                {isExpanded && isCategoryExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {subcategories.map((subcategory) => (
                      <NavLink
                        key={subcategory.id}
                        to={`/dashboard/${category.id}/${subcategory.id}`}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'
                          }`
                        }
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></div>
                        <span className="truncate">{subcategory.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

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