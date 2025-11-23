import { MapPin, Clock, IndianRupee, CheckCircle, XCircle, Sun, Moon, Sunrise, Share2, ChevronDown, X } from 'lucide-react';
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
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';
export function ExperiencePreview({ data, onClose }: { data: ExperienceData; onClose?: () => void }) {
  const [isImagesExpanded, setIsImagesExpanded] = useState(false);
  
  const handleShare = () => {
    // Generate a unique ID for this share
    const shareId = `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store the experience data in localStorage
    localStorage.setItem(`shared-experience-${shareId}`, JSON.stringify(data));
    
    // Generate the shareable URL
    const shareUrl = `${window.location.origin}/share/${shareId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Share link copied to clipboard!', {
        description: 'You can now share this link with others.',
        duration: 3000,
      });
    }).catch(() => {
      // Fallback: show the URL in a toast if clipboard fails
      toast.info('Share Link', {
        description: shareUrl,
        duration: 5000,
      });
    });
  };
  
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
    
    // 0 to 12 (0:00 to 12:00) = Morning
    if (hour >= 0 && hour < 12) return 'Morning';
    // 12 to 18 (12:00 to 18:00/6 PM) = Evening
    if (hour >= 12 && hour < 18) return 'Evening';
    // 18 to 24 (18:00/6 PM to 24:00/midnight) = Night
    return 'Night';
  };

  const getTimePeriodIcon = (period: string) => {
    switch (period) {
      case 'Morning': return <Sunrise className="w-4 h-4 text-yellow-400" />;
      case 'Evening': return <Sun className="w-4 h-4 text-orange-400" />;
      case 'Night': return <Moon className="w-4 h-4 text-blue-300" />;
      default: return <Clock className="w-4 h-4 text-white" />;
    }
  };

  const groupScheduleByDay = () => {
    const grouped: { [key: number]: typeof data.schedule } = {};
    
    // Initialize all days up to dayCount
    for (let i = 1; i <= data.dayCount; i++) {
      grouped[i] = [];
    }
    
    data.schedule.forEach(entry => {
      if (!grouped[entry.day]) {
        grouped[entry.day] = [];
      }
      grouped[entry.day].push(entry);
    });
    
    return grouped;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex justify-center items-start w-full h-full"
    >
      {/* Always Maximized View */}
      <div className="w-full h-full overflow-y-auto rounded-lg [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Content */}
        <div className="experience-gradient-bg text-white">
          {/* Top Header Bar */}
          <div className="sticky top-0 bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center justify-between z-20 max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={handleShare}
              title="Share this experience"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <h3 className="text-sm font-semibold text-white">Experience Details</h3>
            {onClose && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={onClose}
                title="Close preview"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            {!onClose && <div className="w-8"></div>}
          </div>

          {/* Hero Image */}
          <div className="relative h-64 bg-white/10 overflow-hidden">
            {data.thumbnailImage ? (
              <img 
                src={data.thumbnailImage} 
                alt={data.name || 'Experience'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 text-white/40">
                  <MapPin className="w-16 h-16 mx-auto" />
                  <p className="text-xs">Experience Image</p>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-5 py-6 space-y-6 max-w-4xl mx-auto">
            {/* Creator Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white/30">
                <AvatarFallback className="bg-white/20 text-white text-xs">
                  {getInitials(data.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-white/70">Created by</p>
                <p className="text-sm font-semibold text-white">Bhuvan Tummala</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold leading-tight mb-2 text-white">
                {data.name || 'Experience Name'}
              </h1>
              {data.price && (
                <div className="flex items-center gap-1 text-white">
                  <IndianRupee className="w-4 h-4" />
                  <span className="text-xl font-bold">{data.price}</span>
                  <span className="text-xs text-white/70 ml-1">per person</span>
                </div>
              )}
            </div>

            {/* Overview */}
            {data.description && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white">Overview</h2>
                <p className="text-sm text-white/80 leading-relaxed">
                  {data.description}
                </p>
              </div>
            )}

            {/* Location Info */}
            {(data.city || data.state || data.fullAddress) && (
              <Card className="border-white/20 bg-white/10">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-white">Location</p>
                      <p className="text-xs text-white/70">
                        {[data.city, data.state].filter(Boolean).join(', ')}
                      </p>
                      {data.fullAddress && (
                        <p className="text-xs text-white/70 mt-1">{data.fullAddress}</p>
                      )}
                    </div>
                  </div>
                  {data.schedule.some(s => s.timing || s.plan) && (
                    <>
                      <Separator className="bg-white/20" />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-white">Duration</p>
                          <p className="text-xs text-white/70">
                            {data.dayCount} {data.dayCount === 1 ? 'Day' : 'Days'}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Images - Collapsible */}
            {data.uploadedImages && data.uploadedImages.length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => setIsImagesExpanded(!isImagesExpanded)}
                  className="flex items-center justify-between w-full text-left group"
                >
                  <h2 className="text-lg font-semibold text-white">Images ({data.uploadedImages.length})</h2>
                  <ChevronDown 
                    className={`w-5 h-5 text-white transition-transform duration-200 ${
                      isImagesExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: isImagesExpanded ? 'auto' : 0,
                    opacity: isImagesExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {data.uploadedImages.map((image, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="relative aspect-square rounded-lg overflow-hidden border border-white/20"
                      >
                        <img 
                          src={image} 
                          alt={`Experience image ${i + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Tags */}
            {data.tags.filter(t => t).length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Tags</h2>
                <div className="bg-white/10 border border-white/20 rounded-lg p-4 space-y-1.5">
                  {data.tags.filter(t => t).map((tag, i) => (
                    <div key={i} className="text-sm font-semibold text-white">
                      #{tag.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {data.schedule.some(s => s.heading || s.timing || s.plan) && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Day Planning</h2>
                <Accordion type="multiple" className="w-full space-y-2">
                  {Object.entries(groupScheduleByDay()).map(([day, entries]) => (
                    <AccordionItem key={day} value={`day-${day}`} className="border border-white/20 rounded-lg px-1 bg-white/5">
                      <AccordionTrigger className="text-sm font-semibold text-white hover:no-underline px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white">{day}</span>
                          </div>
                          Day {day}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-3">
                        {/* Day Activities - each entry shows its own time period */}
                        <div className="ml-4 pl-4 border-l-2 border-white/20 space-y-4">
                          {entries.map((entry, idx) => {
                            if (!entry.heading && !entry.timing && !entry.plan) return null;
                            
                            const period = entry.timing ? getTimePeriod(entry.timing) : 'Other';
                            
                            return (
                              <div key={idx} className="space-y-2 pb-3 border-b border-white/10 last:border-0">
                                {/* Heading */}
                                {entry.heading && (
                                  <h4 className="text-sm font-semibold text-white">{entry.heading}</h4>
                                )}
                                
                                {/* Timing Badge with Period Icon and Label */}
                                {entry.timing && (
                                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                                    {getTimePeriodIcon(period)}
                                    <span className="text-xs font-medium text-white">
                                      {entry.timing}
                                    </span>
                                    {period !== 'Other' && (
                                      <span className="text-xs font-semibold text-white/90 ml-1">
                                        {period}
                                      </span>
                                    )}
                                  </div>
                                )}
                                
                                {/* Activity Details */}
                                {entry.plan && (
                                  <div className="text-sm leading-relaxed text-white/80 space-y-1">
                                    {formatTextWithBullets(entry.plan)}
                                  </div>
                                )}
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
                <h2 className="text-lg font-semibold text-white">What to Know Before You Book</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {Object.entries(data.bookingInfo).map(([category, sections]) => (
                    sections.length > 0 && (
                      <AccordionItem key={category} value={category} className="border border-white/20 rounded-lg px-1 bg-white/5">
                        <AccordionTrigger className="text-sm font-semibold text-white hover:no-underline px-3">
                          {category}
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-3">
                          <Accordion type="single" collapsible className="w-full space-y-2">
                            {sections.map((section, idx) => (
                              section.header || section.details ? (
                                <AccordionItem 
                                  key={idx} 
                                  value={`${category}-${idx}`} 
                                  className="border border-white/10 rounded-md bg-white/5"
                                >
                                  <AccordionTrigger className="text-xs font-semibold text-white hover:no-underline px-3 py-2">
                                    {section.header || `Section ${idx + 1}`}
                                  </AccordionTrigger>
                                  <AccordionContent className="px-3 pb-2">
                                    {section.details && (
                                      <div className="text-sm leading-relaxed text-white/80 space-y-1">
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
                <h2 className="text-lg font-semibold text-white">FAQs</h2>
                <Accordion type="single" collapsible className="w-full">
                  {data.faqs.map((faq, i) => (
                    faq.question || faq.answer ? (
                      <AccordionItem key={i} value={`faq-${i}`} className="border-white/20">
                        <AccordionTrigger className="text-sm text-white text-left hover:no-underline">
                          {faq.question || 'Question'}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-white/80 leading-relaxed">
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
    </motion.div>
  );
}
