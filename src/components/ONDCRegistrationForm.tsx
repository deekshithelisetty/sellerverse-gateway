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
import { Shield } from 'lucide-react';
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

export function ONDCRegistrationForm() {
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

  const onSubmit = (data: ONDCFormValues) => {
    console.log('Form submitted:', data);
    toast.success('ONDC Registration submitted successfully!');
  };

  const calculateProgress = () => {
    const values = form.getValues();
    const fields = Object.keys(ondcFormSchema.shape);
    const filledFields = fields.filter(field => {
      const value = values[field as keyof ONDCFormValues];
      return value !== undefined && value !== '' && value !== null;
    });
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">ONDC Registration</h3>
        <p className="text-muted-foreground text-sm">
          Fill in the details below to register on the ONDC network
        </p>
      </div>

      {/* Progress Bar - Indian Flag Colors */}
      <div className="glass-card p-6 rounded-2xl border-white/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Registration Progress</span>
          <span className="text-sm font-bold">{progress}%</span>
        </div>
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full transition-all duration-500 rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, #FF9933 0%, #FFFFFF 50%, #138808 100%)'
            }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="glass-card p-6 rounded-2xl border-white/20 space-y-4">
              <h4 className="font-semibold text-lg">Personal Information</h4>
              
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

            {/* Business Information */}
            <div className="glass-card p-6 rounded-2xl border-white/20 space-y-4">
              <h4 className="font-semibold text-lg">Business Information</h4>

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

            {/* Network Configuration */}
            <div className="glass-card p-6 rounded-2xl border-white/20 space-y-4">
              <h4 className="font-semibold text-lg">Network Configuration</h4>

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

            {/* Location Information */}
            <div className="glass-card p-6 rounded-2xl border-white/20 space-y-4">
              <h4 className="font-semibold text-lg">Location Information</h4>

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

          <Button type="submit" className="w-full gradient-primary text-lg py-6">
            Submit Registration
          </Button>
        </form>
      </Form>
    </div>
  );
}
