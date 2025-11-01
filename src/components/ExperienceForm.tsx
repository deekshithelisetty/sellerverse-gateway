import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Upload, FolderUp, X } from 'lucide-react';
import { ExperienceData } from '@/pages/Experiences';
import { useState, useRef } from 'react';

export function ExperienceForm({ data, onChange }: { data: ExperienceData; onChange: (data: ExperienceData) => void }) {
  const [thumbnailImage, setThumbnailImage] = useState<{ file: File; preview: string } | null>(null);
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const updateField = (field: keyof ExperienceData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addScheduleEntry = () => {
    updateField('schedule', [...data.schedule, { day: data.schedule.length + 1, timing: '', plan: '' }]);
  };

  const removeScheduleEntry = (index: number) => {
    updateField('schedule', data.schedule.filter((_, i) => i !== index));
  };

  const updateScheduleEntry = (index: number, field: 'timing' | 'plan', value: string) => {
    const newSchedule = [...data.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    updateField('schedule', newSchedule);
  };

  const addInclusion = () => updateField('inclusions', [...data.inclusions, '']);
  const removeInclusion = (index: number) => updateField('inclusions', data.inclusions.filter((_, i) => i !== index));
  const updateInclusion = (index: number, value: string) => {
    const newInclusions = [...data.inclusions];
    newInclusions[index] = value;
    updateField('inclusions', newInclusions);
  };

  const addExclusion = () => updateField('exclusions', [...data.exclusions, '']);
  const removeExclusion = (index: number) => updateField('exclusions', data.exclusions.filter((_, i) => i !== index));
  const updateExclusion = (index: number, value: string) => {
    const newExclusions = [...data.exclusions];
    newExclusions[index] = value;
    updateField('exclusions', newExclusions);
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
  };

  const removeThumbnail = () => {
    if (thumbnailImage) {
      URL.revokeObjectURL(thumbnailImage.preview);
      setThumbnailImage(null);
    }
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
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
    
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Create Experience</h3>
        <p className="text-sm text-muted-foreground">Fill in the details to create a comprehensive experience.</p>
      </div>

      {/* Section 1: Basic Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Basic Information</h4>
        <Separator />
        
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

        {/* Three Column Layout for Aspect Ratio and Content Type */}
        <div className="grid grid-cols-2 gap-6">
          {/* Aspect Ratio */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Aspect Ratio</Label>
            <RadioGroup value={data.aspectRatio} onValueChange={(value) => updateField('aspectRatio', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="square" id="square" />
                <Label htmlFor="square" className="font-normal cursor-pointer">Square (1:1)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="portrait" id="portrait" />
                <Label htmlFor="portrait" className="font-normal cursor-pointer">Portrait (9:16)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="landscape" id="landscape" />
                <Label htmlFor="landscape" className="font-normal cursor-pointer">Landscape (16:9)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Content Type */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Content Type</Label>
            <RadioGroup value={data.contentType} onValueChange={(value) => updateField('contentType', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image" />
                <Label htmlFor="image" className="font-normal cursor-pointer">Image</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video" className="font-normal cursor-pointer">Video</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Section 2: Source Media */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Source Media</h4>
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
      </div>

      {/* Section 3: Location Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Location Details</h4>
        <Separator />
        
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
      </div>

      {/* Section 4: Schedule */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Schedule</h4>
          <Button type="button" variant="outline" size="sm" onClick={addScheduleEntry}>
            <Plus className="w-4 h-4" />
            Add Day
          </Button>
        </div>
        <Separator />
        
        <div className="space-y-4">
          {data.schedule.map((entry, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">Day {entry.day}</Label>
                {data.schedule.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeScheduleEntry(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`timing-${index}`}>Timing</Label>
                <Input 
                  id={`timing-${index}`} 
                  placeholder="e.g., 9:00 AM - 6:00 PM" 
                  value={entry.timing}
                  onChange={(e) => updateScheduleEntry(index, 'timing', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`plan-${index}`}>Detailed Plan</Label>
                <Textarea 
                  id={`plan-${index}`} 
                  placeholder="Enter detailed plan for this day..." 
                  rows={4}
                  value={entry.plan}
                  onChange={(e) => updateScheduleEntry(index, 'plan', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Inclusions/Exclusions */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Inclusions & Exclusions</h4>
        <Separator />
        
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Inclusions</Label>
              <Button type="button" variant="outline" size="sm" onClick={addInclusion}>
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            {data.inclusions.map((inclusion, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  placeholder="Enter inclusion..." 
                  className="flex-1"
                  value={inclusion}
                  onChange={(e) => updateInclusion(index, e.target.value)}
                />
                {data.inclusions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInclusion(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Exclusions</Label>
              <Button type="button" variant="outline" size="sm" onClick={addExclusion}>
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            {data.exclusions.map((exclusion, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  placeholder="Enter exclusion..." 
                  className="flex-1"
                  value={exclusion}
                  onChange={(e) => updateExclusion(index, e.target.value)}
                />
                {data.exclusions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExclusion(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 6: Tags & FAQs */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Tags & FAQs</h4>
        <Separator />
        
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Tags</Label>
              <Button type="button" variant="outline" size="sm" onClick={addTag}>
                <Plus className="w-4 h-4" />
                Add Tag
              </Button>
            </div>
            {data.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  placeholder="Enter tag..." 
                  className="flex-1"
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                />
                {data.tags.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTag(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium">FAQs</Label>
              <Button type="button" variant="outline" size="sm" onClick={addFaq}>
                <Plus className="w-4 h-4" />
                Add FAQ
              </Button>
            </div>
            {data.faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">FAQ {index + 1}</Label>
                  {data.faqs.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFaq(index)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
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
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1">
          Save as Draft
        </Button>
        <Button className="flex-1">
          Publish Experience
        </Button>
      </div>
    </div>
  );
}
