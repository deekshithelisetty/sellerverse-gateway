import { useState, useEffect } from 'react';
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
import { CheckCircle2, ChevronRight, Circle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
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
  { title: 'Network Configuration', fields: ['subscriberId'] },
  { title: 'Location Information', fields: ['city', 'state', 'zip', 'stdCode', 'country'] },
];

interface ONDCRegistrationFormProps {
  showBenefits?: boolean;
  setShowBenefits?: (show: boolean) => void;
}

// Progress tracking data structure
const initialProgressSections = [
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
      return (
        <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center animate-pulse">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
      );
    case 'in-progress':
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#FF6B9D] flex items-center justify-center relative">
          <div className="absolute w-2 h-2 rounded-full bg-white animate-ping" style={{ animationDuration: '1.5s' }}></div>
          <div className="w-2 h-2 rounded-full bg-white" style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))' }}></div>
        </div>
      );
    case 'rejected':
      return (
        <div className="w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center animate-pulse">
          <XCircle className="w-5 h-5 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }} />
        </div>
      );
    default:
      return <Circle className="w-5 h-5 text-muted-foreground" />;
  }
};

export function ONDCRegistrationForm({ showBenefits, setShowBenefits }: ONDCRegistrationFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [showGradientAnimation, setShowGradientAnimation] = useState(true);
  const [progressSections, setProgressSections] = useState(initialProgressSections);

  // Timer to stop gradient animation after 3 seconds
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setShowGradientAnimation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  // Auto-completion animation for testing (5 seconds)
  useEffect(() => {
    if (isSubmitted) {
      // Collect all incomplete items
      const allItems: Array<{ sectionIdx: number; itemIdx: number }> = [];
      progressSections.forEach((section, sectionIdx) => {
        section.items.forEach((item, itemIdx) => {
          if (item.status !== 'completed') {
            allItems.push({ sectionIdx, itemIdx });
          }
        });
      });

      // Calculate interval (5000ms / number of items)
      const interval = 5000 / allItems.length;

      // Complete items one by one
      allItems.forEach((item, index) => {
        setTimeout(() => {
          setProgressSections(prevSections => {
            const newSections = JSON.parse(JSON.stringify(prevSections));
            newSections[item.sectionIdx].items[item.itemIdx].status = 'completed';
            return newSections;
          });
        }, interval * (index + 1));
      });
    }
  }, [isSubmitted]);

  // Calculate overall progress from all sections
  const calculateOverallProgress = () => {
    const totalItems = progressSections.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = progressSections.reduce(
      (sum, section) => sum + section.items.filter(item => item.status === 'completed').length,
      0
    );
    return (completedItems / totalItems) * 100;
  };

  const overallProgress = calculateOverallProgress();
  const isFullyCompleted = overallProgress === 100;

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
      gstNo: '29ABCDE1234F1Z5',
      city: 'Bangalore',
      state: 'Karnataka',
      zip: '560001',
      stdCode: '080',
      country: 'India',
    },
  });

  // Calculate progress based on completed steps (25% per step)
  const calculateProgress = () => {
    if (isSubmitted) return 100;
    return (completedSteps / STEPS.length) * 100;
  };

  // Get current glow color based on progress
  const getGlowColor = () => {
    const progress = calculateProgress();
    if (progress <= 33) return '0 0 20px rgba(255, 153, 51, 0.8)'; // Orange
    if (progress <= 66) return '0 0 20px rgba(255, 255, 255, 0.8)'; // White
    return '0 0 20px rgba(34, 197, 94, 0.8)'; // Green
  };

  const getCurrentColor = () => {
    const progress = calculateProgress();
    if (progress <= 33) return '#FF9933'; // Orange
    if (progress <= 66) return '#FFFFFF'; // White
    return '#22C55E'; // Green
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
        setCompletedSteps(prev => prev + 1);
        setCurrentStep(prev => prev + 1);
      } else {
        setCompletedSteps(STEPS.length);
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
        <div className="text-center space-y-6 max-w-3xl">
          <div className="space-y-2">
            <h2 className="text-5xl font-bold flex items-center justify-center gap-3 whitespace-nowrap">
              <span className="text-[#FF9933]" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 153, 51, 0.8))' }}>
                Onboard
              </span>
              {/* Ashoka Chakra Icon with Rotation */}
              <svg className="animate-spin-slow" width="32" height="32" viewBox="0 0 40 40">
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
              <span className="text-white" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))' }}>
                with
              </span>
              <span className="text-[#22C55E]" style={{ filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))' }}>
                ONDC
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">
              empowering Indian businesses, strengthening 'Made in India'
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            size="lg"
            className="text-lg px-8 py-6 rounded-xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90 text-white shadow-lg transition-all duration-300"
          >
            Start Onboarding
          </Button>
        </div>
      </div>
    );
  }

  // After submission - Progress Tracking or Completion Screen
  if (isSubmitted) {
    // Show completion screen if 100% complete
    if (isFullyCompleted) {
      return (
        <div className="h-full flex items-center justify-center relative overflow-hidden">
          {/* Success message */}
          <div className="text-center space-y-6 max-w-2xl px-8 z-10">
            <div className="mb-8">
              {/* Rotating Ashoka Chakra - White and Blue */}
              <svg className="animate-spin-slow w-24 h-24 mx-auto mb-6" viewBox="0 0 40 40">
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
              <h2 className="text-5xl font-bold mb-4">
                <span 
                  className="text-[#22C55E] animate-pulse"
                  style={{ 
                    filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.9))',
                  }}
                >
                  Congratulations!
                </span>
              </h2>
            </div>
            <p className="text-xl leading-relaxed">
              <span className="font-bold text-[#FF9933]">You have successfully subscribed to ONDC!</span>
              <br />
              <span className="text-muted-foreground">
                All your catalogs will now be published automatically on the ONDC network.
              </span>
            </p>
          </div>
        </div>
      );
    }

    // Progress tracking screen
    return (
      <div className="h-full flex flex-col">
        {/* Header with progress bar */}
        <div className="mb-6 flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">
              {showGradientAnimation ? (
                <span 
                  className="inline-block animate-gradient-flow bg-gradient-to-r from-[#FF9933] via-white to-[#22C55E] bg-clip-text text-transparent"
                  style={{ 
                    backgroundSize: '200% 100%',
                  }}
                >
                  ONDC Onboarding Progress Tracking
                </span>
              ) : (
                <>
                  <span className="text-[#FF9933]">ONDC</span>{' '}
                  <span className="text-white">Onboarding</span>{' '}
                  <span className="text-[#22C55E]">Progress Tracking</span>
                </>
              )}
            </h2>
            <p className="text-muted-foreground">Track your progress across different environments</p>
          </div>

          {/* Progress bar - top right */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <span className="text-xs font-medium text-muted-foreground">Onboarding Progress</span>
            <div className="w-64 h-10 rounded-full bg-secondary/20 border border-white/10 overflow-hidden relative">
              <div 
                className="h-full transition-all duration-500 ease-out rounded-full flex items-center justify-center"
                style={{ 
                  width: `${overallProgress}%`,
                  background: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #22C55E 100%)',
                  boxShadow: '0 0 20px rgba(255, 153, 51, 0.4)'
                }}
              >
                <span className="text-sm font-bold text-gray-800 px-2 drop-shadow-sm">
                  {Math.round(overallProgress)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-4">
            {progressSections.map((section, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border-white/20 space-y-4">
                <h3 className="text-lg font-bold mb-4">
                  {showGradientAnimation ? (
                    <span 
                      className="inline-block animate-gradient-flow bg-gradient-to-r from-[#FF9933] via-white to-[#22C55E] bg-clip-text text-transparent"
                      style={{ 
                        backgroundSize: '200% 100%',
                      }}
                    >
                      {section.title}
                    </span>
                  ) : (
                    <>
                      <span className="text-[#FF9933]">{section.title.split(' ')[0]}</span>{' '}
                      <span className="text-white">{section.title.split(' ').slice(1, -1).join(' ')}</span>{' '}
                      <span className="text-[#22C55E]">{section.title.split(' ').slice(-1)}</span>
                    </>
                  )}
                </h3>
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
      {/* Fixed Header with Progress Bar on Right */}
      <div className="mb-4 flex justify-between items-start gap-4">
        <div className="flex-1">
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
            <span>
              <span className="text-[#FF9933]">NDC</span>{' '}
              <span className="text-[#22C55E]">Registration</span>
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
          </p>
        </div>

        {/* Profile Completion Progress Bar - Top Right - Only show after first step */}
        {completedSteps > 0 && (
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-xs font-medium text-muted-foreground">Profile Completion</span>
            <div className="w-64 h-10 rounded-full bg-secondary/20 border border-white/10 overflow-hidden relative">
              <div 
                className="h-full transition-all duration-500 ease-out rounded-full flex items-center justify-center"
                style={{ 
                  width: `${calculateProgress()}%`,
                  background: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #22C55E 100%)',
                  boxShadow: '0 0 20px rgba(255, 153, 51, 0.4)'
                }}
              >
                <span className="text-sm font-bold text-gray-800 px-2 drop-shadow-sm">
                  {Math.round(calculateProgress())}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full pr-4">
          <Form {...form}>
            <form className="space-y-6">
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
              
              {/* Navigation Buttons - Inside ScrollArea, after form content */}
              <div className="pt-6 pb-4 flex items-center justify-end gap-2">
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
            </form>
          </Form>
        </ScrollArea>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes float-paper {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-paper {
          animation: float-paper 5s ease-in infinite;
        }
      `}</style>
    </div>
  );
}