import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Upload, FolderUp } from 'lucide-react';
import { useState } from 'react';

export function ExperienceForm() {
  const [scheduleEntries, setScheduleEntries] = useState([{ day: 1, timing: '', plan: '' }]);
  const [inclusions, setInclusions] = useState(['']);
  const [exclusions, setExclusions] = useState(['']);
  const [tags, setTags] = useState(['']);
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);

  const addScheduleEntry = () => {
    setScheduleEntries([...scheduleEntries, { day: scheduleEntries.length + 1, timing: '', plan: '' }]);
  };

  const removeScheduleEntry = (index: number) => {
    setScheduleEntries(scheduleEntries.filter((_, i) => i !== index));
  };

  const addInclusion = () => setInclusions([...inclusions, '']);
  const removeInclusion = (index: number) => setInclusions(inclusions.filter((_, i) => i !== index));

  const addExclusion = () => setExclusions([...exclusions, '']);
  const removeExclusion = (index: number) => setExclusions(exclusions.filter((_, i) => i !== index));

  const addTag = () => setTags([...tags, '']);
  const removeTag = (index: number) => setTags(tags.filter((_, i) => i !== index));

  const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

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
          <Input id="name" placeholder="Enter experience name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Experience Description</Label>
          <Textarea 
            id="description" 
            placeholder="Enter detailed description of the experience..." 
            rows={6}
            className="min-h-[150px]"
          />
        </div>

        <div className="space-y-3">
          <Label>Aspect Ratio</Label>
          <RadioGroup defaultValue="square">
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

        <div className="space-y-3">
          <Label>Content Type</Label>
          <RadioGroup defaultValue="image">
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

      {/* Section 2: Source Media */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Source Media</h4>
        <Separator />
        
        <div className="space-y-3">
          <RadioGroup defaultValue="upload">
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

        <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, MP4 up to 50MB</p>
        </div>
      </div>

      {/* Section 3: Location Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Location Details</h4>
        <Separator />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Enter city" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="Enter state" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullAddress">Full Address</Label>
          <Textarea id="fullAddress" placeholder="Enter complete address..." rows={3} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mapLink">Google Maps Link</Label>
          <Input id="mapLink" placeholder="https://maps.google.com/..." />
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
          {scheduleEntries.map((entry, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">Day {entry.day}</Label>
                {scheduleEntries.length > 1 && (
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
                <Input id={`timing-${index}`} placeholder="e.g., 9:00 AM - 6:00 PM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`plan-${index}`}>Detailed Plan</Label>
                <Textarea 
                  id={`plan-${index}`} 
                  placeholder="Enter detailed plan for this day..." 
                  rows={4}
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
            {inclusions.map((_, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  placeholder="Enter inclusion..." 
                  className="flex-1"
                />
                {inclusions.length > 1 && (
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
            {exclusions.map((_, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  placeholder="Enter exclusion..." 
                  className="flex-1"
                />
                {exclusions.length > 1 && (
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
            {tags.map((_, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  placeholder="Enter tag..." 
                  className="flex-1"
                />
                {tags.length > 1 && (
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
            {faqs.map((_, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">FAQ {index + 1}</Label>
                  {faqs.length > 1 && (
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`faq-answer-${index}`}>Answer</Label>
                  <Textarea 
                    id={`faq-answer-${index}`}
                    placeholder="Enter answer..." 
                    rows={3}
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
