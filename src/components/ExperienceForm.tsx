import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2, Upload, FolderUp, X, ChevronDown, Minus } from 'lucide-react';
import { ExperienceData } from '@/pages/Experiences';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';

export function ExperienceForm({ data, onChange, onClose }: { data: ExperienceData; onChange: (data: ExperienceData) => void; onClose: () => void }) {
  const [thumbnailImage, setThumbnailImage] = useState<{ file: File; preview: string } | null>(null);
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const updateField = (field: keyof ExperienceData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addScheduleEntry = (day: number) => {
    const newIndex = data.schedule.length;
    updateField('schedule', [...data.schedule, { day, heading: '', timing: '', plan: '' }]);
    // Close all other itineraries and open the new one
    setOpenItineraries({ [`${day}-${newIndex}`]: true });
  };

  const removeScheduleEntry = (index: number) => {
    updateField('schedule', data.schedule.filter((_, i) => i !== index));
  };

  const updateScheduleEntry = (index: number, field: 'heading' | 'timing' | 'plan', value: string) => {
    const newSchedule = [...data.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    updateField('schedule', newSchedule);
  };

  const addDay = () => {
    const newDayCount = dayCount + 1;
    setDayCount(newDayCount);
    setOpenDays({ ...openDays, [newDayCount]: true });
    updateField('dayCount', newDayCount);
  };

  const removeDay = () => {
    if (dayCount > 1) {
      const newDayCount = dayCount - 1;
      setDayCount(newDayCount);
      const newOpenDays = { ...openDays };
      delete newOpenDays[dayCount];
      setOpenDays(newOpenDays);
      // Remove schedule entries for removed day
      const updatedSchedule = data.schedule.filter(entry => entry.day < dayCount);
      updateField('schedule', updatedSchedule);
      updateField('dayCount', newDayCount);
    }
  };

  const deleteDay = (day: number) => {
    if (dayCount <= 1) return;
    
    // Remove all entries for this day
    const updatedSchedule = data.schedule.filter(entry => entry.day !== day);
    // Renumber higher days
    const renumberedSchedule = updatedSchedule.map(entry => {
      if (entry.day > day) {
        return { ...entry, day: entry.day - 1 };
      }
      return entry;
    });
    
    const newDayCount = dayCount - 1;
    updateField('schedule', renumberedSchedule);
    setDayCount(newDayCount);
    updateField('dayCount', newDayCount);
    
    // Update open states
    const newOpenDays: { [key: number]: boolean } = {};
    Object.keys(openDays).forEach(k => {
      const dayNum = parseInt(k);
      if (dayNum < day) {
        newOpenDays[dayNum] = openDays[dayNum];
      } else if (dayNum > day) {
        newOpenDays[dayNum - 1] = openDays[dayNum];
      }
    });
    setOpenDays(newOpenDays);
  };

  const toggleDay = (day: number) => {
    setOpenDays({ ...openDays, [day]: !openDays[day] });
  };

  const checkTimeOverlap = (day: number, startTime: string, endTime: string, excludeIndex: number): boolean => {
    const sameDayEntries = data.schedule.filter((entry, idx) => entry.day === day && idx !== excludeIndex);
    
    const parseTime = (timeStr: string): number => {
      if (!timeStr) return -1;
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const newStart = parseTime(startTime);
    const newEnd = parseTime(endTime);
    
    if (newStart === -1 || newEnd === -1) return false;
    if (newEnd <= newStart) return true; // Invalid range

    for (const entry of sameDayEntries) {
      const timing = entry.timing;
      if (!timing || !timing.includes('-')) continue;
      
      const [existingStart, existingEnd] = timing.split('-').map(t => t.trim());
      const existingStartMins = parseTime(existingStart);
      const existingEndMins = parseTime(existingEnd);
      
      if (existingStartMins === -1 || existingEndMins === -1) continue;

      // Check for overlap
      if (
        (newStart >= existingStartMins && newStart < existingEndMins) ||
        (newEnd > existingStartMins && newEnd <= existingEndMins) ||
        (newStart <= existingStartMins && newEnd >= existingEndMins)
      ) {
        return true;
      }
    }
    
    return false;
  };

  const updateScheduleTime = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const entry = data.schedule[index];
    const [currentStart, currentEnd] = entry.timing.split('-').map(t => t.trim());
    
    const startTime = field === 'startTime' ? value : currentStart;
    const endTime = field === 'endTime' ? value : currentEnd;
    
    const newTiming = `${startTime}-${endTime}`;
    updateScheduleEntry(index, 'timing', newTiming);
  };

  const addDayEntry = () => {
    const maxDay = Math.max(...data.schedule.map(s => s.day));
    updateField('schedule', [...data.schedule, { day: maxDay + 1, heading: '', timing: '', plan: '' }]);
  };

  const bookingCategories = [
    'Key Insights',
    'Tips',
    'Flexible Exploration — Extra Ideas',
    'Trip Logistics',
    'Transportation & Accessibility',
    'Packing Essentials',
    'Safety Tips & Seasonal Suitability',
    'Food Options',
    'Photographic Opportunities'
  ];

  const [selectedBookingCategories, setSelectedBookingCategories] = useState<string[]>([]);
  const [openCollapsibles, setOpenCollapsibles] = useState<{ [key: string]: boolean }>({});
  const [dayCount, setDayCount] = useState(data.dayCount || 1);
  const [openDays, setOpenDays] = useState<{ [key: number]: boolean }>({ 1: true });
  const [openTagsSection, setOpenTagsSection] = useState(true);
  const [openFaqsSection, setOpenFaqsSection] = useState(true);
  const [openItineraries, setOpenItineraries] = useState<{ [key: string]: boolean }>({ "1-0": true });

  const toggleCategory = (category: string) => {
    if (!selectedBookingCategories.includes(category)) {
      setSelectedBookingCategories([...selectedBookingCategories, category]);
      setOpenCollapsibles({ ...openCollapsibles, [category]: true });
    }
  };

  const toggleCollapsible = (category: string) => {
    setOpenCollapsibles({ ...openCollapsibles, [category]: !openCollapsibles[category] });
  };

  const removeCategory = (category: string) => {
    // Remove from selected categories
    setSelectedBookingCategories(selectedBookingCategories.filter(cat => cat !== category));
    // Remove the data for this category
    const newBookingInfo = { ...data.bookingInfo };
    delete newBookingInfo[category];
    updateField('bookingInfo', newBookingInfo);
    // Remove from open collapsibles
    const newOpenCollapsibles = { ...openCollapsibles };
    delete newOpenCollapsibles[category];
    setOpenCollapsibles(newOpenCollapsibles);
  };

  const addBookingSection = (category: string) => {
    const currentSections = data.bookingInfo[category] || [];
    updateField('bookingInfo', {
      ...data.bookingInfo,
      [category]: [...currentSections, { header: '', details: '' }]
    });
  };

  const removeBookingSection = (category: string, index: number) => {
    const currentSections = data.bookingInfo[category] || [];
    updateField('bookingInfo', {
      ...data.bookingInfo,
      [category]: currentSections.filter((_, i) => i !== index)
    });
  };

  const updateBookingSection = (category: string, index: number, field: 'header' | 'details', value: string) => {
    const currentSections = data.bookingInfo[category] || [];
    const newSections = [...currentSections];
    newSections[index] = { ...newSections[index], [field]: value };
    updateField('bookingInfo', {
      ...data.bookingInfo,
      [category]: newSections
    });
  };

  const addTag = () => updateField('tags', [...data.tags, '']);
  const removeTag = (index: number) => updateField('tags', data.tags.filter((_, i) => i !== index));
  const updateTag = (index: number, value: string) => {
    const newTags = [...data.tags];
    newTags[index] = value;
    updateField('tags', newTags);
  };

  const addFaq = () => updateField('faqs', [...data.faqs, { question: '', answer: '' }]);
  const removeFaq = (index: number) => updateField('faqs', data.faqs.filter((_, i) => i !== index));
  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...data.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    updateField('faqs', newFaqs);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    if (thumbnailImage) {
      URL.revokeObjectURL(thumbnailImage.preview);
    }
    
    const preview = URL.createObjectURL(file);
    setThumbnailImage({ file, preview });
    updateField('thumbnailImage', preview);
  };

  const removeThumbnail = () => {
    if (thumbnailImage) {
      URL.revokeObjectURL(thumbnailImage.preview);
      setThumbnailImage(null);
    }
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
    updateField('thumbnailImage', undefined);
  };

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const remainingSlots = 10 - uploadedImages.length;
    if (remainingSlots <= 0) return;
    
    const newImages: { file: File; preview: string }[] = [];
    Array.from(files).slice(0, remainingSlots).forEach(file => {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        newImages.push({ file, preview });
      }
    });
    
    setUploadedImages(prev => {
      const updated = [...prev, ...newImages];
      updateField('uploadedImages', updated.map(img => img.preview));
      return updated;
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      const updated = prev.filter((_, i) => i !== index);
      updateField('uploadedImages', updated.map(img => img.preview));
      return updated;
    });
  };

  const getScheduleByDay = () => {
    const byDay: { [key: number]: typeof data.schedule } = {};
    data.schedule.forEach(entry => {
      if (!byDay[entry.day]) {
        byDay[entry.day] = [];
      }
      byDay[entry.day].push(entry);
    });
    return byDay;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 max-w-6xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Create Experience</h3>
          <p className="text-sm text-muted-foreground">Fill in the details to create a comprehensive experience.</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={[]} className="space-y-4">
        {/* Section 1: Basic Information */}
        <AccordionItem value="basic" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            Basic Information
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Experience Name</Label>
              <Input 
                id="name" 
                placeholder="Enter experience name" 
                value={data.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Experience Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter detailed description of the experience..." 
                rows={6}
                className="min-h-[150px]"
                value={data.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 2: Source Media */}
        <AccordionItem value="media" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            Source Media
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {/* Content Type - Moved to top */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Content Type</Label>
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="content-image"
                    checked={data.contentType.includes('image')}
                    onCheckedChange={(checked) => {
                      const newContentType = checked 
                        ? [...data.contentType, 'image']
                        : data.contentType.filter(type => type !== 'image');
                      updateField('contentType', newContentType);
                    }}
                  />
                  <Label htmlFor="content-image" className="font-normal cursor-pointer">Image</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="content-video"
                    checked={data.contentType.includes('video')}
                    onCheckedChange={(checked) => {
                      const newContentType = checked 
                        ? [...data.contentType, 'video']
                        : data.contentType.filter(type => type !== 'video');
                      updateField('contentType', newContentType);
                    }}
                  />
                  <Label htmlFor="content-video" className="font-normal cursor-pointer">Video</Label>
                </div>
                
                {/* Aspect Ratio - Show in same row when Video is selected */}
                {data.contentType.includes('video') && (
                  <>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex items-center gap-4">
                      <Label className="text-sm font-semibold">Aspect Ratio:</Label>
                      <RadioGroup 
                        value={data.aspectRatio} 
                        onValueChange={(value) => updateField('aspectRatio', value)}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="square" id="square" />
                          <Label htmlFor="square" className="font-normal cursor-pointer text-sm">Square (1:1)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="portrait" id="portrait" />
                          <Label htmlFor="portrait" className="font-normal cursor-pointer text-sm">Portrait (9:16)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="landscape" id="landscape" />
                          <Label htmlFor="landscape" className="font-normal cursor-pointer text-sm">Landscape (16:9)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Thumbnail Image */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Thumbnail Image</Label>
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
              <div className="flex items-center gap-4">
                {thumbnailImage ? (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                    <img 
                      src={thumbnailImage.preview} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={removeThumbnail}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-32 h-32"
                    onClick={() => thumbnailInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6" />
                  </Button>
                )}
              </div>
            </div>

            {/* Upload Images (up to 10) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Upload Images</Label>
                <span className="text-sm text-muted-foreground">{uploadedImages.length} / 10</span>
              </div>
              <input
                ref={imagesInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesUpload}
                className="hidden"
              />
              
              <div className="grid grid-cols-5 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                    <img 
                      src={image.preview} 
                      alt={`Image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                
                {uploadedImages.length < 10 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="aspect-square"
                    onClick={() => imagesInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6" />
                  </Button>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 3: Location Details */}
        <AccordionItem value="location" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            Location Details
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  placeholder="Enter city" 
                  value={data.city}
                  onChange={(e) => updateField('city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  placeholder="Enter state" 
                  value={data.state}
                  onChange={(e) => updateField('state', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullAddress">Full Address</Label>
              <Textarea 
                id="fullAddress" 
                placeholder="Enter complete address..." 
                rows={3}
                value={data.fullAddress}
                onChange={(e) => updateField('fullAddress', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mapLink">Google Maps Link</Label>
              <Input 
                id="mapLink" 
                placeholder="https://maps.google.com/..." 
                value={data.mapLink}
                onChange={(e) => updateField('mapLink', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input 
                id="price" 
                placeholder="Enter price" 
                value={data.price}
                onChange={(e) => updateField('price', e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 4: Schedule */}
        <AccordionItem value="schedule" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            Schedule
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Days</span>
              <div className="flex items-center gap-2 bg-accent/50 rounded-lg px-3 py-1.5">
                <Button
                  type="button"
                  onClick={removeDay}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  disabled={dayCount === 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-semibold min-w-[20px] text-center">{dayCount}</span>
                <Button
                  type="button"
                  onClick={addDay}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {Array.from({ length: dayCount }, (_, i) => i + 1).map((day) => (
                <Collapsible key={day} open={openDays[day]} onOpenChange={() => toggleDay(day)}>
                  <div className="border rounded-lg bg-background/50">
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-accent/50 rounded-t-lg hover:bg-accent/70 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Day {day} Planning</span>
                        <span className="text-xs text-muted-foreground">
                          ({data.schedule.filter(entry => entry.day === day).length} itineraries)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {dayCount > 1 && (
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteDay(day);
                            }}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 hover:bg-destructive/20"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        )}
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDays[day] ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 p-4">
                      <div className="space-y-3">
                        {data.schedule
                          .map((entry, index) => ({ entry, index }))
                          .filter(({ entry }) => entry.day === day)
                          .map(({ entry, index }) => {
                            const itineraryKey = `${day}-${index}`;
                            return (
                              <Collapsible 
                                key={index} 
                                open={openItineraries[itineraryKey] ?? false}
                                onOpenChange={(isOpen) => {
                                  if (isOpen) {
                                    // Close all others when opening this one
                                    setOpenItineraries({ [itineraryKey]: true });
                                  } else {
                                    setOpenItineraries({ ...openItineraries, [itineraryKey]: false });
                                  }
                                }}
                              >
                                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                                  <span className="text-sm font-medium">
                                    {entry.heading || `Itinerary ${index + 1}`}
                                  </span>
                                  <ChevronDown className={`h-4 w-4 transition-transform ${openItineraries[itineraryKey] ? 'rotate-180' : ''}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 pt-0 space-y-3 mt-2 border rounded-lg bg-card">
                                    <div className="space-y-2 pt-3">
                                      <Label htmlFor={`heading-${index}`}>Heading</Label>
                                      <Input 
                                        id={`heading-${index}`} 
                                        placeholder="Enter section heading..." 
                                        value={entry.heading}
                                        onChange={(e) => updateScheduleEntry(index, 'heading', e.target.value)}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Time Range</Label>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                          <Label htmlFor={`start-time-${index}`} className="text-xs text-muted-foreground">Start Time</Label>
                                          <Input 
                                            id={`start-time-${index}`}
                                            type="time"
                                            value={entry.timing.split('-')[0]?.trim() || ''}
                                            onChange={(e) => updateScheduleTime(index, 'startTime', e.target.value)}
                                            className="text-sm"
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor={`end-time-${index}`} className="text-xs text-muted-foreground">End Time</Label>
                                          <Input 
                                            id={`end-time-${index}`}
                                            type="time"
                                            value={entry.timing.split('-')[1]?.trim() || ''}
                                            onChange={(e) => updateScheduleTime(index, 'endTime', e.target.value)}
                                            className="text-sm"
                                          />
                                        </div>
                                      </div>
                                      {entry.timing && entry.timing.includes('-') && checkTimeOverlap(
                                        entry.day,
                                        entry.timing.split('-')[0]?.trim() || '',
                                        entry.timing.split('-')[1]?.trim() || '',
                                        index
                                      ) && (
                                        <p className="text-xs text-destructive">⚠ Time overlaps with another section on this day</p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`plan-${index}`}>Detailed Plan</Label>
                                      <Textarea 
                                        id={`plan-${index}`} 
                                        placeholder="Enter detailed plan for this section...&#10;&#10;Tip: Use • for bullet points or - for lists" 
                                        rows={6}
                                        value={entry.plan}
                                        onChange={(e) => updateScheduleEntry(index, 'plan', e.target.value)}
                                        className="font-mono text-sm"
                                      />
                                      <p className="text-xs text-muted-foreground">Use • or - for bullet points, they'll appear formatted in the preview</p>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => removeScheduleEntry(index)}
                                    >
                                      <Trash2 className="h-3.5 w-3.5 mr-2" />
                                      Remove
                                    </Button>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            );
                          })}
                      </div>
                      <Button
                        type="button"
                        onClick={() => addScheduleEntry(day)}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs h-8 px-4 mt-2"
                      >
                        <Plus className="h-3 w-3 mr-1.5" />
                        Add Day Itinerary
                      </Button>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 5: What to Know Before You Book */}
        <AccordionItem value="booking" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            What to Know Before You Book
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {/* Available category buttons - centered */}
            {bookingCategories.filter(cat => !selectedBookingCategories.includes(cat)).length > 0 && (
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block text-center">Select a category to add:</Label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {bookingCategories
                    .filter(cat => !selectedBookingCategories.includes(cat))
                    .map((category) => (
                      <Button
                        key={category}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCategory(category)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {category}
                      </Button>
                    ))}
                </div>
              </div>
            )}

            {/* Selected categories as collapsible panels */}
            <div className="space-y-3">
              {selectedBookingCategories.map((category) => {
                const sections = data.bookingInfo[category] || [];
                const sectionCount = sections.length;
                
                return (
                  <Collapsible 
                    key={category} 
                    open={openCollapsibles[category]}
                    onOpenChange={() => toggleCollapsible(category)}
                    className="border rounded-lg bg-background"
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors rounded-lg">
                        <div className="flex items-center gap-3">
                          <ChevronDown className={`w-4 h-4 transition-transform ${openCollapsibles[category] ? 'rotate-180' : ''}`} />
                          <span className="font-semibold text-base">{category}</span>
                          <Badge variant="secondary" className="text-xs">
                            {sectionCount} {sectionCount === 1 ? 'section' : 'sections'}
                          </Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCategory(category);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3">
                        {/* Sub-sections as nested collapsibles */}
                        <div className="space-y-2">
                          {sections.map((section, index) => (
                            <div key={index}>
                              <Collapsible defaultOpen className="border rounded-lg bg-card">
                                <CollapsibleTrigger className="w-full">
                                  <div className="flex items-center justify-between p-3 hover:bg-accent/50 transition-colors rounded-t-lg">
                                    <div className="flex items-center gap-2">
                                      <ChevronDown className="w-3 h-3 transition-transform" />
                                      <span className="text-sm font-medium">
                                        {section.header || `Sub-section ${index + 1}`}
                                      </span>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeBookingSection(category, index);
                                      }}
                                    >
                                      <Trash2 className="w-3 h-3 text-destructive" />
                                    </Button>
                                  </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 pt-0 space-y-3">
                                    <div className="space-y-2">
                                      <Label htmlFor={`booking-header-${category}-${index}`}>Header</Label>
                                      <Input 
                                        id={`booking-header-${category}-${index}`}
                                        placeholder="Enter section header..." 
                                        value={section.header}
                                        onChange={(e) => updateBookingSection(category, index, 'header', e.target.value)}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`booking-details-${category}-${index}`}>Details</Label>
                                      <Textarea 
                                        id={`booking-details-${category}-${index}`}
                                        placeholder="Enter details...&#10;&#10;Tip: Use • for bullet points, **bold**, or *italic* for formatting" 
                                        rows={6}
                                        value={section.details}
                                        onChange={(e) => updateBookingSection(category, index, 'details', e.target.value)}
                                        className="font-mono text-sm"
                                      />
                                      <p className="text-xs text-muted-foreground">
                                        Supports: • or - for bullets, **bold**, *italic*
                                      </p>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                              {/* Add More button after each section */}
                              {index === sections.length - 1 && (
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => addBookingSection(category)}
                                  className="rounded-full text-xs h-8 px-4 mt-2 w-full"
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add More
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>

                        {sections.length === 0 && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addBookingSection(category)}
                            className="rounded-full text-xs h-8 px-4 w-full"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add {category}
                          </Button>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 6: Tags & FAQs */}
        <AccordionItem value="tags" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            Tags & FAQs
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {/* Tags Collapsible */}
            <Collapsible open={openTagsSection} onOpenChange={setOpenTagsSection}>
              <div className="border rounded-lg bg-background">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-accent/50 rounded-t-lg hover:bg-accent/70 transition-colors">
                  <span className="font-medium">Tags</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openTagsSection ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 space-y-3">
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-background">
                    {data.tags.filter(t => t).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="gap-1 pr-1 h-7">
                        #{tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeTag(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Type and press Enter or Tab to add tags"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Tab') {
                        e.preventDefault();
                        const value = e.currentTarget.value.trim();
                        if (value) {
                          const newTags = data.tags.filter(t => t);
                          newTags.push(value);
                          updateField('tags', newTags);
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* FAQs Collapsible */}
            <Collapsible open={openFaqsSection} onOpenChange={setOpenFaqsSection}>
              <div className="border rounded-lg bg-background">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-accent/50 rounded-t-lg hover:bg-accent/70 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">FAQs</span>
                    <span className="text-xs text-muted-foreground">
                      ({data.faqs.length} questions)
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openFaqsSection ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 space-y-3">
                  {data.faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3 bg-card">
                      <div className="flex items-center justify-between">
                        <Label className="font-medium">FAQ {index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFaq(index)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`faq-question-${index}`}>Question</Label>
                        <Input 
                          id={`faq-question-${index}`}
                          placeholder="Enter question..." 
                          value={faq.question}
                          onChange={(e) => updateFaq(index, 'question', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`faq-answer-${index}`}>Answer</Label>
                        <Textarea 
                          id={`faq-answer-${index}`}
                          placeholder="Enter answer..." 
                          rows={3}
                          value={faq.answer}
                          onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addFaq}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add FAQ
                  </Button>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1">
          Save as Draft
        </Button>
        <Button className="flex-1">
          Publish Experience
        </Button>
      </div>
    </motion.div>
  );
}
