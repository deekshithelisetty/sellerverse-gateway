import { useState } from 'react';
import { Plus, Grid3x3, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExperienceForm } from '@/components/ExperienceForm';
import { ExperiencePreview } from '@/components/ExperiencePreview';

export default function Experiences() {
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      {/* Main Content Section */}
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
              className="gap-2 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Monitor className="w-4 h-4" />
              Live Preview
            </Button>
            <Button variant="outline" className="gap-2 bg-background/80 backdrop-blur-sm">
              <Grid3x3 className="w-4 h-4" />
              View All
            </Button>
            <Button className="gap-2" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 rounded-3xl border bg-background/40 backdrop-blur-xl shadow-xl overflow-hidden pt-3">
          {showForm ? (
            <div className="h-full p-8 overflow-auto animate-fade-in">
              <ExperienceForm />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Click "Create" to start building an experience</p>
            </div>
          )}
        </div>
      </div>

      {/* Live Preview Panel - Positioned absolutely to break out and span full height */}
      {showPreview && (
        <div className="fixed right-6 top-24 bottom-8 w-[380px] z-50 animate-fade-in">
          <div className="h-full rounded-2xl border bg-background/80 backdrop-blur-xl shadow-2xl p-6 overflow-auto">
            <ExperiencePreview />
          </div>
        </div>
      )}
    </>
  );
}
