import { useState, useEffect } from 'react';
import { Tent, Flame, Droplet, TreePine, Mountain, Camera, Music, Palette, Wrench, Wifi, Coffee, Home, Hotel, Castle } from 'lucide-react';

interface ExperienceCard {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: typeof Tent;
}

// Published Experiences
const publishedExperiences: ExperienceCard[] = [
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

// Draft Experiences
const draftExperiences: ExperienceCard[] = [
  {
    id: 6,
    title: 'Desert Safari',
    description: 'Thrilling dune adventures',
    image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2000',
    icon: Mountain,
  },
  {
    id: 7,
    title: 'Lake House',
    description: 'Peaceful waterfront retreat',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2000',
    icon: Droplet,
  },
  {
    id: 8,
    title: 'Jungle Lodge',
    description: 'Wildlife immersion experience',
    image: 'https://images.unsplash.com/photo-1520084781524-c0a68286801f?q=80&w=2000',
    icon: TreePine,
  },
  {
    id: 9,
    title: 'Volcano Hiking',
    description: 'Epic crater exploration',
    image: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2000',
    icon: Flame,
  },
  {
    id: 10,
    title: 'Riverside Camping',
    description: 'Serene riverside stay',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000',
    icon: Tent,
  },
];

// Rejected Experiences
const rejectedExperiences: ExperienceCard[] = [
  {
    id: 11,
    title: 'Urban Rooftop',
    description: 'City views discontinued',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000',
    icon: Coffee,
  },
  {
    id: 12,
    title: 'Cave Exploration',
    description: 'Safety concerns noted',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000',
    icon: Mountain,
  },
  {
    id: 13,
    title: 'Ice Hotel',
    description: 'Seasonal limitations',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2000',
    icon: Hotel,
  },
  {
    id: 14,
    title: 'Underground Bar',
    description: 'Permit issues',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000',
    icon: Droplet,
  },
  {
    id: 15,
    title: 'Cliff Camping',
    description: 'High risk assessment',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000',
    icon: Tent,
  },
];

// Media Experiences
const mediaExperiences: ExperienceCard[] = [
  {
    id: 16,
    title: 'Photo Gallery',
    description: 'Curated visual stories',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2000',
    icon: Camera,
  },
  {
    id: 17,
    title: 'Video Archives',
    description: 'Experience highlights reel',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000',
    icon: Music,
  },
  {
    id: 18,
    title: 'Art Collection',
    description: 'Local artist showcase',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000',
    icon: Palette,
  },
  {
    id: 19,
    title: 'Drone Footage',
    description: 'Aerial perspectives',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000',
    icon: Camera,
  },
  {
    id: 20,
    title: 'Documentary',
    description: 'Behind the scenes',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000',
    icon: Music,
  },
];

// Services Experiences
const servicesExperiences: ExperienceCard[] = [
  {
    id: 21,
    title: 'Equipment Rental',
    description: 'Full gear availability',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2000',
    icon: Wrench,
  },
  {
    id: 22,
    title: 'Guide Services',
    description: 'Expert-led tours',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000',
    icon: Mountain,
  },
  {
    id: 23,
    title: 'Transportation',
    description: 'Door-to-door pickup',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000',
    icon: Wrench,
  },
  {
    id: 24,
    title: 'Wi-Fi Hotspot',
    description: 'Stay connected anywhere',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000',
    icon: Wifi,
  },
  {
    id: 25,
    title: 'Catering Service',
    description: 'Gourmet meal delivery',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2000',
    icon: Coffee,
  },
];

// Stays Experiences
const staysExperiences: ExperienceCard[] = [
  {
    id: 26,
    title: 'Boutique Hotel',
    description: 'Luxury city accommodation',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2000',
    icon: Hotel,
  },
  {
    id: 27,
    title: 'Country Villa',
    description: 'Rustic charm retreat',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2000',
    icon: Home,
  },
  {
    id: 28,
    title: 'Treehouse Stay',
    description: 'Elevated nature living',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000',
    icon: TreePine,
  },
  {
    id: 29,
    title: 'Castle Lodge',
    description: 'Historic grandeur',
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2000',
    icon: Castle,
  },
  {
    id: 30,
    title: 'Beach Bungalow',
    description: 'Oceanfront paradise',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2000',
    icon: Home,
  },
];

const experiencesByCategory: Record<string, ExperienceCard[]> = {
  published: publishedExperiences,
  draft: draftExperiences,
  rejected: rejectedExperiences,
  media: mediaExperiences,
  services: servicesExperiences,
  stays: staysExperiences,
};

interface ExperienceCardSelectorProps {
  category?: string;
}

export function ExperienceCardSelector({ category = 'published' }: ExperienceCardSelectorProps) {
  const experiences = experiencesByCategory[category] || publishedExperiences;
  const [activeCard, setActiveCard] = useState(experiences[0]?.id || 1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger staggered animation on mount
    setLoaded(true);
    // Reset active card when category changes
    setActiveCard(experiences[0]?.id || 1);
  }, [category, experiences]);

  return (
    <div className="h-full flex flex-col p-6">
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
