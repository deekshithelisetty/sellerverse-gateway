import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

// List of major Indian banks
const INDIAN_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Bank of India',
  'Indian Bank',
  'Central Bank of India',
  'IDBI Bank',
  'UCO Bank',
  'Yes Bank',
  'IndusInd Bank',
  'Federal Bank',
  'IDFC First Bank',
  'RBL Bank',
  'South Indian Bank',
  'Karur Vysya Bank',
  'City Union Bank',
  'Jammu & Kashmir Bank',
  'DCB Bank',
  'Bandhan Bank',
  'HSBC Bank',
  'Citibank',
  'Deutsche Bank',
  'Standard Chartered Bank',
  'Barclays Bank',
].sort();

const nocaFormSchema = z.object({
  companyBankName: z.string().min(1, 'Bank name is required'),
  companyAccountName: z.string().min(2, 'Account name is required').max(200, 'Account name is too long'),
  companyAccountNumber: z.string().min(8, 'Account number must be at least 8 digits').max(18, 'Account number is too long'),
  companyIfsCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFS Code format (e.g., SBIN0001234)'),
  nocaBankName: z.string().min(1, 'Bank name is required'),
  nocaAccountName: z.string().min(2, 'Account name is required').max(200, 'Account name is too long'),
  nocaAccountNumber: z.string().min(8, 'Account number must be at least 8 digits').max(18, 'Account number is too long'),
  nocaIfsCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFS Code format (e.g., SBIN0001234)'),
});

type NOCAFormValues = z.infer<typeof nocaFormSchema>;

// Progress tracking data structure for NBBL
const nbblProgressSections = [
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

export function NBBLRegistrationForm() {
  const [showIntro, setShowIntro] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGradientAnimation, setShowGradientAnimation] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(true);

  const form = useForm<NOCAFormValues>({
    resolver: zodResolver(nocaFormSchema),
    defaultValues: {
      companyBankName: '',
      companyAccountName: '',
      companyAccountNumber: '',
      companyIfsCode: '',
      nocaBankName: '',
      nocaAccountName: '',
      nocaAccountNumber: '',
      nocaIfsCode: '',
    },
  });

  useEffect(() => {
    // Simulate form loading animation
    if (!showIntro && !isSubmitted) {
      const timer = setTimeout(() => {
        setIsFormLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showIntro, isSubmitted]);

  const onSubmit = async (data: NOCAFormValues) => {
    console.log('NOCA Form Data:', data);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    toast.success('NOCA Details submitted successfully!');
  };

  if (showIntro) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-2xl mx-auto text-center space-y-6 p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            NBBL Settlement Agency
          </h1>
          <div className="space-y-4 text-muted-foreground text-lg">
            <p>
              NBBL (National Banking and Bill Payments Layer) Settlement Agency manages the settlement and reconciliation of payments across the ONDC network.
            </p>
            <p>
              Register your Nodal Account (NOCA) details to enable seamless payment settlements and ensure secure transaction processing for your business operations.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => setShowIntro(false)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-8"
          >
            Start NBBL Onboarding
          </Button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    setTimeout(() => setShowGradientAnimation(false), 100);

    return (
      <div className="space-y-8">
        {/* Rainbow gradient animation */}
        {showGradientAnimation && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 opacity-30 animate-[gradient_3s_ease-in-out]" 
                 style={{
                   backgroundSize: '200% 200%',
                   animation: 'gradient 3s ease-in-out forwards'
                 }} 
            />
          </div>
        )}

        {/* Success Message */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22C55E] to-[#10B981] flex items-center justify-center shadow-2xl animate-scale-in">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#22C55E] to-[#10B981] bg-clip-text text-transparent">
            NOCA Details Submitted Successfully!
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your Nodal Account details have been submitted. Track the progress of your NBBL integration below.
          </p>
        </div>

        {/* Progress Sections */}
        <div className="space-y-6 mt-12">
          {nbblProgressSections.map((section, sectionIndex) => (
            <div 
              key={sectionIndex}
              className="glass-card rounded-2xl p-6 border border-white/20 animate-fade-in"
              style={{ animationDelay: `${sectionIndex * 0.1}s` }}
            >
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 hover:bg-background/70 transition-all"
                  >
                    <StatusIcon status={item.status} />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{item.status.replace('-', ' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isFormLoading ? 0 : 1, y: isFormLoading ? -10 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="text-center space-y-2 flex-shrink-0 mb-4"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          NOCA (Nodal) Account Registration
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your company and nodal account details for NBBL settlement
        </p>
      </motion.div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto pr-2">
            <div className="space-y-4">
              {/* Company Account Information and NOCA Account Information in two columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                {/* Company Account Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: isFormLoading ? 0 : 1, x: isFormLoading ? -20 : 0, scale: isFormLoading ? 0.95 : 1 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="glass-card rounded-2xl p-4 border border-white/20 space-y-2.5"
                >
                  <h3 className="text-lg font-semibold mb-2 text-primary">Company Account Information</h3>
                
                <FormField
                  control={form.control}
                  name="companyBankName"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm">Bank Name <span className="text-destructive">*</span></FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {INDIAN_BANKS.map((bank) => (
                            <SelectItem key={bank} value={bank}>
                              {bank}
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
                  name="companyAccountName"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm">Name as per Bank Account <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account holder name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyAccountNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm">Account Number <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyIfsCode"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm">IFS Code <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., SBIN0001234" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </motion.div>

                {/* NOCA (Nodal) Account Information */}
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: isFormLoading ? 0 : 1, x: isFormLoading ? 20 : 0, scale: isFormLoading ? 0.95 : 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className="glass-card rounded-2xl p-4 border border-white/20 space-y-2.5"
                >
                  <h3 className="text-lg font-semibold mb-2 text-primary">NOCA (Nodal) Account Information</h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isFormLoading ? 0 : 1, y: isFormLoading ? 10 : 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <FormField
                      control={form.control}
                      name="nocaBankName"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-sm">Bank Name <span className="text-destructive">*</span></FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select bank name" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[200px]">
                              {INDIAN_BANKS.map((bank) => (
                                <SelectItem key={bank} value={bank}>
                                  {bank}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isFormLoading ? 0 : 1, y: isFormLoading ? 10 : 0 }}
                    transition={{ duration: 0.4, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <FormField
                      control={form.control}
                      name="nocaAccountName"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-sm">Name as per Bank Account <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account holder name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isFormLoading ? 0 : 1, y: isFormLoading ? 10 : 0 }}
                    transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <FormField
                      control={form.control}
                      name="nocaAccountNumber"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-sm">Account Number <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isFormLoading ? 0 : 1, y: isFormLoading ? 10 : 0 }}
                    transition={{ duration: 0.4, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <FormField
                      control={form.control}
                      name="nocaIfsCode"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-sm">IFS Code <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., SBIN0001234" 
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Submit Button - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isFormLoading ? 0 : 1, y: isFormLoading ? 10 : 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="pt-4 flex items-center justify-center border-t border-white/10 flex-shrink-0"
          >
            <Button 
              type="submit" 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Submit NOCA Details
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
}
