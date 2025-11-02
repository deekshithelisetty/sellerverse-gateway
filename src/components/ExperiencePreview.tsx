import { MapPin, Clock, IndianRupee, CheckCircle, XCircle, Sun, Moon, Sunrise, Heart, Share2, Maximize2, Minimize2 } from 'lucide-react';
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
import { useState } from 'react';

export function ExperiencePreview({ data }: { data: ExperienceData }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'BT';
  };

  const parseTimeToHour = (timeStr: string): number | null => {
    // Extract hour from time strings like "9:00 AM", "10 AM", "9:30 PM"
    const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
    if (!match) return null;
    
    let hour = parseInt(match[1]);
    const period = match[3].toUpperCase();
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    return hour;
  };

  const getTimePeriod = (timeStr: string): string => {
    const startTime = timeStr.split('-')[0].trim();
    const hour = parseTimeToHour(startTime);
    
    if (hour === null) return 'Other';
    
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 22) return 'Evening';
    return 'Night';
  };

  const getTimePeriodIcon = (period: string) => {
    switch (period) {
      case 'Morning': return <Sunrise className="w-4 h-4" />;
      case 'Afternoon': return <Sun className="w-4 h-4" />;
      case 'Evening':
      case 'Night': return <Moon className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const groupScheduleByDayAndTime = () => {
    const grouped: { [key: number]: { [key: string]: typeof data.schedule } } = {};
    
    data.schedule.forEach(entry => {
      if (!grouped[entry.day]) {
        grouped[entry.day] = { Morning: [], Afternoon: [], Evening: [], Night: [], Other: [] };
      }
      
      const period = entry.timing ? getTimePeriod(entry.timing) : 'Other';
      grouped[entry.day][period].push(entry);
    });
    
    return grouped;
  };

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background" : "flex justify-center items-start min-h-screen p-6 pt-8 pb-12"}>
      {/* Phone Mockup or Fullscreen */}
      <div className={isFullscreen ? "w-full h-full overflow-y-auto" : "relative w-[380px] bg-background border-8 border-foreground/10 rounded-[3rem] shadow-2xl"}>
        {/* Phone Notch - only in non-fullscreen */}
        {!isFullscreen && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/10 rounded-b-2xl z-10" />}
        
        {/* Phone Screen Content */}
        <div className={isFullscreen ? "bg-background" : "bg-background overflow-hidden rounded-[2.25rem]"}>
          {/* Top Header Bar */}
          <div className={`sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/50 px-4 py-3 flex items-center justify-between z-20 ${isFullscreen ? 'max-w-4xl mx-auto' : ''}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="w-4 h-4" />
            </Button>
            <h3 className="text-sm font-semibold">Experience Details</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
            {data.thumbnailImage ? (
              <img 
                src={data.thumbnailImage} 
                alt={data.name || 'Experience'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 text-muted-foreground/40">
                  <MapPin className="w-16 h-16 mx-auto" />
                  <p className="text-xs">Experience Image</p>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`px-5 py-6 space-y-6 ${isFullscreen ? 'max-w-4xl mx-auto' : ''}`}>
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

            {/* Images */}
            {data.uploadedImages && data.uploadedImages.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Images</h2>
                <div className="grid grid-cols-2 gap-2">
                  {data.uploadedImages.map((image, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-border">
                      <img 
                        src={image} 
                        alt={`Experience image ${i + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {data.tags.filter(t => t).length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Tags</h2>
                <div className="bg-card border border-border rounded-lg p-4 space-y-1.5">
                  {data.tags.filter(t => t).map((tag, i) => (
                    <div key={i} className="text-sm font-semibold text-primary">
                      #{tag.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {data.schedule.some(s => s.heading || s.timing || s.plan) && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Day Planning</h2>
                <div className="space-y-6">
                  {Object.entries(groupScheduleByDayAndTime()).map(([day, periods]) => (
                    <div key={day} className="space-y-3">
                      {/* Day Header */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-primary">{day}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">Day {day}</p>
                        </div>
                      </div>

                      {/* Day Activities grouped by time period */}
                      <div className="ml-4 pl-4 border-l-2 border-border/50 space-y-4">
                        {(['Morning', 'Afternoon', 'Evening', 'Night', 'Other'] as const).map(period => {
                          const entries = periods[period];
                          if (!entries || entries.length === 0) return null;

                          return (
                            <div key={period} className="space-y-3">
                              {/* Time Period Header */}
                              {period !== 'Other' && (
                                <div className="flex items-center gap-2 mb-2">
                                  {getTimePeriodIcon(period)}
                                  <span className="text-sm font-semibold text-primary">{period}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {period === 'Morning' && '(5 AM - 11:59 AM)'}
                                    {period === 'Afternoon' && '(12 PM - 4:59 PM)'}
                                    {period === 'Evening' && '(5 PM - 9:59 PM)'}
                                    {period === 'Night' && '(10 PM - 4:59 AM)'}
                                  </span>
                                </div>
                              )}

                              {/* Entries for this time period */}
                              {entries.map((entry, idx) => (
                                entry.heading || entry.timing || entry.plan ? (
                                  <div key={idx} className="space-y-2 pb-3 border-b border-border/30 last:border-0">
                                    {/* Heading */}
                                    {entry.heading && (
                                      <h4 className="text-sm font-semibold">{entry.heading}</h4>
                                    )}
                                    
                                    {/* Timing Badge */}
                                    {entry.timing && (
                                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-xs font-medium text-primary">
                                          {entry.timing}
                                        </span>
                                      </div>
                                    )}
                                    
                                    {/* Activity Details */}
                                    {entry.plan && (
                                      <p className="text-sm leading-relaxed text-muted-foreground">{entry.plan}</p>
                                    )}
                                  </div>
                                ) : null
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
