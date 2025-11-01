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
  const [uploadedMedia, setUploadedMedia] = useState<{ file: File; preview: string }[]>([]);
  const [sourceMedia, setSourceMedia] = useState<'upload' | 'bulk'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newMedia: { file: File; preview: string }[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const preview = URL.createObjectURL(file);
        newMedia.push({ file, preview });
      }
    });
    
    setUploadedMedia(prev => [...prev, ...newMedia]);
  };

  const removeMedia = (index: number) => {
    setUploadedMedia(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
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

        {/* Three Column Layout for Aspect Ratio, Content Type, Source Media */}
        <div className="grid grid-cols-3 gap-6">
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

          {/* Source Media */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Source Media</Label>
            <RadioGroup value={sourceMedia} onValueChange={(value: 'upload' | 'bulk') => setSourceMedia(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="upload" />
                <Label htmlFor="upload" className="font-normal cursor-pointer flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Files
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bulk" id="bulk" />
                <Label htmlFor="bulk" className="font-normal cursor-pointer flex items-center gap-2">
                  <FolderUp className="w-4 h-4" />
                  Bulk Upload
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Upload Area */}
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div 
            onClick={triggerFileUpload}
            className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, MP4 up to 50MB</p>
          </div>

          {/* Media Preview */}
          {uploadedMedia.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {uploadedMedia.map((media, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
                  {media.file.type.startsWith('image/') ? (
                    <img 
                      src={media.preview} 
                      alt={`Upload ${index + 1}`} 
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <video 
                      src={media.preview} 
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <button
                    onClick={() => removeMedia(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                    {media.file.name}
                  </div>
                </div>
              ))}
            </div>
          )}
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
