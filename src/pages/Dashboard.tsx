import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { AppSidebar } from '@/components/AppSidebar';
import { ONDCRegistrationForm } from '@/components/ONDCRegistrationForm';
import { ONDCBenefits } from '@/components/ONDCBenefits';
import Experiences from '@/pages/Experiences';
import Settings from '@/pages/Settings';
import NBBLSettlement from '@/pages/NBBLSettlement';
import Profile from '@/pages/Profile';
import Hookpoint from '@/pages/Hookpoint';
import CategoryManagement from '@/pages/CategoryManagement';
import SubcategoryProducts from '@/pages/SubcategoryProducts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LogOut, User, TrendingUp, TrendingDown, Users, ShoppingBag, Package, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="space-y-6 pb-0"> 
      <div className="animate-fade-in-up" style={{ animationDelay: '0s' }}>
        <h2 className="text-3xl font-bold mb-2" style={{ background: 'linear-gradient(to right, #2E3192, #1BFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dashboard</h2>
        <p className="text-muted-foreground">Here's a snapshot of your seller platform today.</p>
      </div>

      {/* Score Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-white/20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium" style={{ background: 'linear-gradient(to right, #2E3192, #1BFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Total Revenue</CardTitle>
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

        <Card className="glass-card border-white/20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium" style={{ background: 'linear-gradient(to right, #2E3192, #1BFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Total Sellers</CardTitle>
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

        <Card className="glass-card border-white/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium" style={{ background: 'linear-gradient(to right, #2E3192, #1BFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pending Orders</CardTitle>
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

        <Card className="glass-card border-white/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium" style={{ background: 'linear-gradient(to right, #2E3192, #1BFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Active Products</CardTitle>
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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Bar Chart */}
        <Card className="glass-card border-white/20 min-w-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle style={{ background: 'linear-gradient(to right, #2E3192, #1BFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sales & Orders Overview</CardTitle>
            <CardDescription>Monthly sales and order statistics</CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={barChartData} width={undefined} height={undefined}>
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
        <Card className="glass-card border-white/20 min-w-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle style={{ background: 'linear-gradient(to right, #2E3192, #1BFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Visitor Analytics</CardTitle>
            <CardDescription>Weekly visitor trends</CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={lineChartData} width={undefined} height={undefined}>
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
          <CardTitle style={{ background: 'linear-gradient(to right, #2E3192, #1BFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Recent Activities</CardTitle>
          <CardDescription>Latest updates and actions on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors">
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
    signOut,
    isLoading
  } = useAuth();
  const { brandLogo } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [showONDCBenefits, setShowONDCBenefits] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  useEffect(() => {
    // Only redirect if auth has finished loading and user is still null
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen w-screen overflow-hidden fixed inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Only redirect if user is not authenticated (after loading)
  if (!user) {
    return null;
  }
  return <div className="h-screen w-screen overflow-hidden fixed inset-0">
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
        <div className="w-full mx-auto">
          <div className="glass-card rounded-full px-6 py-2 flex items-center justify-between backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
              {brandLogo ? (
                <img src={brandLogo} alt="Brand Logo" className="h-8 w-auto object-contain" />
              ) : (
                <h1 className="text-2xl font-bold tracking-tight">TABHI</h1>
              )}
            </div>
            
            

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative group cursor-pointer">
                  <Avatar className="h-9 w-9 border-2 border-white/30 shadow-lg ring-2 ring-primary/50 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/70">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-sm">
                      BT
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card border-white/20 !rounded-2xl">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Bhuvan Tummala</p>
                    <p className="text-xs text-muted-foreground">bhuvant@tabhi.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => navigate('/dashboard/profile')}
                  className="hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:backdrop-blur-sm focus:bg-gradient-to-r focus:from-purple-500/20 focus:to-pink-500/20 focus:backdrop-blur-sm transition-all rounded-lg"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:backdrop-blur-sm focus:bg-gradient-to-r focus:from-purple-500/20 focus:to-pink-500/20 focus:backdrop-blur-sm transition-all rounded-lg"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main Content Area with minimal padding */}
      <div className="relative z-10 h-full w-full pt-[4.5rem] px-4 pb-0 box-border flex flex-col">
        <div className="w-full h-full flex-1 min-h-0">
          <div className="glass-card rounded-[3rem] p-2 relative overflow-hidden border border-white/20 h-full w-full flex flex-col">
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>

            {/* Three Section Layout: Left Menu + Center Content + Right Preview */}
            <div className="relative flex gap-2 flex-1 min-h-0 w-full overflow-hidden">
              {/* Left Section - Menu */}
              <aside 
                className={`${!sidebarCollapsed ? 'w-[240px]' : 'w-[80px]'} flex-shrink-0 h-full relative transition-[width] duration-300 ease-in-out`}
              >
                <div className="h-full rounded-2xl border border-white/20 bg-background/30 backdrop-blur-sm shadow-lg p-4 overflow-hidden will-change-contents">
                  <AppSidebar 
                    collapsed={sidebarCollapsed} 
                    onToggle={toggleSidebar} 
                  />
                </div>
                {/* Collapse/Expand Icon Button - Middle right of sidebar */}
                <button
                  onClick={toggleSidebar}
                  className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-background/50 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center hover:bg-background/70"
                  aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-3 h-3 text-black" />
                  ) : (
                    <ChevronLeft className="w-3 h-3 text-black" />
                  )}
                </button>
              </aside>

              {/* Center Section - Main Content */}
              <div className="flex-1 min-w-0 overflow-hidden h-full">
                <div className="h-full rounded-2xl border border-white/20 bg-background/30 backdrop-blur-sm shadow-lg overflow-hidden">
                  <main className="h-full overflow-auto p-3">
                    <Routes>
                      <Route index element={<DashboardContent />} />
                      <Route path="category-management" element={<CategoryManagement />} />
                      <Route path="ondc" element={
                        <ONDCRegistrationForm 
                          showBenefits={showONDCBenefits}
                          setShowBenefits={setShowONDCBenefits}
                        />
                      } />
                      <Route path="nbbl" element={<NBBLSettlement />} />
                      <Route path="experiences" element={
                        <Experiences 
                          showForm={showForm}
                          setShowForm={setShowForm}
                        />
                      } />
                      <Route path="experience" element={
                        <Experiences 
                          showForm={showForm}
                          setShowForm={setShowForm}
                        />
                      } />
                      <Route path="profile" element={<Profile />} />
                      <Route path="retail" element={<div>
                        <h2 className="text-3xl font-bold mb-6">Retail Management</h2>
                        <p className="text-muted-foreground">Manage your retail operations and inventory.</p>
                      </div>} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="hookpoint" element={<Hookpoint />} />
                      <Route path=":categoryId/:subcategoryId" element={<SubcategoryProducts />} />
                    </Routes>
                  </main>
                </div>
              </div>

              {/* Right Section - Preview Panels - Handled by Experiences page itself */}

              {/* Right Section - ONDC Benefits */}
              {location.pathname.includes('/ondc') && showONDCBenefits && (
                <aside className="w-[420px] flex-shrink-0">
                  <div className="h-full rounded-2xl border border-white/20 bg-background/30 backdrop-blur-sm shadow-lg overflow-hidden">
                    <div className="h-full flex flex-col">
                      {/* Collapsible Header */}
                      <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex-1"></div>
                        <h3 className="text-3xl font-bold text-center flex-1 whitespace-nowrap">Why Join ONDC?</h3>
                        <button
                          onClick={() => setShowONDCBenefits(false)}
                          className="flex items-center justify-end flex-1 hover:bg-white/5 transition-colors rounded"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex-1 p-6 overflow-auto animate-fade-in">
                        <ONDCBenefits />
                      </div>
                    </div>
                  </div>
                </aside>
              )}
              {/* Collapsed Panel Toggle */}
              {location.pathname.includes('/ondc') && !showONDCBenefits && (
                <button
                  onClick={() => setShowONDCBenefits(true)}
                  className="w-12 flex-shrink-0 rounded-2xl border border-white/20 bg-background/30 backdrop-blur-sm shadow-lg hover:bg-white/5 transition-colors flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>;
}