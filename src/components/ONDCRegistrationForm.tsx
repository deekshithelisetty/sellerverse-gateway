import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

const ondcFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name too long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name too long'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
  email: z.string().email('Invalid email address'),
  entityName: z.string().min(2, 'Entity/Company name is required').max(100),
  role: z.enum(['buyer', 'seller'], {
    required_error: 'Please select a role',
  }),
  ondcDomain: z.string().min(1, 'Please select an ONDC domain'),
  productDomains: z.string().min(2, 'Please specify product/service domains'),
  transactionType: z.enum(['B2C', 'B2B', 'All'], {
    required_error: 'Please select transaction type',
  }),
  subscriberId: z.string().min(5, 'Subscriber ID is required').regex(/^[a-z0-9.-]+$/, 'Invalid format'),
  environment: z.enum(['staging', 'preprod', 'prod'], {
    required_error: 'Please select environment',
  }),
  gstNo: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST number format'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().regex(/^[0-9]{6}$/, 'ZIP code must be 6 digits'),
  stdCode: z.string().regex(/^[0-9]{2,5}$/, 'Invalid STD code'),
  country: z.string().min(2, 'Country is required'),
  sslCertificate: z.instanceof(FileList).optional().refine(
    (files) => !files || files.length === 0 || files[0]?.type === 'application/x-x509-ca-cert' || files[0]?.name.endsWith('.pem') || files[0]?.name.endsWith('.crt'),
    'Please upload a valid SSL certificate (.pem or .crt)'
  ),
});

type ONDCFormValues = z.infer<typeof ondcFormSchema>;

const ondcDomains = [
  'Retail',
  'Logistics',
  'Food & Beverage',
  'Healthcare',
  'Fashion',
  'Electronics',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Books & Media',
  'Services',
];

const STEPS = [
  { title: 'Personal Information', fields: ['firstName', 'lastName', 'mobile', 'email'] },
  { title: 'Business Information', fields: ['entityName', 'role', 'ondcDomain', 'productDomains', 'transactionType', 'gstNo'] },
  { title: 'Network Configuration', fields: ['subscriberId', 'environment', 'sslCertificate'] },
  { title: 'Location Information', fields: ['city', 'state', 'zip', 'stdCode', 'country'] },
];

export function ONDCRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ONDCFormValues>({
    resolver: zodResolver(ondcFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      entityName: '',
      productDomains: '',
      subscriberId: '',
      gstNo: '',
      city: '',
      state: '',
      zip: '',
      stdCode: '',
      country: 'India',
    },
  });

  // Calculate progress based on current step
  const calculateProgress = () => {
    if (isSubmitted) return 100;
    return currentStep * 25; // 0%, 25%, 50%, 75%
  };

  const onSubmit = (data: ONDCFormValues) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    toast.success('ONDC Registration submitted successfully!');
  };

  const handleNext = async () => {
    const currentStepFields = STEPS[currentStep].fields as Array<keyof ONDCFormValues>;
    const isValid = await form.trigger(currentStepFields);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">ONDC Registration</h3>
            <p className="text-muted-foreground text-sm">
              Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
            </p>
          </div>
          
          {/* Progress Bar - Top Right */}
          <div className="flex flex-col items-end gap-2 min-w-[240px]">
            <span className="text-sm font-bold">
              Profile Completion: {calculateProgress()}%
            </span>
            <div className="relative w-full h-4 overflow-hidden rounded-full bg-secondary/20 border border-white/10">
              <div 
                className="h-full transition-all duration-500 ease-out rounded-full"
                style={{ 
                  width: `${calculateProgress()}%`,
                  background: `linear-gradient(90deg, 
                    hsl(25, 95%, 53%) 0%, 
                    hsl(45, 93%, 47%) 25%,
                    hsl(84, 81%, 44%) 50%,
                    hsl(120, 100%, 40%) 75%,
                    hsl(142, 76%, 36%) 100%)`,
                  boxShadow: calculateProgress() > 0 ? '0 0 20px rgba(255, 127, 0, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)' : 'none'
                }}
              />
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <div className="glass-card p-6 rounded-2xl border-white/20 space-y-4 animate-fade-in">
                <h4 className="font-semibold text-lg">{STEPS[0].title}</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} className="glass border-white/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} className="glass border-white/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="9876543210" {...field} className="glass border-white/20" />
                    </FormControl>
                    <FormDescription>10-digit mobile number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} className="glass border-white/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 1 && (
              <div className="glass-card p-6 rounded-2xl border-white/20 space-y-4 animate-fade-in">
                <h4 className="font-semibold text-lg">{STEPS[1].title}</h4>

              <FormField
                control={form.control}
                name="entityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity Name / Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Corporation Ltd." {...field} className="glass border-white/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="buyer" id="buyer" />
                          <Label htmlFor="buyer">Buyer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="seller" id="seller" />
                          <Label htmlFor="seller">Seller</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ondcDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ONDC Domain</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="glass border-white/20">
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="glass-card border-white/20">
                        {ondcDomains.map((domain) => (
                          <SelectItem key={domain} value={domain.toLowerCase()}>
                            {domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productDomains"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domains of Products and Services</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Electronics, Fashion, Home Goods" {...field} className="glass border-white/20" />
                    </FormControl>
                    <FormDescription>List the product/service categories you deal with</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="glass border-white/20">
                          <SelectValue placeholder="Select transaction type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="glass-card border-white/20">
                        <SelectItem value="B2C">B2C (Business to Consumer)</SelectItem>
                        <SelectItem value="B2B">B2B (Business to Business)</SelectItem>
                        <SelectItem value="All">All Types</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gstNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Number</FormLabel>
                    <FormControl>
                      <Input placeholder="22AAAAA0000A1Z5" {...field} className="glass border-white/20" />
                    </FormControl>
                    <FormDescription>15-character GST identification number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
            )}

            {/* Step 3: Network Configuration */}
            {currentStep === 2 && (
              <div className="glass-card p-6 rounded-2xl border-white/20 space-y-4 animate-fade-in">
                <h4 className="font-semibold text-lg">{STEPS[2].title}</h4>

              <FormField
                control={form.control}
                name="subscriberId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscriber ID</FormLabel>
                    <FormControl>
                      <Input placeholder="aarna.ondc.global" {...field} className="glass border-white/20" />
                    </FormControl>
                    <FormDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Shield className="w-4 h-4" />
                        <span className="text-xs">SSL certificate required for secure connection</span>
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="environment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Environment</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="glass border-white/20">
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="glass-card border-white/20">
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="preprod">Pre-Production</SelectItem>
                        <SelectItem value="prod">Production</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>SSL Certificate (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pem,.crt"
                    {...form.register('sslCertificate')}
                    className="glass border-white/20"
                  />
                </FormControl>
                <FormDescription>Upload your SSL certificate (.pem or .crt file)</FormDescription>
                <FormMessage />
              </FormItem>
              </div>
            )}

            {/* Step 4: Location Information */}
            {currentStep === 3 && (
              <div className="glass-card p-6 rounded-2xl border-white/20 space-y-4 animate-fade-in">
                <h4 className="font-semibold text-lg">{STEPS[3].title}</h4>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" {...field} className="glass border-white/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Maharashtra" {...field} className="glass border-white/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="400001" {...field} className="glass border-white/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stdCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>STD Code</FormLabel>
                      <FormControl>
                        <Input placeholder="022" {...field} className="glass border-white/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="India" {...field} className="glass border-white/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 glass border-white/20"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              
              {currentStep < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 gradient-primary"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="flex-1 gradient-primary text-lg py-6">
                  Submit Registration
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>

    </div>
  );
}
