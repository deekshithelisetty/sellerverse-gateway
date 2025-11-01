import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ExperienceForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Create Experience</h3>
        <p className="text-sm text-muted-foreground">Fill in the details to create a new experience.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Experience Title</Label>
          <Input id="title" placeholder="Enter experience title" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="dining">Dining</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="wellness">Wellness</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Describe the experience..." 
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input id="price" type="number" placeholder="0.00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hrs)</Label>
            <Input id="duration" type="number" placeholder="2" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Enter location" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" placeholder="https://..." />
        </div>

        <Button className="w-full">Save Experience</Button>
      </div>
    </div>
  );
}
