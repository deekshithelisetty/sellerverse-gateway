import { useSettings, themes, languages } from '@/contexts/SettingsContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Check } from 'lucide-react';
import { toast } from 'sonner';

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

export default function Settings() {
  const {
    fontSize,
    fontName,
    theme,
    brandLogo,
    language,
    setFontSize,
    setFontName,
    setTheme,
    setBrandLogo,
    setLanguage,
  } = useSettings();

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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Settings</h2>
        <p className="text-muted-foreground">Configure your dashboard preferences</p>
      </div>

      {/* Font Settings */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle>Font Settings</CardTitle>
          <CardDescription>Customize the appearance of text</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger id="fontSize">
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

          <div className="space-y-2">
            <Label htmlFor="fontName">Font Family</Label>
            <Select value={fontName} onValueChange={setFontName}>
              <SelectTrigger id="fontName">
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

      {/* Theme Settings */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose a color theme for your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => {
                  setTheme(themeOption.id);
                  toast.success(`Theme changed to ${themeOption.name}`);
                }}
                className={`glass-card p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  theme === themeOption.id ? 'border-primary shadow-lg' : 'border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{themeOption.name}</span>
                  {theme === themeOption.id && <Check className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex gap-2">
                  <div
                    className="h-8 flex-1 rounded"
                    style={{ backgroundColor: `hsl(${themeOption.primary})` }}
                  />
                  <div
                    className="h-8 flex-1 rounded"
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
        <CardHeader>
          <CardTitle>Brand Logo</CardTitle>
          <CardDescription>Upload your brand logo for the dashboard header</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {brandLogo ? (
            <div className="space-y-4">
              <div className="glass-card p-4 rounded-xl border-white/20 flex items-center justify-center">
                <img src={brandLogo} alt="Brand Logo" className="max-h-16 object-contain" />
              </div>
              <Button onClick={handleRemoveLogo} variant="outline" className="w-full">
                Remove Logo
              </Button>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-xl border-2 border-dashed border-white/20 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <span className="text-primary font-semibold">Click to upload</span>
                <span className="text-muted-foreground"> or drag and drop</span>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 2MB</p>
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

      {/* Language Settings */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>Select your preferred dashboard language</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={language} onValueChange={(value) => {
            setLanguage(value);
            toast.success('Language changed successfully');
          }}>
            <SelectTrigger>
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
    </div>
  );
}
