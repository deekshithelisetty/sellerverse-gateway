import { MapPin, Clock, IndianRupee, CheckCircle, XCircle, Sun, Moon, Sunrise, Heart, Share2 } from 'lucide-react';
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

  const parseTimeToHour = (timeStr: string): number | null => {
    // Extract hour from time strings like "09:00", "14:30"
    const match = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (!match) return null;
    
    const hour = parseInt(match[1]);
    return hour;
  };

  const formatTextWithBullets = (text: string) => {
    const formatRichText = (content: string) => {
      const parts: React.ReactNode[] = [];
      let remaining = content;
      let key = 0;

      while (remaining.length > 0) {
        // Check for **bold**
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        if (boldMatch && boldMatch.index !== undefined) {
          if (boldMatch.index > 0) {
            parts.push(remaining.substring(0, boldMatch.index));
          }
          parts.push(<strong key={key++} className="font-bold">{boldMatch[1]}</strong>);
          remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
          continue;
        }

        // Check for *italic*
        const italicMatch = remaining.match(/\*(.+?)\*/);
        if (italicMatch && italicMatch.index !== undefined) {
          if (italicMatch.index > 0) {
            parts.push(remaining.substring(0, italicMatch.index));
          }
          parts.push(<em key={key++} className="italic">{italicMatch[1]}</em>);
          remaining = remaining.substring(italicMatch.index + italicMatch[0].length);
          continue;
        }

        // No more formatting found
        parts.push(remaining);
        break;
      }

      return parts;
    };

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      // Check if line starts with bullet point markers
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const content = trimmed.substring(1).trim();
        return (
          <div key={idx} className="flex items-start gap-2 ml-2">
            <span className="text-primary mt-0.5">•</span>
            <span>{formatRichText(content)}</span>
          </div>
        );
      }
      // Regular line
      return trimmed ? <p key={idx}>{formatRichText(trimmed)}</p> : <br key={idx} />;
    });
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
    
    // Initialize all days up to dayCount
    for (let i = 1; i <= data.dayCount; i++) {
      grouped[i] = { Morning: [], Afternoon: [], Evening: [], Night: [], Other: [] };
    }
    
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
    <div className="flex justify-center items-start w-full h-full">
      {/* Always Maximized View */}
      <div className="w-full h-full overflow-y-auto">
        {/* Content */}
        <div className="bg-background">
          {/* Top Header Bar */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/50 px-4 py-3 flex items-center justify-between z-20 max-w-4xl mx-auto">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="w-4 h-4" />
            </Button>
            <h3 className="text-sm font-semibold">Experience Details</h3>
            <div className="w-8"></div>
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
          <div className="px-5 py-6 space-y-6 max-w-4xl mx-auto">
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
                            {data.dayCount} {data.dayCount === 1 ? 'Day' : 'Days'}
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
                <Accordion type="multiple" className="w-full space-y-2">
                  {Object.entries(groupScheduleByDayAndTime()).map(([day, periods]) => (
                    <AccordionItem key={day} value={`day-${day}`} className="border rounded-lg px-1">
                      <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-primary">{day}</span>
                          </div>
                          Day {day}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-3">
                        {/* Day Activities grouped by time period */}
                        <div className="ml-4 pl-4 border-l-2 border-border/50 space-y-4">
                          {(['Morning', 'Afternoon', 'Evening', 'Night', 'Other'] as const).map(period => {
                            const entries = periods[period];
                            // Only show periods that have actual data
                            if (!entries || entries.length === 0) return null;

                            return (
                              <div key={period} className="space-y-3">
                                {/* Time Period Header */}
                                {period !== 'Other' && (
                                  <div className="flex items-center gap-2 mb-2">
                                    {getTimePeriodIcon(period)}
                                    <span className="text-sm font-semibold text-primary">{period}</span>
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
                                        <div className="text-sm leading-relaxed text-muted-foreground space-y-1">
                                          {formatTextWithBullets(entry.plan)}
                                        </div>
                                      )}
                                    </div>
                                  ) : null
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* What to Know Before You Book */}
            {Object.keys(data.bookingInfo).length > 0 && Object.values(data.bookingInfo).some(sections => sections.length > 0) && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">What to Know Before You Book</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {Object.entries(data.bookingInfo).map(([category, sections]) => (
                    sections.length > 0 && (
                      <AccordionItem key={category} value={category} className="border rounded-lg px-1">
                        <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline px-3">
                          {category}
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-3">
                          <Accordion type="single" collapsible className="w-full space-y-2">
                            {sections.map((section, idx) => (
                              section.header || section.details ? (
                                <AccordionItem 
                                  key={idx} 
                                  value={`${category}-${idx}`} 
                                  className="border rounded-md bg-card/50"
                                >
                                  <AccordionTrigger className="text-xs font-semibold hover:no-underline px-3 py-2">
                                    {section.header || `Section ${idx + 1}`}
                                  </AccordionTrigger>
                                  <AccordionContent className="px-3 pb-2">
                                    {section.details && (
                                      <div className="text-sm leading-relaxed text-muted-foreground space-y-1">
                                        {formatTextWithBullets(section.details)}
                                      </div>
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              ) : null
                            ))}
                          </Accordion>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  ))}
                </Accordion>
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
