import { Plus, Grid3x3, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExperienceForm } from '@/components/ExperienceForm';

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
      <div className="flex-1 rounded-2xl border border-white/10 bg-background/20 backdrop-blur-sm overflow-hidden">
        {showForm ? (
          <div className="h-full p-6 overflow-auto animate-fade-in">
            <ExperienceForm />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground text-lg">Click "Create" to start building an experience</p>
          </div>
        )}
      </div>
    </div>
  );
}
