import { useState } from 'react';
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
import { CheckCircle2, XCircle, Circle } from 'lucide-react';
import { toast } from 'sonner';

const nocaFormSchema = z.object({
  bankName1: z.string().min(2, 'Bank name is required'),
  accountName1: z.string().min(2, 'Account name is required'),
  accountNumber1: z.string().min(5, 'Account number is required'),
  ifsCode1: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFS Code format'),
  bankName2: z.string().min(2, 'Bank name is required'),
  accountName2: z.string().min(2, 'Account name is required'),
  accountNumber2: z.string().min(5, 'Account number is required'),
  ifsCode2: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFS Code format'),
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGradientAnimation, setShowGradientAnimation] = useState(true);

  const form = useForm<NOCAFormValues>({
    resolver: zodResolver(nocaFormSchema),
    defaultValues: {
      bankName1: 'Axis Bank',
      accountName1: 'AARNA XP PRIVATE LIMITED ONDC SELLER NP ACCOUNT',
      accountNumber1: '925020000743',
      ifsCode1: 'UTIB0000743',
      bankName2: 'ICICI Bank',
      accountName2: 'AARNA XP PRIVATE LIMITED',
      accountNumber2: '059805756992',
      ifsCode2: 'KKBK0000568',
    },
  });

  const onSubmit = async (data: NOCAFormValues) => {
    console.log('NOCA Form Data:', data);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    toast.success('NOCA Details submitted successfully!');
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          NOCA (Nodal Account) Details
        </h2>
        <p className="text-muted-foreground">
          Enter your bank account details for NBBL settlement
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ScrollArea className="h-[calc(100vh-300px)] pr-4">
            <div className="space-y-8">
              {/* Account 1 */}
              <div className="glass-card rounded-2xl p-6 border border-white/20 space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-primary">Account 1</h3>
                
                <FormField
                  control={form.control}
                  name="bankName1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter bank name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountName1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name as per Bank Account</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ifsCode1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFS Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter IFS code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Account 2 */}
              <div className="glass-card rounded-2xl p-6 border border-white/20 space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-primary">Account 2</h3>
                
                <FormField
                  control={form.control}
                  name="bankName2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter bank name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountName2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name as per Bank Account</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ifsCode2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFS Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter IFS code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex items-center justify-end px-4">
              <Button 
                type="submit" 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Submit NOCA Details
              </Button>
            </div>
          </ScrollArea>
        </form>
      </Form>
    </div>
  );
}
