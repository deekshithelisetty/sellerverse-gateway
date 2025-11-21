import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Google G Logo Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <div className="inline-flex items-center justify-center bg-white rounded-full w-5 h-5 shrink-0">
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  </div>
);

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signInPhoneOTP, setSignInPhoneOTP] = useState('');
  const [signInEmailOTP, setSignInEmailOTP] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const [formLoaded, setFormLoaded] = useState(false);
  const { signUp, signInWithGoogle, signInWithOTP } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Reset form loaded state when tab changes or dialog opens
  useEffect(() => {
    if (open) {
      setFormLoaded(false);
      // Small delay to allow dialog to render, then trigger animation
      const timer = setTimeout(() => {
        setFormLoaded(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setFormLoaded(false);
    }
  }, [activeTab, open]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword !== signUpConfirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    try {
      await signUp(signUpEmail, signUpPhone, signUpPassword);
      toast({ title: 'Success', description: 'Account created successfully!' });
      onOpenChange(false);
      navigate('/dashboard');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create account', variant: 'destructive' });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      toast({ title: 'Success', description: 'Signed in with Google!' });
      onOpenChange(false);
      navigate('/dashboard');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to sign in with Google', variant: 'destructive' });
    }
  };

  const handlePhoneOTPSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithOTP(signInPhoneOTP);
      toast({ title: 'Success', description: 'Signed in successfully!' });
      onOpenChange(false);
      navigate('/dashboard');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to sign in', variant: 'destructive' });
    }
  };

  const handleEmailOTPSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithOTP(signInEmailOTP);
      toast({ title: 'Success', description: 'Signed in successfully!' });
      onOpenChange(false);
      navigate('/dashboard');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to sign in', variant: 'destructive' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`sm:max-w-[420px] ${activeTab === 'signup' ? 'max-h-[95vh]' : 'max-h-[85vh]'} ${activeTab === 'signup' ? 'overflow-hidden' : 'overflow-y-auto'} border-2 border-transparent backdrop-blur-xl shadow-2xl rounded-2xl transition-all duration-700 ${
          activeTab === 'signup' 
            ? 'signup-gradient-rich' 
            : 'experience-gradient-bg'
        }`}
      >
        <DialogHeader className={activeTab === 'signup' ? 'pb-2' : ''}>
          <DialogTitle className={`${activeTab === 'signup' ? 'text-xl' : 'text-2xl'} font-bold text-white`}>Seller Portal</DialogTitle>
          <DialogDescription className={`text-white/80 ${activeTab === 'signup' ? 'text-sm' : ''}`}>
            Sign in or create your seller account
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
            <TabsTrigger value="signin" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="space-y-2">
            <form onSubmit={handleSignUp} className="space-y-2">
              <div 
                className={`space-y-1 transition-all duration-500 ease-out ${
                  formLoaded && activeTab === 'signup'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: formLoaded && activeTab === 'signup' ? '0.1s' : '0s' }}
              >
                <Label htmlFor="signup-email" className="text-white text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seller@example.com"
                    className="pl-10 h-9 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50 transition-all duration-300 text-sm"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div 
                className={`space-y-1 transition-all duration-500 ease-out ${
                  formLoaded && activeTab === 'signup'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: formLoaded && activeTab === 'signup' ? '0.2s' : '0s' }}
              >
                <Label htmlFor="signup-phone" className="text-white text-sm">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+1234567890"
                    className="pl-10 h-9 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50 transition-all duration-300 text-sm"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div 
                className={`space-y-1 transition-all duration-500 ease-out ${
                  formLoaded && activeTab === 'signup'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: formLoaded && activeTab === 'signup' ? '0.3s' : '0s' }}
              >
                <Label htmlFor="signup-password" className="text-white text-sm">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-9 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50 transition-all duration-300 text-sm"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div 
                className={`space-y-1 transition-all duration-500 ease-out ${
                  formLoaded && activeTab === 'signup'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: formLoaded && activeTab === 'signup' ? '0.4s' : '0s' }}
              >
                <Label htmlFor="signup-confirm-password" className="text-white text-sm">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-9 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50 transition-all duration-300 text-sm"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div 
                className={`transition-all duration-500 ease-out ${
                  formLoaded && activeTab === 'signup'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: formLoaded && activeTab === 'signup' ? '0.5s' : '0s' }}
              >
                <Button type="submit" className="w-full h-9 bg-white/20 hover:bg-white/30 text-white border-0 transition-all duration-400 text-sm">
                  Create Account
                </Button>
              </div>
            </form>

            <div 
              className={`relative transition-all duration-500 ease-out ${
                formLoaded && activeTab === 'signup'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: formLoaded && activeTab === 'signup' ? '0.6s' : '0s' }}
            >
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white/60">Or</span>
              </div>
            </div>

            <div 
              className={`transition-all duration-500 ease-out ${
                formLoaded && activeTab === 'signup'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: formLoaded && activeTab === 'signup' ? '0.7s' : '0s' }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/10 border-white/30 hover:bg-white/20 transition-all duration-400 text-white google-button-hover"
                onClick={handleGoogleSignUp}
              >
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signin" className="space-y-3">
            <div className="space-y-3">
              <form onSubmit={handlePhoneOTPSignIn} className="space-y-3">
                <div 
                  className={`space-y-2 transition-all duration-500 ease-out ${
                    formLoaded && activeTab === 'signin'
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: formLoaded && activeTab === 'signin' ? '0.1s' : '0s' }}
                >
                  <Label htmlFor="signin-phone" className="text-white">Phone OTP Sign In</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="signin-phone"
                      type="tel"
                      placeholder="+1234567890"
                      className="pl-10 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50 transition-all duration-300"
                      value={signInPhoneOTP}
                      onChange={(e) => setSignInPhoneOTP(e.target.value)}
                    />
                  </div>
                </div>
                <div 
                  className={`transition-all duration-500 ease-out ${
                    formLoaded && activeTab === 'signin'
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: formLoaded && activeTab === 'signin' ? '0.2s' : '0s' }}
                >
                  <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white border-0 transition-all duration-400">
                    Send OTP to Phone
                  </Button>
                </div>
              </form>

              <div 
                className={`relative transition-all duration-500 ease-out ${
                  formLoaded && activeTab === 'signin'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: formLoaded && activeTab === 'signin' ? '0.3s' : '0s' }}
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-white/60">Or</span>
                </div>
              </div>

              <form onSubmit={handleEmailOTPSignIn} className="space-y-3">
                <div 
                  className={`space-y-2 transition-all duration-500 ease-out ${
                    formLoaded && activeTab === 'signin'
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: formLoaded && activeTab === 'signin' ? '0.4s' : '0s' }}
                >
                  <Label htmlFor="signin-email" className="text-white">Email OTP Sign In</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="seller@example.com"
                      className="pl-10 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50 transition-all duration-300"
                      value={signInEmailOTP}
                      onChange={(e) => setSignInEmailOTP(e.target.value)}
                    />
                  </div>
                </div>
                <div 
                  className={`transition-all duration-500 ease-out ${
                    formLoaded && activeTab === 'signin'
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: formLoaded && activeTab === 'signin' ? '0.5s' : '0s' }}
                >
                  <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white border-0 transition-all duration-400">
                    Send OTP to Email
                  </Button>
                </div>
              </form>

              <div 
                className={`relative transition-all duration-500 ease-out ${
                  formLoaded && activeTab === 'signin'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: formLoaded && activeTab === 'signin' ? '0.6s' : '0s' }}
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-white/60">Or</span>
                </div>
              </div>

              <div 
                className={`transition-all duration-500 ease-out ${
                  formLoaded && activeTab === 'signin'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: formLoaded && activeTab === 'signin' ? '0.7s' : '0s' }}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-white/10 border-white/30 hover:bg-white/20 transition-all duration-400 text-white google-button-hover"
                  onClick={handleGoogleSignUp}
                >
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}