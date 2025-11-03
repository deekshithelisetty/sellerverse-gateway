import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Lock, Chrome } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInPhoneOTP, setSignInPhoneOTP] = useState('');
  const [signInEmailOTP, setSignInEmailOTP] = useState('');
  const { signUp, signInWithGoogle, signInWithOTP } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <DialogContent className="sm:max-w-[420px] max-h-[85vh] overflow-y-auto experience-gradient-bg border-2 border-primary/50 backdrop-blur-xl auth-dialog-glow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Seller Portal</DialogTitle>
          <DialogDescription className="text-white/80">
            Sign in or create your seller account
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
            <TabsTrigger value="signup" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70">Sign Up</TabsTrigger>
            <TabsTrigger value="signin" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70">Sign In</TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="space-y-3">
            <form onSubmit={handleSignUp} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seller@example.com"
                    className="pl-10 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-phone" className="text-white">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+1234567890"
                    className="pl-10 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white border-0 hover:shadow-lg hover:scale-105 transition-all">
                Create Account
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white/60">Or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/10 border-white/30 hover:bg-white/20 hover:scale-105 transition-all text-white"
              onClick={handleGoogleSignUp}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
          </TabsContent>

          <TabsContent value="signin" className="space-y-3">
            <div className="space-y-3">
              <form onSubmit={handlePhoneOTPSignIn} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="signin-phone" className="text-white">Phone OTP Sign In</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="signin-phone"
                      type="tel"
                      placeholder="+1234567890"
                      className="pl-10 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50"
                      value={signInPhoneOTP}
                      onChange={(e) => setSignInPhoneOTP(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white border-0 hover:shadow-lg hover:scale-105 transition-all">
                  Send OTP to Phone
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-white/60">Or</span>
                </div>
              </div>

              <form onSubmit={handleEmailOTPSignIn} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-white">Email OTP Sign In</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="seller@example.com"
                      className="pl-10 bg-white/10 border-white/30 focus:border-white/50 text-white placeholder:text-white/50"
                      value={signInEmailOTP}
                      onChange={(e) => setSignInEmailOTP(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white border-0 hover:shadow-lg hover:scale-105 transition-all">
                  Send OTP to Email
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-white/60">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/10 border-white/30 hover:bg-white/20 hover:scale-105 transition-all text-white"
                onClick={handleGoogleSignUp}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}