import { MapPin, Clock, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ExperiencePreview() {
  return (
    <div className="flex items-center justify-center h-full">
      {/* Phone Mockup */}
      <div className="relative w-[380px] h-[750px] bg-background border-8 border-foreground/10 rounded-[3rem] shadow-2xl overflow-hidden">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/10 rounded-b-2xl z-10" />
        
        {/* Phone Screen Content */}
        <div className="h-full overflow-y-auto">
          {/* Header Image */}
          <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 rounded-full bg-blue-500 border-4 border-background flex items-center justify-center">
                <span className="text-5xl font-bold text-white">N</span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-6 pb-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-1">Experience Title</h2>
              <p className="text-muted-foreground">@username</p>
            </div>

            {/* Experience Details Card */}
            <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
              <Badge className="mb-2">Category</Badge>
              
              <p className="text-sm text-muted-foreground">
                Your experience description will appear here with all the details you enter in the form.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Location</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Duration</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold col-span-2">
                  <IndianRupee className="w-4 h-4" />
                  <span>Price</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
