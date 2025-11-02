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
  return (
    <div className="h-full w-full flex items-center justify-center p-8 overflow-hidden">
      <div className="relative w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Your Experiences</h2>
          <p className="text-muted-foreground">Click on any experience to edit or view details</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-6 relative">
          {mockExperiences.map((experience, index) => {
            // Create curved/diagonal layout effect
            const row = Math.floor(index / 5);
            const col = index % 5;
            const offsetY = row % 2 === 0 ? 0 : 20;
            const rotation = (col - 2) * 2; // Slight rotation for curve effect
            
            return (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  zIndex: 10,
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer"
                style={{
                  transform: `translateY(${offsetY}px)`,
                }}
              >
                <Card className="overflow-hidden border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                  <motion.div
                    className="aspect-square relative overflow-hidden"
                    style={{ rotate: rotation }}
                    whileHover={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={experience.thumbnailImage || '/placeholder.svg'}
                      alt={experience.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2 text-center">
                      {experience.name}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
