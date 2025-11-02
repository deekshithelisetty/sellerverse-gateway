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
    const selectedMenuItem = menuItems.find(item => item.id === selectedMenu);
    
    return (
      <div className="h-full flex flex-col bg-background p-6">
        {/* Header Section with Menu Items and Category Buttons */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          {/* Left: Selected Menu Title and Divider */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">{selectedMenuItem?.title}</h2>
            <div className="w-64 h-0.5 bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 to-blue-500 animate-fade-in rounded-full" />
          </div>
          
          {/* Right: Menu Items + Category Buttons */}
          <div className="flex gap-3">
            {/* Menu Items (Published, Draft, Rejected, Media, Services, Stays) */}
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.id === selectedMenu;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedMenu(item.id)}
                  className="group relative overflow-hidden rounded-full 
                           w-[50px] h-[50px] hover:w-[160px]
                           transition-all duration-500 ease-in-out
                           flex items-center justify-center
                           bg-muted/20 hover:bg-transparent
                           border-2 border-border hover:border-transparent
                           shadow-lg hover:shadow-2xl
                           animate-card-fade-in
                           cursor-pointer"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Background Color (always visible) */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                    style={{
                      background: item.gradientFrom,
                    }}
                  />

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
                    className="w-6 h-6 text-white
                             opacity-100 scale-100 
                             group-hover:opacity-0 group-hover:scale-0
                             transition-all duration-300 ease-in-out
                             relative z-10"
                  />

                  {/* Text - Shown on Hover */}
                  <span 
                    className="absolute text-xs font-bold text-white tracking-wider
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
            
            {/* Category Buttons (Adventure, Culture, Food, Nature, Urban, Wellness) */}
            {categoryButtons.map((category, index) => {
              const CategoryIcon = category.icon;
              
              return (
                <button
                  key={category.id}
                  className="group relative overflow-hidden rounded-full 
                           w-[50px] h-[50px] hover:w-[160px]
                           transition-all duration-500 ease-in-out
                           flex items-center justify-center
                           bg-muted/20 hover:bg-transparent
                           border-2 border-border hover:border-transparent
                           shadow-lg hover:shadow-2xl
                           animate-card-fade-in
                           cursor-pointer"
                  style={{
                    animationDelay: `${(menuItems.length + index) * 50}ms`,
                  }}
                >
                  {/* Background Color (always visible) */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                    style={{
                      background: category.color,
                    }}
                  />

                  {/* Gradient Glow Blur */}
                  <div 
                    className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 
                             transition-opacity duration-500 ease-in-out -z-10"
                    style={{
                      background: category.color,
                    }}
                  />

                  {/* Icon - Hidden on Hover */}
                  <CategoryIcon 
                    className="w-6 h-6 text-white
                             opacity-100 scale-100 
                             group-hover:opacity-0 group-hover:scale-0
                             transition-all duration-300 ease-in-out
                             relative z-10"
                  />

                  {/* Text - Shown on Hover */}
                  <span 
                    className="absolute text-xs font-bold text-white tracking-wider
                             opacity-0 scale-0 
                             group-hover:opacity-100 group-hover:scale-100
                             transition-all duration-500 ease-in-out delay-100
                             z-10"
                  >
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
      <div className="mb-16 space-y-4 text-center animate-fade-in-top">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Experience Categories
        </h1>
        <div className="w-48 h-0.5 bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 to-blue-500 animate-fade-in rounded-full mx-auto" />
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
              {/* Background Color (always visible) */}
              <div 
                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{
                  background: item.gradientFrom,
                }}
              />

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
                className="w-7 h-7 text-white
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

    </div>
  );
}
