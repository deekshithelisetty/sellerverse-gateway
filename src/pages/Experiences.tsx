import { Eye, LayoutGrid, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExperienceForm } from '@/components/ExperienceForm';
import { ExperiencePreview } from '@/components/ExperiencePreview';
import { ExperienceGallery } from '@/components/ExperienceGallery';
import { ExperienceCircularMenu } from '@/components/ExperienceCircularMenu';
import { useState } from 'react';

export interface ExperienceData {
  name: string;
  description: string;
  aspectRatio: string;
  contentType: string[];
  city: string;
  state: string;
  fullAddress: string;
  mapLink: string;
  dayCount: number;
  schedule: { day: number; heading: string; timing: string; plan: string }[];
  bookingInfo: {
    [category: string]: { header: string; details: string }[];
  };
  tags: string[];
  faqs: { question: string; answer: string }[];
  price: string;
  thumbnailImage?: string;
  uploadedImages?: string[];
}

export default function Experiences({ 
  showForm,
  setShowForm 
}: { 
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [experienceData, setExperienceData] = useState<ExperienceData>({
    name: '',
    description: '',
    aspectRatio: 'square',
    contentType: [],
    city: '',
    state: '',
    fullAddress: '',
    mapLink: '',
    dayCount: 1,
    schedule: [{ day: 1, heading: '', timing: '', plan: '' }],
    bookingInfo: {},
    tags: [''],
    faqs: [{ question: '', answer: '' }],
    price: '',
    thumbnailImage: undefined,
    uploadedImages: [],
  });

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold" style={{ background: 'linear-gradient(to right, #f24270, #ffc7b5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Experiences</h1>
          <p className="text-muted-foreground">Create and manage customer experiences.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            className="gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 rounded-2xl"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4" />
            Live Preview
          </Button>
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 rounded-2xl"
            onClick={() => {
              setShowCardSelector(!showCardSelector);
              if (!showCardSelector) {
                setShowForm(false);
              }
            }}
          >
            <LayoutGrid className="w-4 h-4" />
            View All
          </Button>
          <Button 
            className="gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 rounded-2xl"
            onClick={() => setShowForm(true)}
          >
            <Sparkles className="w-4 h-4" />
            Create
          </Button>
        </div>
      </div>

      {/* Main Content Area - Two Column Layout */}
      <div className="flex-1 flex gap-2 overflow-hidden">
        {/* Center - Form/Gallery/Card Selector Section */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-background/20 backdrop-blur-sm flex flex-col overflow-hidden">
          {showCardSelector ? (
            <div className="flex-1 overflow-hidden">
              <ExperienceCircularMenu onClose={() => setShowCardSelector(false)} />
            </div>
          ) : showForm ? (
            <div className="flex-1 pl-4 pr-6 py-6 overflow-y-auto animate-fade-in scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <ExperienceForm data={experienceData} onChange={setExperienceData} onClose={() => setShowForm(false)} />
            </div>
          ) : (
            <ExperienceGallery />
          )}
        </div>

        {/* Right - Preview Panel */}
        {showPreview && (
          <div className="w-96 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-background/50 backdrop-blur-sm flex flex-col overflow-hidden shadow-lg animate-fade-in">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <ExperiencePreview data={experienceData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
