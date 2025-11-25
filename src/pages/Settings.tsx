import { useState, useEffect } from 'react';
import { useSettings, themes, languages } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Upload, Check, Plus, X, Edit, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
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

const defaultCategoryOptions = [
  'Retail',
  'Products',
  'Mobility',
  'Flights',
  'Hotels',
  'Cars',
  'Cruises',
  'Pharmacy',
  'Drivers',
  'Food & Beverages',
  'Fashion & Beauty',
  'Electronics & Appliances',
];

export default function Settings() {
  const [categoryOptions, setCategoryOptions] = useState<string[]>(defaultCategoryOptions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const showSuperAdminTab = user?.role === 'admin';

  const {
    fontSize,
    fontName,
    theme,
    brandLogo,
    heroPageLogo,
    language,
    interestedCategories,
    contactInfo,
    setFontSize,
    setFontName,
    setTheme,
    setBrandLogo,
    setHeroPageLogo,
    setLanguage,
    setInterestedCategories,
    setContactInfo,
  } = useSettings();

  const [editingContact, setEditingContact] = useState<{ type: 'visitUs' | 'callUs' | 'emailUs' | null; value: string }>({ type: null, value: '' });

  useEffect(() => {
    // Simulate loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  const handleHeroPageLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setHeroPageLogo(event.target?.result as string);
        toast.success('Hero page logo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveHeroPageLogo = () => {
    setHeroPageLogo(null);
    toast.success('Hero page logo removed');
  };

  const handleEditContact = (type: 'visitUs' | 'callUs' | 'emailUs') => {
    setEditingContact({ type, value: contactInfo[type] });
  };

  const handleSaveContact = () => {
    if (editingContact.type) {
      setContactInfo({
        ...contactInfo,
        [editingContact.type]: editingContact.value,
      });
      setEditingContact({ type: null, value: '' });
      toast.success(`${editingContact.type === 'visitUs' ? 'Visit Us' : editingContact.type === 'callUs' ? 'Call Us' : 'Email Us'} updated successfully`);
    }
  };

  const handleCancelEdit = () => {
    setEditingContact({ type: null, value: '' });
  };

  const handleAddCategory = () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) {
      toast.error('Please enter a category name');
      return;
    }
    if (categoryOptions.includes(trimmedName)) {
      toast.error('Category already exists');
      return;
    }
    setCategoryOptions([...categoryOptions, trimmedName]);
    setNewCategoryName('');
    setIsDialogOpen(false);
    toast.success(`Category "${trimmedName}" added successfully`);
  };

  const handleCancelDialog = () => {
    setNewCategoryName('');
    setIsDialogOpen(false);
  };

  const handleRemoveCategory = (category: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the category toggle
    // Remove from category options
    setCategoryOptions(categoryOptions.filter(c => c !== category));
    // Also remove from interested categories if it's selected
    if (interestedCategories.includes(category)) {
      setInterestedCategories(interestedCategories.filter(c => c !== category));
      toast.success(`${category} removed from sidebar`);
    }
    toast.success(`Category "${category}" removed`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold mb-1 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your dashboard preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        {showSuperAdminTab && (
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2 glass-card border-white/20">
              <TabsTrigger 
                value="general" 
                className="data-[state=active]:text-white settings-tab-trigger"
              >
                General Settings
              </TabsTrigger>
              <TabsTrigger 
                value="super-admin" 
                className="data-[state=active]:text-white settings-tab-trigger"
              >
                Super Admin Setting
              </TabsTrigger>
            </TabsList>
          </div>
        )}

        <style>{`
          .settings-tab-trigger[data-state="active"] {
            background: linear-gradient(to bottom, #232526, #414345) !important;
          }
        `}</style>

        <TabsContent value="general" className="space-y-4">
          {/* First Row: Font Settings, Language, Theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Font Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0, scale: isLoading ? 0.95 : 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Font Settings</CardTitle>
            <CardDescription className="text-xs">Customize text appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm">Font Size</Label>
              <RadioGroup value={fontSize} onValueChange={setFontSize}>
                <div className="flex flex-wrap gap-2">
                  {fontSizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={`fontSize-${size}`} />
                      <Label htmlFor={`fontSize-${size}`} className="text-sm cursor-pointer">
                        {size}px
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Font Family</Label>
              <RadioGroup value={fontName} onValueChange={setFontName}>
                <div className="grid grid-cols-3 gap-2">
                  {fontNames.slice(0, 3).map((font) => (
                    <div key={font} className="flex items-center space-x-2">
                      <RadioGroupItem value={font} id={`fontName-${font}`} />
                      <Label htmlFor={`fontName-${font}`} className="text-sm cursor-pointer" style={{ fontFamily: font }}>
                        {font}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Language Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0, scale: isLoading ? 0.95 : 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Language</CardTitle>
            <CardDescription className="text-xs">Select your preferred language</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={language} 
              onValueChange={(value) => {
                setLanguage(value);
                toast.success('Language changed successfully');
              }}
            >
              <div className="flex flex-col gap-2">
                {languages.map((lang) => (
                  <div key={lang.code} className="flex items-center space-x-2">
                    <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                    <Label htmlFor={`lang-${lang.code}`} className="text-sm cursor-pointer">
                      {lang.name}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0, scale: isLoading ? 0.95 : 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Theme</CardTitle>
            <CardDescription className="text-xs">Choose a color theme for your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {themes.slice(0, 2).map((themeOption) => (
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
        </motion.div>
      </div>

      {/* Second Row: Brand Logo and Interested Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0, scale: isLoading ? 0.95 : 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Brand Logo</CardTitle>
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
        </motion.div>

        {/* Interested Category Section */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0, scale: isLoading ? 0.95 : 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="lg:col-span-2"
        >
          <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Interested Category</CardTitle>
                <CardDescription className="text-xs">Select categories to add to your sidebar navigation</CardDescription>
              </div>
              <Button
                onClick={() => setIsDialogOpen(true)}
                size="sm"
                className="h-9 px-3 gap-2"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                New Category
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {categoryOptions.map((category) => {
                const isSelected = interestedCategories.includes(category);
                return (
                  <motion.div
                    key={category}
                    className="group relative inline-flex"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      onClick={() => toggleCategory(category)}
                      className={`inline-flex items-center justify-center px-4 py-2.5 text-sm rounded-full font-medium transition-all duration-500 whitespace-nowrap ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-muted/50 text-foreground hover:bg-muted'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                    <button
                      onClick={(e) => handleRemoveCategory(category, e)}
                      className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10"
                      title="Remove category"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </div>
        </TabsContent>

        {showSuperAdminTab && (
          <TabsContent value="super-admin" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hero Page Logo Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0, scale: isLoading ? 0.95 : 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card className="glass-card border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Hero Page Logo</CardTitle>
                  <CardDescription className="text-xs">Upload logo for the hero page header (left side)</CardDescription>
                </CardHeader>
                <CardContent>
                  {heroPageLogo ? (
                    <div className="flex items-center gap-4">
                      <div className="glass-card p-3 rounded-lg border-white/20 flex items-center justify-center flex-1">
                        <img src={heroPageLogo} alt="Hero Page Logo" className="max-h-12 object-contain" />
                      </div>
                      <Button onClick={handleRemoveHeroPageLogo} variant="outline" size="sm" className="h-9">
                        Remove Logo
                      </Button>
                    </div>
                  ) : (
                    <div className="glass-card p-6 rounded-lg border-2 border-dashed border-white/20 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <Label htmlFor="hero-logo-upload" className="cursor-pointer">
                        <span className="text-sm text-primary font-semibold">Click to upload</span>
                        <span className="text-sm text-muted-foreground"> or drag and drop</span>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                      </Label>
                      <Input
                        id="hero-logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleHeroPageLogoUpload}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Visit Us */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0, scale: isLoading ? 0.95 : 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card className="glass-card border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Visit Us</CardTitle>
                      <CardDescription className="text-xs">Manage visit us address information</CardDescription>
                    </div>
                    {editingContact.type !== 'visitUs' && (
                      <Button onClick={() => handleEditContact('visitUs')} variant="outline" size="sm" className="h-9 gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {editingContact.type === 'visitUs' ? (
                    <div className="space-y-4">
                      <Textarea
                        value={editingContact.value}
                        onChange={(e) => setEditingContact({ ...editingContact, value: e.target.value })}
                        placeholder="Enter address (use line breaks for multiple lines)"
                        className="min-h-[120px] glass border-primary/30 focus:border-primary"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveContact} size="sm" className="h-9 gap-2">
                          <Save className="h-4 w-4" />
                          Update
                        </Button>
                        <Button onClick={handleCancelEdit} variant="outline" size="sm" className="h-9">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {contactInfo.visitUs}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Call Us */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0, scale: isLoading ? 0.95 : 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card className="glass-card border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Call Us</CardTitle>
                      <CardDescription className="text-xs">Manage call us phone and hours information</CardDescription>
                    </div>
                    {editingContact.type !== 'callUs' && (
                      <Button onClick={() => handleEditContact('callUs')} variant="outline" size="sm" className="h-9 gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {editingContact.type === 'callUs' ? (
                    <div className="space-y-4">
                      <Textarea
                        value={editingContact.value}
                        onChange={(e) => setEditingContact({ ...editingContact, value: e.target.value })}
                        placeholder="Enter phone number and hours (use line breaks for multiple lines)"
                        className="min-h-[80px] glass border-primary/30 focus:border-primary"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveContact} size="sm" className="h-9 gap-2">
                          <Save className="h-4 w-4" />
                          Update
                        </Button>
                        <Button onClick={handleCancelEdit} variant="outline" size="sm" className="h-9">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {contactInfo.callUs}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Email Us */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0, scale: isLoading ? 0.95 : 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card className="glass-card border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #232526, #414345)' }}>Email Us</CardTitle>
                      <CardDescription className="text-xs">Manage email us addresses</CardDescription>
                    </div>
                    {editingContact.type !== 'emailUs' && (
                      <Button onClick={() => handleEditContact('emailUs')} variant="outline" size="sm" className="h-9 gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {editingContact.type === 'emailUs' ? (
                    <div className="space-y-4">
                      <Textarea
                        value={editingContact.value}
                        onChange={(e) => setEditingContact({ ...editingContact, value: e.target.value })}
                        placeholder="Enter email addresses (use line breaks for multiple emails)"
                        className="min-h-[80px] glass border-primary/30 focus:border-primary"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveContact} size="sm" className="h-9 gap-2">
                          <Save className="h-4 w-4" />
                          Update
                        </Button>
                        <Button onClick={handleCancelEdit} variant="outline" size="sm" className="h-9">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {contactInfo.emailUs}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        )}
      </Tabs>

      {/* Add Category Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-card border-white/20 new-category-dialog-gradient p-4 max-w-sm">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-lg text-white">Add New Category</DialogTitle>
            <DialogDescription className="text-xs text-white/80">
              Enter a name for the new category.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="category-name" className="text-sm text-white">Category Name</Label>
              <Input
                id="category-name"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCategory();
                  }
                }}
                className="h-9 bg-white/90 border-white/30"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={handleCancelDialog} size="sm" className="h-9 bg-white/20 border-white/30 text-white hover:bg-white/30">
              Cancel
            </Button>
            <Button onClick={handleAddCategory} size="sm" className="h-9 bg-white text-purple-600 hover:bg-white/90">
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
