import { Plus, Grid3x3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ExperienceForm } from '@/components/ExperienceForm';
import { ExperiencePreview } from '@/components/ExperiencePreview';

export default function Experiences() {
  return (
    <div className="space-y-4">
      {/* Header with icons */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Experiences</h2>
          <p className="text-muted-foreground">Create and manage customer experiences.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Grid3x3 className="w-4 h-4" />
            View All
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Create
          </Button>
        </div>
      </div>

      {/* Resizable Split View */}
      <div className="glass-card rounded-2xl overflow-hidden border-white/20" style={{ height: 'calc(100vh - 350px)' }}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full overflow-auto p-6">
              <ExperienceForm />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full overflow-auto p-6 bg-muted/10">
              <ExperiencePreview />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
