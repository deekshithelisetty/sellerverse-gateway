import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { AppSidebar } from '@/components/AppSidebar';
import { ONDCRegistrationForm } from '@/components/ONDCRegistrationForm';
import Experiences from '@/pages/Experiences';
import Settings from '@/pages/Settings';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LogOut, User, TrendingUp, TrendingDown, Users, ShoppingBag, Package, Activity } from 'lucide-react';
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Routes, Route } from 'react-router-dom';

// Sample data for charts
const barChartData = [
  { month: 'Jan', sales: 4000, orders: 240 },
  { month: 'Feb', sales: 3000, orders: 198 },
  { month: 'Mar', sales: 5000, orders: 350 },
  { month: 'Apr', sales: 4500, orders: 280 },
  { month: 'May', sales: 6000, orders: 420 },
  { month: 'Jun', sales: 5500, orders: 380 },
];

const lineChartData = [
  { day: 'Mon', visitors: 400 },
  { day: 'Tue', visitors: 300 },
  { day: 'Wed', visitors: 600 },
  { day: 'Thu', visitors: 450 },
  { day: 'Fri', visitors: 700 },
  { day: 'Sat', visitors: 550 },
  { day: 'Sun', visitors: 480 },
];

const recentActivities = [
  { id: 1, action: 'New seller registered', user: 'John Doe', time: '2 minutes ago', icon: Users },
  { id: 2, action: 'Order #1234 completed', user: 'Jane Smith', time: '15 minutes ago', icon: ShoppingBag },
  { id: 3, action: 'Product added to catalog', user: 'Mike Johnson', time: '1 hour ago', icon: Package },
  { id: 4, action: 'ONDC verification completed', user: 'Sarah Williams', time: '2 hours ago', icon: Activity },
  { id: 5, action: 'New seller registered', user: 'Tom Brown', time: '3 hours ago', icon: Users },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--secondary))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--primary))",
  },
};

function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-muted-foreground">Here's a snapshot of your seller platform today.</p>
      </div>

      {/* Score Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,257</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-5.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.7%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Bar Chart */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle>Sales & Orders Overview</CardTitle>
            <CardDescription>Monthly sales and order statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle>Visitor Analytics</CardTitle>
            <CardDescription>Weekly visitor trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="var(--color-visitors)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-visitors)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest updates and actions on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Dashboard() {
  const {
    user,
    signOut
  } = useAuth();
  const { brandLogo } = useSettings();
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
  return <div className="min-h-screen">
      {/* Ultra bright vibrant gradient background - same as hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200"></div>
      
      {/* Luminous animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-pink-200 to-purple-300 rounded-full blur-3xl opacity-70 animate-pulse" style={{
      animationDelay: '1s'
    }}></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full blur-3xl opacity-50 animate-pulse" style={{
      animationDelay: '2s'
    }}></div>
      
      {/* Fixed Header - Same as hero page */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-full px-6 py-2 flex items-center justify-between backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3">
              {brandLogo ? (
                <img src={brandLogo} alt="Brand Logo" className="h-8 w-auto object-contain" />
              ) : null}
              <h1 className="text-2xl font-bold tracking-tight">TABHI</h1>
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
                  <Route index element={<DashboardContent />} />
                  <Route path="ondc" element={<div>
                      <ONDCRegistrationForm />
                    </div>} />
                  <Route path="experiences" element={<Experiences />} />
                  <Route path="retail" element={<div>
                      <h2 className="text-3xl font-bold mb-6">Retail Management</h2>
                      <p className="text-muted-foreground">Manage your retail operations and inventory.</p>
                    </div>} />
                  <Route path="settings" element={<Settings />} />
                  </Routes>
                </main>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>;
}