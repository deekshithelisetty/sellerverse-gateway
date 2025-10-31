import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AppSidebar } from '@/components/AppSidebar';
import { ONDCRegistrationForm } from '@/components/ONDCRegistrationForm';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Ultra bright vibrant gradient background - same as hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200"></div>
      
      {/* Luminous animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-pink-200 to-purple-300 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Fixed Header - Same as hero page */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-full px-6 py-2 flex items-center justify-between backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <h1 className="text-2xl font-bold tracking-tight">SELLER TSP</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="/#products" className="text-sm font-medium hover:text-primary transition-colors">
                Products
              </a>
              <a href="/#creators" className="text-sm font-medium hover:text-primary transition-colors">
                Creators
              </a>
              <a href="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="/#ondc" className="text-sm font-medium hover:text-primary transition-colors">
                ONDC
              </a>
              <a href="/#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </a>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-white/10">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.email || user.phone}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card border-white/20">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Seller Account</p>
                    <p className="text-xs text-muted-foreground">{user.email || user.phone}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main Content Area with padding */}
      <div className="relative z-10 pt-24 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-[3rem] p-8 relative overflow-hidden border border-white/20">
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>

            {/* Content Grid: Left Sidebar + Right Content */}
            <div className="relative grid lg:grid-cols-[200px_1fr] gap-6">
              {/* Left Sidebar - Menu */}
              <aside className="space-y-2">
                <AppSidebar />
              </aside>

              {/* Right Content Area with Scroll */}
              <ScrollArea className="h-[calc(100vh-200px)]">
                <main className="pr-4">
                  <Routes>
                  <Route index element={
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                        <p className="text-muted-foreground">Here's a snapshot of your seller platform today.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Dashboard Overview</h3>
                        <div className="grid gap-6 md:grid-cols-3">
                          <div className="glass-card p-6 rounded-2xl border-white/20 hover:scale-105 transition-transform">
                            <p className="text-sm text-muted-foreground mb-2">Total Sellers</p>
                            <h3 className="text-4xl font-bold">1,257</h3>
                          </div>
                          <div className="glass-card p-6 rounded-2xl border-white/20 hover:scale-105 transition-transform">
                            <p className="text-sm text-muted-foreground mb-2">Pending Verification</p>
                            <h3 className="text-4xl font-bold">82</h3>
                          </div>
                          <div className="glass-card p-6 rounded-2xl border-white/20 hover:scale-105 transition-transform">
                            <p className="text-sm text-muted-foreground mb-2">Monthly Growth</p>
                            <h3 className="text-4xl font-bold text-green-500">+15.3%</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  } />
                  <Route path="ondc" element={
                    <div>
                      <ONDCRegistrationForm />
                    </div>
                  } />
                  <Route path="experiences" element={
                    <div>
                      <h2 className="text-3xl font-bold mb-6">Experiences</h2>
                      <p className="text-muted-foreground">Create and manage customer experiences.</p>
                    </div>
                  } />
                  <Route path="retail" element={
                    <div>
                      <h2 className="text-3xl font-bold mb-6">Retail Management</h2>
                      <p className="text-muted-foreground">Manage your retail operations and inventory.</p>
                    </div>
                  } />
                  <Route path="settings" element={
                    <div>
                      <h2 className="text-3xl font-bold mb-6">Settings</h2>
                      <p className="text-muted-foreground">Configure your account and preferences.</p>
                    </div>
                  } />
                  </Routes>
                </main>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}