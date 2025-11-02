import { FileCheck, FileText, FileX, Image, Wrench, Home } from 'lucide-react';

interface MenuItem {
  id: string;
  title: string;
  icon: typeof FileCheck;
  gradientFrom: string;
  gradientTo: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'published',
    title: 'PUBLISHED',
    icon: FileCheck,
    gradientFrom: '#10b981',
    gradientTo: '#059669',
  },
  {
    id: 'draft',
    title: 'DRAFT',
    icon: FileText,
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
  },
  {
    id: 'rejected',
    title: 'REJECTED',
    icon: FileX,
    gradientFrom: '#ef4444',
    gradientTo: '#dc2626',
  },
  {
    id: 'media',
    title: 'MEDIA',
    icon: Image,
    gradientFrom: '#8b5cf6',
    gradientTo: '#7c3aed',
  },
  {
    id: 'services',
    title: 'SERVICES',
    icon: Wrench,
    gradientFrom: '#06b6d4',
    gradientTo: '#0891b2',
  },
  {
    id: 'stays',
    title: 'STAYS',
    icon: Home,
    gradientFrom: '#ec4899',
    gradientTo: '#db2777',
  },
];

export function ExperienceCircularMenu() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-background">
      {/* Header Section */}
      <div className="mb-16 space-y-2 text-center animate-fade-in-top">
        <h1 className="text-5xl font-bold">Experience Categories</h1>
        <p className="text-muted-foreground text-lg animate-fade-in-top-delayed">
          Select a category to manage your experiences
        </p>
      </div>

      {/* Circular Menu */}
      <div className="flex items-center justify-center gap-8 flex-wrap max-w-6xl px-8">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              className="group relative overflow-hidden rounded-full 
                       w-[60px] h-[60px] hover:w-[180px]
                       transition-all duration-500 ease-in-out
                       flex items-center justify-center
                       bg-muted/20 hover:bg-transparent
                       border-2 border-border hover:border-transparent
                       shadow-lg hover:shadow-2xl
                       animate-card-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient Background on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 
                         transition-opacity duration-500 ease-in-out"
                style={{
                  background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                }}
              />

              {/* Gradient Glow Blur */}
              <div 
                className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 
                         transition-opacity duration-500 ease-in-out -z-10"
                style={{
                  background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                }}
              />

              {/* Icon - Hidden on Hover */}
              <Icon 
                className="w-7 h-7 text-foreground
                         opacity-100 scale-100 
                         group-hover:opacity-0 group-hover:scale-0
                         transition-all duration-300 ease-in-out
                         relative z-10" 
              />

              {/* Text - Shown on Hover */}
              <span 
                className="absolute text-sm font-bold text-white tracking-wider
                         opacity-0 scale-0 
                         group-hover:opacity-100 group-hover:scale-100
                         transition-all duration-500 ease-in-out delay-100
                         z-10"
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Instruction Text */}
      <div className="mt-16 text-center animate-fade-in-top-delayed">
        <p className="text-muted-foreground text-sm">
          Hover over any category to explore
        </p>
      </div>
    </div>
  );
}
