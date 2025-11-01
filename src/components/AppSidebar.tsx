import { Home, Network, Sparkles, ShoppingBag, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
  { title: 'ONDC', url: '/dashboard/ondc', icon: Network, gradient: 'from-purple-500 to-pink-500' },
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
          {menuItems.map((item) => {
            const linkContent = (
              <NavLink
                key={item.title}
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
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${
                  collapsed 
                    ? 'bg-transparent' 
                    : `bg-gradient-to-br ${item.gradient} shadow-md`
                }`}>
                  <item.icon className={`h-5 w-5 ${collapsed ? 'text-foreground' : 'text-white'}`} />
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
          })}
        </TooltipProvider>
      </nav>
    </div>
  );
}