import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AppSidebar } from '@/components/AppSidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';

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
    <div className="min-h-screen gradient-mesh relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-white/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">SELLER TSP</h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="glass-card border-white/20">
                    {user.email?.[0].toUpperCase() || 'S'}
                  </AvatarFallback>
                </Avatar>
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
      </header>

      {/* Navigation Menu */}
      <nav className="fixed top-[72px] left-0 right-0 z-40 glass-card border-white/20 px-6 py-3">
        <div className="flex items-center gap-6">
          <AppSidebar />
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 px-4 pb-8">
        <div className="glass-card rounded-3xl p-8 mx-4 border-white/20">
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
        </div>
      </main>
    </div>
  );
}