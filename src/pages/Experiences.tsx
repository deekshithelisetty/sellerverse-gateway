import { useState } from 'react';
import { Plus, Grid3x3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ExperienceForm } from '@/components/ExperienceForm';

export default function Experiences() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="fixed inset-0 top-24" style={{ left: '280px' }}>
      <ResizablePanelGroup direction="horizontal">
        {/* Left Panel - Header */}
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
                <Button size="sm" className="gap-2" onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Panel - Live Section */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full p-6">
            {showForm ? (
              <div className="h-full rounded-2xl border bg-background/60 backdrop-blur-xl shadow-lg p-6 overflow-auto animate-fade-in">
                <ExperienceForm />
              </div>
            ) : (
              <div className="h-full rounded-2xl border bg-background/60 backdrop-blur-xl shadow-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Click "Create" to start building an experience</p>
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
