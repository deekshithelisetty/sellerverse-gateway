import { Plus, Grid3x3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ExperienceForm } from '@/components/ExperienceForm';
import { ExperiencePreview } from '@/components/ExperiencePreview';

export default function Experiences() {
  return (
    <div className="fixed inset-0 top-24" style={{ left: '280px' }}>
      <ResizablePanelGroup direction="horizontal">
        {/* Left Panel - Form with Header */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full overflow-auto p-6">
            {/* Header with icons */}
            <div className="flex items-center justify-between mb-6">
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
            <ExperienceForm />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Panel - Full Height Preview */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full bg-muted/10">
            <ExperiencePreview />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
