import { Plus, Grid3x3, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExperienceForm } from '@/components/ExperienceForm';
import { ExperiencePreview } from '@/components/ExperiencePreview';
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
  const [experienceData, setExperienceData] = useState<ExperienceData>({
    name: '',
    description: '',
    aspectRatio: 'square',
    contentType: [],
    city: '',
    state: '',
    fullAddress: '',
    mapLink: '',
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
          <h1 className="text-4xl font-bold">Experiences</h1>
          <p className="text-muted-foreground">Create and manage customer experiences.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={showPreview ? "default" : "outline"}
            className="gap-2"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Monitor className="w-4 h-4" />
            Live Preview
          </Button>
          <Button variant="outline" className="gap-2">
            <Grid3x3 className="w-4 h-4" />
            View All
          </Button>
          <Button className="gap-2" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" />
            Create
          </Button>
        </div>
      </div>

      {/* Main Content Area - Two Column Layout */}
      <div className="flex-1 flex gap-4">
        {/* Center - Form Section */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-background/20 backdrop-blur-sm overflow-hidden">
          {showForm ? (
            <div className="h-full pl-4 pr-6 py-6 overflow-y-auto animate-fade-in scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <ExperienceForm data={experienceData} onChange={setExperienceData} onClose={() => setShowForm(false)} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Click "Create" to start building an experience</p>
            </div>
          )}
        </div>

        {/* Right - Preview Panel */}
        {showPreview && (
          <div className="w-[420px] rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-background/50 backdrop-blur-sm overflow-hidden shadow-lg animate-fade-in">
            <div className="h-full overflow-auto">
              <ExperiencePreview data={experienceData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
