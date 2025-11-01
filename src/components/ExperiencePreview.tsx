import { MapPin, Clock, IndianRupee, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExperienceData } from '@/pages/Experiences';
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
      .slice(0, 2) || 'EX';
  };

  return (
    <div className="flex justify-center h-full p-6 pt-8">
      {/* Phone Mockup */}
      <div className="relative w-[380px] h-[750px] bg-background border-8 border-foreground/10 rounded-[3rem] shadow-2xl overflow-hidden">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/10 rounded-b-2xl z-10" />
        
        {/* Phone Screen Content */}
        <div className="h-full overflow-y-auto">
          {/* Header Image */}
          <div className="h-48 bg-gradient-to-br from-primary to-primary/80 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-primary-foreground">
                  {getInitials(data.name)}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-6 pb-6 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1">
                {data.name || 'Experience Title'}
              </h2>
              <p className="text-muted-foreground text-sm">
                {data.city && data.state ? `${data.city}, ${data.state}` : 'Location'}
              </p>
            </div>

            {/* Main Details Card */}
            <Card className="border-primary/20">
              <CardContent className="p-6 space-y-4">
                {data.tags.filter(t => t).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data.tags.filter(t => t).map((tag, i) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
                
                {data.description && (
                  <p className="text-sm leading-relaxed">
                    {data.description}
                  </p>
                )}

                <Separator />

                <div className="space-y-3">
                  {(data.city || data.state) && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-xs text-muted-foreground">
                          {[data.city, data.state].filter(Boolean).join(', ')}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {data.schedule.some(s => s.timing || s.plan) && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-xs text-muted-foreground">
                          {data.schedule.length} {data.schedule.length === 1 ? 'Day' : 'Days'}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {data.price && (
                    <div className="flex items-start gap-3">
                      <IndianRupee className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Price</p>
                        <p className="text-lg font-bold text-primary">₹{data.price}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            {data.schedule.some(s => s.timing || s.plan) && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Itinerary
                </h3>
                <div className="space-y-2">
                  {data.schedule.map((day, i) => (
                    day.timing || day.plan ? (
                      <Card key={i} className="border-primary/10">
                        <CardContent className="p-4">
                          <p className="font-semibold text-sm mb-1">Day {day.day}</p>
                          {day.timing && (
                            <p className="text-xs text-muted-foreground mb-2">{day.timing}</p>
                          )}
                          {day.plan && (
                            <p className="text-xs leading-relaxed">{day.plan}</p>
                          )}
                        </CardContent>
                      </Card>
                    ) : null
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            {(data.inclusions.some(i => i) || data.exclusions.some(e => e)) && (
              <div className="space-y-3">
                {data.inclusions.some(i => i) && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      What's Included
                    </h3>
                    <ul className="space-y-1">
                      {data.inclusions.filter(i => i).map((item, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {data.exclusions.some(e => e) && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-destructive" />
                      What's Not Included
                    </h3>
                    <ul className="space-y-1">
                      {data.exclusions.filter(e => e).map((item, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
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
                <h3 className="text-lg font-semibold">FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                  {data.faqs.map((faq, i) => (
                    faq.question || faq.answer ? (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-sm text-left">
                          {faq.question || 'Question'}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground">
                          {faq.answer || 'Answer'}
                        </AccordionContent>
                      </AccordionItem>
                    ) : null
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
