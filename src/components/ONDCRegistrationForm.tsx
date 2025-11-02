import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { CheckCircle2, ChevronRight, Circle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

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
  { title: 'Network Configuration', fields: ['subscriberId', 'environment'] },
  { title: 'Location Information', fields: ['city', 'state', 'zip', 'stdCode', 'country'] },
];

interface ONDCRegistrationFormProps {
  showBenefits?: boolean;
  setShowBenefits?: (show: boolean) => void;
}

// Progress tracking data structure
const progressSections = [
  {
    title: 'Staging Environment Progress',
    items: [
      { name: 'Initial Setup', status: 'completed' },
      { name: 'Data Sync & Validation', status: 'in-progress' },
      { name: 'Health Checks & Monitoring', status: 'pending' },
      { name: 'UAT Approval', status: 'pending' },
    ],
  },
  {
    title: 'Pre-Production Environment Progress',
    items: [
      { name: 'Environment Provisioning', status: 'completed' },
      { name: 'Integration Testing', status: 'pending' },
      { name: 'Security Audit', status: 'pending' },
      { name: 'Performance Benchmarking', status: 'pending' },
    ],
  },
  {
    title: 'Production Environment Progress',
    items: [
      { name: 'Resource Allocation', status: 'pending' },
      { name: 'Configuration Deployment', status: 'pending' },
      { name: 'Go-Live Approval', status: 'pending' },
      { name: 'Public Launch', status: 'pending' },
    ],
  },
  {
    title: 'NBBL Network Progress',
    items: [
      { name: 'NBBL Registration', status: 'completed' },
      { name: 'API Key Generation', status: 'in-progress' },
      { name: 'Connectivity Testing', status: 'rejected' },
      { name: 'Certification', status: 'pending' },
    ],
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'in-progress':
      return <Circle className="w-5 h-5 text-orange-500 fill-orange-500" />;
    case 'rejected':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Circle className="w-5 h-5 text-muted-foreground" />;
  }
};

