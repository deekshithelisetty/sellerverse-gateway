import { useState } from 'react';
import { Plus, Grid3x3, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExperienceForm } from '@/components/ExperienceForm';
import { ExperiencePreview } from '@/components/ExperiencePreview';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export default function Experiences() {
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="h-full flex gap-4">
      {/* Main Content Section */}
      <div className={`${showPreview ? 'flex-1' : 'w-full'} p-8 transition-all duration-300`}>
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
      </div>

      {/* Live Preview Panel - Full Height on Right */}
      {showPreview && (
        <div className="w-[400px] pr-8 animate-fade-in">
          <div className="h-full rounded-2xl border bg-background/60 backdrop-blur-xl shadow-lg p-6 overflow-auto">
            <ExperiencePreview />
          </div>
        </div>
      )}
    </div>
  );
}
