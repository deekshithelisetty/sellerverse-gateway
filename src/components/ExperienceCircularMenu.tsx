import { useState } from 'react';
import { FileCheck, FileText, FileX, Image, Wrench, Home, Mountain, Compass, Utensils, Trees, Building2, Sparkles } from 'lucide-react';
import { ExperienceCardSelector } from './ExperienceCardSelector';

interface MenuItem {
  id: string;
  title: string;
  icon: typeof FileCheck;
  gradientFrom: string;
  gradientTo: string;
}

interface CategoryButton {
  id: string;
  name: string;
  icon: typeof Mountain;
  color: string;
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

const categoryButtons: CategoryButton[] = [
  { id: 'adventure', name: 'Adventure', icon: Mountain, color: '#f97316' },
  { id: 'culture', name: 'Culture', icon: Compass, color: '#8b5cf6' },
  { id: 'food', name: 'Food', icon: Utensils, color: '#f59e0b' },
  { id: 'nature', name: 'Nature', icon: Trees, color: '#10b981' },
  { id: 'urban', name: 'Urban', icon: Building2, color: '#06b6d4' },
  { id: 'wellness', name: 'Wellness', icon: Sparkles, color: '#ec4899' },
];

export function ExperienceCircularMenu() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  // If a menu is selected, show the category view with cards
  if (selectedMenu) {
    return (
      <div className="h-full flex flex-col bg-background p-6">
        {/* Header Section with Categories */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">Experience Categories</h1>
            <p className="text-muted-foreground">Browse and manage your experiences</p>
          </div>
          
          {/* Category Buttons */}
          <div className="flex gap-3">
            {categoryButtons.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  className="group relative w-12 h-12 rounded-full flex items-center justify-center
                           bg-muted/20 hover:bg-muted/40 border border-border
                           transition-all duration-300 ease-in-out
                           hover:scale-110 hover:shadow-lg
                           animate-card-fade-in"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                  title={category.name}
                >
                  <Icon 
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: category.color }}
                  />
                  
                  {/* Tooltip */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                                 text-xs font-medium text-muted-foreground
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                 whitespace-nowrap pointer-events-none">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Card Selector */}
        <div className="flex-1 overflow-hidden">
          <ExperienceCardSelector />
        </div>
      </div>
    );
  }

  // Default circular menu view
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
              onClick={() => setSelectedMenu(item.id)}
              className="group relative overflow-hidden rounded-full 
                       w-[60px] h-[60px] hover:w-[180px]
                       transition-all duration-500 ease-in-out
                       flex items-center justify-center
                       bg-muted/20 hover:bg-transparent
                       border-2 border-border hover:border-transparent
                       shadow-lg hover:shadow-2xl
                       animate-card-fade-in
                       cursor-pointer"
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
          Click on any category to explore experiences
        </p>
      </div>
    </div>
  );
}
