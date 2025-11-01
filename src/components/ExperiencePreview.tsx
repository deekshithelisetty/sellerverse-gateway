import { MapPin, Clock, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ExperiencePreview() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
        <p className="text-sm text-muted-foreground">See how your experience will look.</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border-white/20">
        {/* Preview Image */}
        <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <p className="text-white/60 text-sm">Experience Image</p>
        </div>

        {/* Preview Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-2">Experience Title</h4>
              <Badge className="mb-3">Category</Badge>
            </div>
          </div>

          <p className="text-muted-foreground">
            Your experience description will appear here. It will show all the details you enter in the form.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>Location</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>Duration</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <IndianRupee className="w-4 h-4" />
              <span>Price</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