export function ONDCRegistrationForm({ showBenefits, setShowBenefits }: ONDCRegistrationFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ONDCFormValues>({
    resolver: zodResolver(ondcFormSchema),
    defaultValues: {
      firstName: 'Rajesh',
      lastName: 'Kumar',
      mobile: '9876543210',
      email: 'rajesh.kumar@example.com',
      entityName: 'Kumar Enterprises Pvt Ltd',
      role: 'seller',
      ondcDomain: 'Retail',
      productDomains: 'Electronics, Home Appliances',
      transactionType: 'B2C',
      subscriberId: 'kumar-enterprises-001',
      environment: 'staging',
      gstNo: '29ABCDE1234F1Z5',
      city: 'Bangalore',
      state: 'Karnataka',
      zip: '560001',
      stdCode: '080',
      country: 'India',
    },
  });

  // Calculate progress based on current step
  const calculateProgress = () => {
    if (isSubmitted) return 100;
    return ((currentStep + 1) / STEPS.length) * 100;
  };

  // Get current glow color based on progress
  const getGlowColor = () => {
    const progress = calculateProgress();
    if (progress <= 33) return '0 0 20px rgba(255, 153, 51, 0.8)'; // Orange
    if (progress <= 66) return '0 0 20px rgba(255, 255, 255, 0.8)'; // White
    return '0 0 20px rgba(19, 136, 8, 0.8)'; // Green
  };

  const getCurrentColor = () => {
    const progress = calculateProgress();
    if (progress <= 33) return '#FF9933'; // Orange
    if (progress <= 66) return '#FFFFFF'; // White
    return '#138808'; // Green
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
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Initial state - Start Onboarding button
  if (!showForm && !isSubmitted) {
    return (
      <div className="h-full flex items-center justify-center">
        <Button 
          onClick={() => setShowForm(true)}
          size="lg"
          className="text-lg px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 shadow-lg"
        >
          Start Onboarding
        </Button>
      </div>
    );
  }

  // After submission - Progress Tracking
  if (isSubmitted) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">ONDC Onboarding Progress Tracking</h2>
          <p className="text-muted-foreground">Track your progress across different environments</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-4">
            {progressSections.map((section, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border-white/20 space-y-4">
                <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-3">
                      <StatusIcon status={item.status} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  // Form view
  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header */}
      <div className="mb-4 space-y-4">
        <div>
          <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <svg className="inline-block animate-spin-slow" width="26" height="26" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="white" stroke="#001F8D" strokeWidth="2" />
              <g transform="translate(20, 20)">
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const x1 = 0;
                  const y1 = 0;
                  const x2 = Math.cos(angle) * 16;
                  const y2 = Math.sin(angle) * 16;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#001F8D"
                      strokeWidth="1.5"
                    />
                  );
                })}
                <circle cx="0" cy="0" r="3" fill="#001F8D" />
              </g>
            </svg>
            <span className="text-orange-500" style={{ textShadow: '0 0 20px rgba(249, 115, 22, 0.6)' }}>
              ONDC
            </span>
            <span className="text-green-500" style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.6)' }}>
              Registration
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
          </p>
        </div>

        {/* Profile Completion */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">Profile Completion:</span>
            <span className="text-sm font-bold">{Math.round(calculateProgress())}%</span>
          </div>
          <div className="relative w-full h-3 overflow-hidden rounded-full bg-secondary/20 border border-white/10">
            <div 
              className="h-full transition-all duration-500 ease-out rounded-full"
              style={{ 
                width: `${calculateProgress()}%`,
                backgroundColor: getCurrentColor(),
                boxShadow: getGlowColor()
              }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full pr-4">
          <Form {...form}>
            <form className="space-y-6 pb-20">
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
                            <Input {...field} className="glass border-white/20" />
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
                            <Input {...field} className="glass border-white/20" />
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
                          <Input {...field} className="glass border-white/20" />
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
                          <Input type="email" {...field} className="glass border-white/20" />
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
                          <Input {...field} className="glass border-white/20" />
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
                          <SelectContent>
                            {ondcDomains.map((domain) => (
                              <SelectItem key={domain} value={domain}>
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
                        <FormLabel>Product/Service Domains</FormLabel>
                        <FormControl>
                          <Input {...field} className="glass border-white/20" />
                        </FormControl>
                        <FormDescription>Comma-separated list</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transactionType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Transaction Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="B2C" id="b2c" />
                              <Label htmlFor="b2c">B2C</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="B2B" id="b2b" />
                              <Label htmlFor="b2b">B2B</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="All" id="all" />
                              <Label htmlFor="all">All</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
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
                          <Input {...field} className="glass border-white/20" />
                        </FormControl>
                        <FormDescription>15-character GST number</FormDescription>
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
                          <Input {...field} className="glass border-white/20" />
                        </FormControl>
                        <FormDescription>Lowercase letters, numbers, dots, and hyphens only</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="environment"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Environment</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="staging" id="staging" />
                              <Label htmlFor="staging">Staging</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="preprod" id="preprod" />
                              <Label htmlFor="preprod">Pre-Production</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="prod" id="prod" />
                              <Label htmlFor="prod">Production</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            <Input {...field} className="glass border-white/20" />
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
                            <Input {...field} className="glass border-white/20" />
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
                            <Input {...field} className="glass border-white/20" />
                          </FormControl>
                          <FormDescription>6-digit ZIP code</FormDescription>
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
                            <Input {...field} className="glass border-white/20" />
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
                          <Input {...field} className="glass border-white/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </form>
          </Form>
        </ScrollArea>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="gap-2"
          >
            Back
          </Button>
        )}
        <Button
          type="button"
          onClick={handleNext}
          className="gap-2 w-[120px]"
        >
          {currentStep < STEPS.length - 1 ? 'Next' : 'Submit'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}