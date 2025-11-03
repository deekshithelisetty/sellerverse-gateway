import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User, Building2, Phone, Mail, Calendar, Edit, Lock, Bell } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const { user } = useAuth();
  const { interestedCategories } = useSettings();
  const [activeTab, setActiveTab] = useState('all');

  // Mock profile data
  const profileData = {
    name: 'John Smith',
    company: 'TechCorp Solutions Pvt. Ltd.',
    phone: '+91 98765 43210',
    email: user?.email || 'seller@example.com',
    registeredDate: 'January 15, 2024',
  };

  // Mock notifications data
  const notifications = {
    all: [
      { id: 1, title: 'New order received', message: 'Order #1234 has been placed', time: '2 min ago', type: 'info' },
      { id: 2, title: 'Payment processed', message: 'Payment of ₹5,000 received', time: '15 min ago', type: 'success' },
      { id: 3, title: 'Stock low alert', message: 'Product XYZ is running low', time: '1 hour ago', type: 'warning' },
      { id: 4, title: 'New promotion available', message: 'Get 20% off on premium listing', time: '2 hours ago', type: 'promo' },
    ],
    critical: [
      { id: 3, title: 'Stock low alert', message: 'Product XYZ is running low', time: '1 hour ago', type: 'warning' },
    ],
    promotions: [
      { id: 4, title: 'New promotion available', message: 'Get 20% off on premium listing', time: '2 hours ago', type: 'promo' },
    ],
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const categoryGradients = [
    'from-purple-600 via-pink-500 to-purple-700',
    'from-blue-600 via-cyan-500 to-blue-700',
    'from-green-600 via-emerald-500 to-green-700',
    'from-orange-600 via-amber-500 to-orange-700',
    'from-red-600 via-rose-500 to-red-700',
    'from-indigo-600 via-violet-500 to-indigo-700',
  ];

  return (
    <div className="flex gap-4 h-full">
      {/* Left Section - Profile Information */}
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Profile</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Card className="glass-card border-white/20">
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-start gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-4 border-white/20 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-2xl font-bold">
                      {getInitials(profileData.name)}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Edit className="h-6 w-6 text-white" />
                  </motion.div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{profileData.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm">{profileData.company}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone Number</p>
                    <p className="text-sm font-medium">{profileData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email Address</p>
                    <p className="text-sm font-medium">{profileData.email}</p>
                  </div>
                </div>
              </div>

              {/* Registered Categories */}
              {interestedCategories.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-3">Registered Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {interestedCategories.map((category, index) => (
                      <Badge
                        key={category}
                        className={`bg-gradient-to-r ${categoryGradients[index % categoryGradients.length]} text-white border-0 shadow-md px-3 py-1`}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Registered Date */}
              <div className="flex items-center gap-2 text-muted-foreground pt-2 border-t border-white/10">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Member since {profileData.registeredDate}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white hover:opacity-90 transition-all duration-600 shadow-lg hover:shadow-xl hover:scale-105">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2 border-primary/30 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-500 hover:to-purple-700 hover:text-white hover:border-transparent transition-all duration-600 shadow-md hover:shadow-lg hover:scale-105"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Section - Alerts & Notifications */}
      <aside className="w-[420px] flex-shrink-0">
        <Card className="glass-card border-white/20 h-full flex flex-col">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <span className="bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent font-bold">
                Alerts & Notifications
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start gap-2 bg-transparent p-4 border-b border-white/10">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-4 py-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="critical"
                  className="rounded-full px-4 py-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  Critical
                </TabsTrigger>
                <TabsTrigger
                  value="promotions"
                  className="rounded-full px-4 py-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  Promotions
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-auto p-4">
                <TabsContent value="all" className="mt-0 space-y-3">
                  {notifications.all.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-white/10"
                    >
                      <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="critical" className="mt-0 space-y-3">
                  {notifications.critical.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors border border-red-500/30"
                    >
                      <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="promotions" className="mt-0 space-y-3">
                  {notifications.promotions.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors border border-purple-500/30"
                    >
                      <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </motion.div>
                  ))}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
