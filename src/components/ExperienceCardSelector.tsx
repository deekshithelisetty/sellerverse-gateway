import { useState, useEffect } from 'react';
import { Tent, Flame, Droplet, TreePine, Mountain } from 'lucide-react';

interface ExperienceCard {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: typeof Tent;
}

const experiences: ExperienceCard[] = [
  {
    id: 1,
    title: 'Luxury Tent',
    description: 'Cozy glamping under the stars',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2000',
    icon: Tent,
  },
  {
    id: 2,
    title: 'Night Camp',
    description: 'Bonfire experience under moonlight',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000',
    icon: Flame,
  },
  {
    id: 3,
    title: 'Beach Resort',
    description: 'Tranquil oceanside getaway',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2000',
    icon: Droplet,
  },
  {
    id: 4,
    title: 'Forest Trail',
    description: 'Nature walks through pine forests',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000',
    icon: TreePine,
  },
  {
    id: 5,
    title: 'Mountain Trek',
    description: 'Adventure hiking in misty mountains',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000',
    icon: Mountain,
  },
];

export function ExperienceCardSelector() {
  const [activeCard, setActiveCard] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger staggered animation on mount
    setLoaded(true);
  }, []);

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header Section */}
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold animate-fade-in-top">
          Explore Experiences
        </h1>
        <p className="text-muted-foreground text-lg animate-fade-in-top-delayed">
          Select your perfect adventure from our curated collection
        </p>
      </div>

      {/* Horizontal Card Selector */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-4 items-center w-full max-w-7xl px-8">
          {experiences.map((exp, index) => {
            const isActive = activeCard === exp.id;
            const Icon = exp.icon;
            
            return (
              <button
                key={exp.id}
                onClick={() => setActiveCard(exp.id)}
                className={`
                  relative overflow-hidden rounded-2xl
                  transition-all duration-700 ease-out
                  ${loaded ? 'animate-card-fade-in' : 'opacity-0'}
                  ${isActive 
                    ? 'flex-[2] h-[400px] shadow-2xl border-4 border-primary scale-105' 
                    : 'flex-1 h-[320px] shadow-lg border-2 border-white/20 opacity-70 hover:opacity-90'
                  }
                `}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Background Image */}
                <div 
                  className={`
                    absolute inset-0 bg-cover bg-center
                    transition-transform duration-700 ease-out
                    ${isActive ? 'scale-110' : 'scale-100'}
                  `}
                  style={{ backgroundImage: `url(${exp.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Icon */}
                <div className={`
                  absolute top-6 left-6 
                  rounded-full bg-white/90 backdrop-blur-sm
                  flex items-center justify-center
                  transition-all duration-700
                  ${isActive ? 'w-16 h-16' : 'w-12 h-12'}
                `}>
                  <Icon 
                    className={`
                      text-primary transition-all duration-700
                      ${isActive ? 'w-8 h-8' : 'w-6 h-6'}
                    `} 
                  />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 
                    className={`
                      font-bold text-white mb-2
                      transition-all duration-700 ease-out
                      ${isActive 
                        ? 'text-3xl opacity-100 translate-y-0' 
                        : 'text-xl opacity-80 translate-y-2'
                      }
                    `}
                  >
                    {exp.title}
                  </h3>
                  <p 
                    className={`
                      text-white/90 
                      transition-all duration-700 ease-out
                      ${isActive 
                        ? 'text-base opacity-100 translate-y-0 max-h-20' 
                        : 'text-sm opacity-0 translate-y-4 max-h-0'
                      }
                    `}
                  >
                    {exp.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
