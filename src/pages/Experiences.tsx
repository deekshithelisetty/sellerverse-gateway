import { Plus, Grid3x3, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExperienceForm } from '@/components/ExperienceForm';
import { ExperiencePreview } from '@/components/ExperiencePreview';
import { useState } from 'react';

export interface ExperienceData {
  name: string;
  description: string;
  aspectRatio: string;
  contentType: string;
  city: string;
  state: string;
  fullAddress: string;
  mapLink: string;
  schedule: { day: number; timing: string; plan: string }[];
  inclusions: string[];
  exclusions: string[];
  tags: string[];
  faqs: { question: string; answer: string }[];
  price: string;
}

export default function Experiences({ 
  showPreview, 
  setShowPreview,
  showForm,
  setShowForm 
}: { 
  showPreview: boolean; 
  setShowPreview: (show: boolean) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}) {
  const [experienceData, setExperienceData] = useState<ExperienceData>({
    name: '',
    description: '',
    aspectRatio: 'square',
    contentType: 'image',
    city: '',
    state: '',
    fullAddress: '',
    mapLink: '',
    schedule: [{ day: 1, timing: '', plan: '' }],
    inclusions: [''],
    exclusions: [''],
    tags: [''],
    faqs: [{ question: '', answer: '' }],
    price: '',
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

      {/* Main Content Area */}
      <div className="flex-1 rounded-2xl border border-white/10 bg-background/20 backdrop-blur-sm overflow-hidden flex gap-4">
        {/* Form Section */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} h-full transition-all`}>
          {showForm ? (
            <div className="h-full p-6 overflow-auto animate-fade-in">
              <ExperienceForm data={experienceData} onChange={setExperienceData} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Click "Create" to start building an experience</p>
            </div>
          )}
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="w-1/2 h-full border-l border-white/10 overflow-auto animate-fade-in">
            <ExperiencePreview data={experienceData} />
          </div>
        )}
      </div>
    </div>
  );
}
