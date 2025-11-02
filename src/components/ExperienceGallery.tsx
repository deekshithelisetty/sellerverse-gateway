import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';

interface Experience {
  id: string;
  name: string;
  thumbnailImage?: string;
}

// Mock data - replace with actual data from backend
const mockExperiences: Experience[] = [
  { id: '1', name: 'Mountain Adventure Trek', thumbnailImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { id: '2', name: 'Coastal Sunset Cruise', thumbnailImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
  { id: '3', name: 'Cultural Heritage Tour', thumbnailImage: 'https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=400' },
  { id: '4', name: 'Wildlife Safari Experience', thumbnailImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400' },
  { id: '5', name: 'Urban Food Discovery', thumbnailImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
  { id: '6', name: 'Desert Stargazing Night', thumbnailImage: 'https://images.unsplash.com/photo-1506318164473-2dfd3ede3623?w=400' },
  { id: '7', name: 'Tropical Island Escape', thumbnailImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
  { id: '8', name: 'Historic Castle Walk', thumbnailImage: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400' },
  { id: '9', name: 'Vineyard Wine Tasting', thumbnailImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400' },
  { id: '10', name: 'Northern Lights Quest', thumbnailImage: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=400' },
];

export const ExperienceGallery = () => {
  // Calculate position along a rainbow arc for each card
  const getCardPosition = (index: number) => {
    const totalCards = mockExperiences.length;
    // Arc spans from -70 to 70 degrees (140 degree arc for wider spread)
    const startAngle = -70;
    const endAngle = 70;
    const angleStep = (endAngle - startAngle) / (totalCards - 1);
    const angle = (startAngle + angleStep * index) * (Math.PI / 180);
    
    // Radius of the arc
    const radius = 400;
    
    // Calculate x and y positions
    const x = radius * Math.sin(angle);
    const y = -radius * Math.cos(angle) + radius;
    
    // Rotation for card to follow the curve
    const rotation = angle * (180 / Math.PI);
    
    return { x, y, rotation };
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-20 pb-16 px-8 overflow-hidden">
      <div className="relative w-full flex items-center justify-center mb-24">
        <div className="relative w-full max-w-7xl h-[500px]">
          {mockExperiences.map((experience, index) => {
            const { x, y, rotation } = getCardPosition(index);
            
            return (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: x,
                  y: y,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: y - 15,
                  zIndex: 50,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '180px',
                }}
              >
                <Card className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-2xl rounded-2xl p-2">
                  <motion.div
                    className="aspect-[3/4] relative overflow-hidden rounded-xl"
                    initial={{ rotate: rotation }}
                    whileHover={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={experience.thumbnailImage || '/placeholder.svg'}
                      alt={experience.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                      <p className="text-xs font-semibold text-center px-2 text-foreground">
                        {experience.name}
                      </p>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-6xl font-bold mb-6 text-foreground">
          Rediscover Your Memories
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Our intelligent platform finds, organizes, and brings your most cherished moments back to life.
        </p>
      </motion.div>
    </div>
  );
};
