import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExperiencePreview } from '@/components/ExperiencePreview';
import { ExperienceData } from './Experiences';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
export default function SharedExperience() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid share link');
      setLoading(false);
      return;
    }

    // Retrieve experience data from localStorage
    const storedData = localStorage.getItem(`shared-experience-${id}`);
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setExperienceData(data);
      } catch (err) {
        setError('Failed to load experience data');
      }
    } else {
      setError('Experience not found or link has expired');
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white font-medium">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (error || !experienceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Experience Not Found</h1>
          <p className="text-white/80">{error || 'The experience you are looking for does not exist.'}</p>
          <Button 
            onClick={() => navigate('/')} 
            className="mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {experienceData.name || 'Experience'}
          </h1>
        </div>
      </div>

      {/* Full Preview - Same width as preview section (w-96 = 384px) */}
      <div className="py-8 px-4 flex justify-center">
        <div className="w-96 rounded-2xl bg-gradient-to-b from-primary/5 to-background/50 backdrop-blur-sm flex flex-col overflow-hidden shadow-lg">
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <ExperiencePreview data={experienceData} />
          </div>
        </div>
      </div>
    </div>
  );
}

