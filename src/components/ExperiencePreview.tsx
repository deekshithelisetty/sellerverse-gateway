import { MapPin, Clock, IndianRupee, CheckCircle, XCircle, Sun, Moon, Sunrise, Heart, Share2, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExperienceData } from '@/pages/Experiences';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ExperiencePreview({ data }: { data: ExperienceData }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'BT';
  };

  const getTimeIcon = (timing: string) => {
    const time = timing.toLowerCase();
    if (time.includes('morning')) return <Sunrise className="w-4 h-4" />;
    if (time.includes('afternoon')) return <Sun className="w-4 h-4" />;
    if (time.includes('evening') || time.includes('night')) return <Moon className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div className="flex justify-center h-full p-6 pt-8">
      {/* Phone Mockup */}
      <div className="relative w-[380px] h-[750px] bg-background border-8 border-foreground/10 rounded-[3rem] shadow-2xl overflow-hidden">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/10 rounded-b-2xl z-10" />
        
        {/* Phone Screen Content */}
        <div className="h-full overflow-y-auto bg-background">
          {/* Top Header Bar */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/50 px-4 py-3 flex items-center justify-between z-20">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="w-4 h-4" />
            </Button>
            <h3 className="text-sm font-semibold">Experience Details</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2 text-muted-foreground/40">
                <MapPin className="w-16 h-16 mx-auto" />
                <p className="text-xs">Experience Image</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 py-6 space-y-6">
            {/* Creator Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(data.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">Created by</p>
                  <p className="text-sm font-semibold">Bhuvith Trammela</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between py-3 border-y border-border/50">
              <div className="text-center flex-1">
                <p className="text-xs text-muted-foreground">Total Earnings</p>
                <p className="text-sm font-bold">--</p>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-center flex-1">
                <p className="text-xs text-muted-foreground">Total Sales</p>
                <p className="text-sm font-bold">0</p>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-center flex-1">
                <p className="text-xs text-muted-foreground">Total Views</p>
                <p className="text-sm font-bold">--</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold leading-tight mb-2">
                {data.name || 'Experience Title'}
              </h1>
              {data.price && (
                <div className="flex items-center gap-1 text-primary">
                  <IndianRupee className="w-4 h-4" />
                  <span className="text-xl font-bold">{data.price}</span>
                  <span className="text-xs text-muted-foreground ml-1">per person</span>
                </div>
              )}
            </div>

            {/* Overview */}
            {data.description && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Overview</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.description}
                </p>
              </div>
            )}

            {/* Location Info */}
            {(data.city || data.state || data.fullAddress) && (
              <Card className="border-primary/10">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Location</p>
                      <p className="text-xs text-muted-foreground">
                        {[data.city, data.state].filter(Boolean).join(', ')}
                      </p>
                      {data.fullAddress && (
                        <p className="text-xs text-muted-foreground mt-1">{data.fullAddress}</p>
                      )}
                    </div>
                  </div>
                  {data.schedule.some(s => s.timing || s.plan) && (
                    <>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium">Duration</p>
                          <p className="text-xs text-muted-foreground">
                            {data.schedule.length} {data.schedule.length === 1 ? 'Day' : 'Days'}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {data.tags.filter(t => t).length > 0 && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {data.tags.filter(t => t).map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs px-3 py-1">
                      #{tag.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {data.schedule.some(s => s.timing || s.plan) && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Itinerary</h2>
                <div className="space-y-4">
                  {data.schedule.map((day, i) => (
                    day.timing || day.plan ? (
                      <div key={i} className="space-y-3">
                        {/* Day Header */}
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-primary">{day.day}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">Day {day.day}</p>
                          </div>
                        </div>

                        {/* Day Activities */}
                        <div className="ml-4 pl-4 border-l-2 border-border/50 space-y-3">
                          <div className="space-y-2">
                            {/* Timing Badge */}
                            {day.timing && (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                                {getTimeIcon(day.timing)}
                                <span className="text-xs font-medium text-primary uppercase">
                                  {day.timing}
                                </span>
                              </div>
                            )}
                            
                            {/* Activity Details */}
                            {day.plan && (
                              <div className="space-y-2">
                                <p className="text-sm leading-relaxed">{day.plan}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            {(data.inclusions.some(i => i) || data.exclusions.some(e => e)) && (
              <div className="space-y-4">
                {data.inclusions.some(i => i) && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      What's Included
                    </h3>
                    <ul className="space-y-1.5 ml-6">
                      {data.inclusions.filter(i => i).map((item, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {data.exclusions.some(e => e) && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-destructive" />
                      What's Not Included
                    </h3>
                    <ul className="space-y-1.5 ml-6">
                      {data.exclusions.filter(e => e).map((item, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-destructive mt-0.5">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* FAQs */}
            {data.faqs.some(faq => faq.question || faq.answer) && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">FAQs</h2>
                <Accordion type="single" collapsible className="w-full">
                  {data.faqs.map((faq, i) => (
                    faq.question || faq.answer ? (
                      <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
                        <AccordionTrigger className="text-sm text-left hover:no-underline">
                          {faq.question || 'Question'}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                          {faq.answer || 'Answer'}
                        </AccordionContent>
                      </AccordionItem>
                    ) : null
                  ))}
                </Accordion>
              </div>
            )}

            {/* Bottom Padding */}
            <div className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
