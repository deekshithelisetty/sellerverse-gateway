import { useSettings, themes, languages } from '@/contexts/SettingsContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

const fontSizes = ['14', '16', '18', '20', '22'];
const fontNames = [
  'Bricolage Grotesque',
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
];

const categoryOptions = [
  'Retail',
  'Products',
  'Mobility',
  'Flights',
  'Hotels',
  'Cars',
  'Cruises',
  'Pharmacy',
  'Drivers',
  'Food and Beverages',
  'Fashion and Beauty',
  'Electronics & Appliances',
];

export default function Settings() {
  const {
    fontSize,
    fontName,
    theme,
    brandLogo,
    language,
    interestedCategories,
    setFontSize,
    setFontName,
    setTheme,
    setBrandLogo,
    setLanguage,
    setInterestedCategories,
  } = useSettings();

  const toggleCategory = (category: string) => {
    if (interestedCategories.includes(category)) {
      setInterestedCategories(interestedCategories.filter(c => c !== category));
      toast.success(`${category} removed from sidebar`);
    } else {
      setInterestedCategories([...interestedCategories, category]);
      toast.success(`${category} added to sidebar`);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setBrandLogo(event.target?.result as string);
        toast.success('Brand logo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setBrandLogo(null);
    toast.success('Brand logo removed');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your dashboard preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Font Settings */}
        <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Font Settings</CardTitle>
            <CardDescription className="text-xs">Customize text appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="fontSize" className="text-sm">Font Size</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger id="fontSize" className="h-9">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}px
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fontName" className="text-sm">Font Family</Label>
              <Select value={fontName} onValueChange={setFontName}>
                <SelectTrigger id="fontName" className="h-9">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fontNames.map((font) => (
                    <SelectItem key={font} value={font}>
                      <span style={{ fontFamily: font }}>{font}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Language</CardTitle>
            <CardDescription className="text-xs">Select your preferred language</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={(value) => {
              setLanguage(value);
              toast.success('Language changed successfully');
            }}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Theme</CardTitle>
            <CardDescription className="text-xs">Choose a color theme for your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {themes.slice(0, 3).map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id);
                    toast.success(`Theme changed to ${themeOption.name}`);
                  }}
                  className={`glass-card p-3 rounded-lg border transition-all hover:scale-105 ${
                    theme === themeOption.id ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold truncate">{themeOption.name}</span>
                    {theme === themeOption.id && <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 ml-1" />}
                  </div>
                  <div className="flex gap-1.5">
                    <div
                      className="h-6 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${themeOption.primary})` }}
                    />
                    <div
                      className="h-6 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${themeOption.secondary})` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Brand Logo */}
        <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Brand Logo</CardTitle>
            <CardDescription className="text-xs">Upload your brand logo for the dashboard header</CardDescription>
          </CardHeader>
          <CardContent>
            {brandLogo ? (
              <div className="flex items-center gap-4">
                <div className="glass-card p-3 rounded-lg border-white/20 flex items-center justify-center flex-1">
                  <img src={brandLogo} alt="Brand Logo" className="max-h-12 object-contain" />
                </div>
                <Button onClick={handleRemoveLogo} variant="outline" size="sm" className="h-9">
                  Remove Logo
                </Button>
              </div>
            ) : (
              <div className="glass-card p-6 rounded-lg border-2 border-dashed border-white/20 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <span className="text-sm text-primary font-semibold">Click to upload</span>
                  <span className="text-sm text-muted-foreground"> or drag and drop</span>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                </Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Interested Category Section */}
      <Card className="glass-card border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Interested Category</CardTitle>
          <CardDescription className="text-xs">Select categories to add to your sidebar navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categoryOptions.map((category) => {
              const isSelected = interestedCategories.includes(category);
              return (
                <motion.button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-muted/50 text-foreground hover:bg-muted'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {category}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
