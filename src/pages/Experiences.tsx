import { useState } from 'react';
import { Plus, Grid3x3, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExperienceForm } from '@/components/ExperienceForm';
import { ExperiencePreview } from '@/components/ExperiencePreview';

export default function Experiences() {
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="h-full flex gap-4">
      {/* Main Content Section - Middle */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Header Section */}
        <div className="flex items-start justify-between relative">
          {/* Section Label */}
          <div className="absolute -top-6 left-0 z-10">
            <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-lg">
              📋 HEADER SECTION
            </span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">
              Experiences
              <span className="ml-2 text-xs font-normal text-muted-foreground">(Page Title)</span>
            </h1>
            <p className="text-muted-foreground">
              Create and manage customer experiences.
              <span className="ml-2 text-xs">(Description)</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant={showPreview ? "default" : "outline"}
              className="gap-2 bg-background/80 backdrop-blur-sm relative"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Monitor className="w-4 h-4" />
              Live Preview
              <span className="absolute -bottom-6 left-0 text-[10px] text-muted-foreground whitespace-nowrap">
                (Toggle Button)
              </span>
            </Button>
            <Button variant="outline" className="gap-2 bg-background/80 backdrop-blur-sm relative">
              <Grid3x3 className="w-4 h-4" />
              View All
              <span className="absolute -bottom-6 left-0 text-[10px] text-muted-foreground whitespace-nowrap">
                (Action Button)
              </span>
            </Button>
            <Button className="gap-2 relative" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4" />
              Create
              <span className="absolute -bottom-6 left-0 text-[10px] text-muted-foreground whitespace-nowrap">
                (Create Button)
              </span>
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 rounded-3xl border bg-background/40 backdrop-blur-xl shadow-xl overflow-hidden pt-3 relative">
          {/* Section Label */}
          <div className="absolute -top-3 left-6 z-10">
            <span className="px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full shadow-lg">
              📝 MAIN CONTENT AREA (rounded-3xl border)
            </span>
          </div>
          
          {showForm ? (
            <div className="h-full p-8 overflow-auto animate-fade-in">
              <ExperienceForm />
              <div className="mt-2 text-xs text-muted-foreground">(ExperienceForm Component)</div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col gap-2">
              <p className="text-muted-foreground text-lg">Click "Create" to start building an experience</p>
              <span className="text-xs text-muted-foreground">(Empty State Message)</span>
            </div>
          )}
        </div>
      </div>

      {/* Preview Section - Right Side Third Column */}
      <div className="w-[420px] flex-shrink-0 relative">
        {/* Section Label */}
        <div className="absolute -top-6 left-0 z-10">
          <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full shadow-lg">
            📱 PREVIEW SECTION (420px width)
          </span>
        </div>
        
        <div className="h-full rounded-3xl border bg-background/40 backdrop-blur-xl shadow-xl overflow-hidden relative">
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-background/80 text-foreground rounded-full border">
              rounded-3xl + backdrop-blur
            </span>
          </div>
          
          {showPreview ? (
            <div className="h-full p-6 overflow-auto animate-fade-in">
              <ExperiencePreview />
              <div className="mt-2 text-center text-xs text-muted-foreground">
                (ExperiencePreview Component)
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 flex-col gap-2">
              <p className="text-muted-foreground text-center text-sm">Enable Live Preview to see your experience</p>
              <span className="text-xs text-muted-foreground">(Preview Placeholder)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
