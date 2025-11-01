import { CheckCircle2, TrendingUp, Users, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const benefits = [
  {
    icon: Globe,
    title: 'Open Network Access',
    description: 'Connect with buyers and sellers across India on a unified digital commerce platform.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    title: 'Increased Reach',
    description: 'Expand your business reach exponentially without geographical limitations.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Level Playing Field',
    description: 'Compete fairly with businesses of all sizes in a democratized marketplace.',
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Transactions',
    description: 'Government-backed secure payment gateway and transaction protection.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Faster Onboarding',
    description: 'Quick and simple registration process to get your business online.',
    gradient: 'from-indigo-500 to-purple-500',
  },
];

const videos = [
  {
    title: 'What is ONDC?',
    thumbnail: '🎥',
    duration: '5:23',
    description: 'Learn the basics of Open Network for Digital Commerce',
  },
  {
    title: 'Getting Started Guide',
    thumbnail: '📚',
    duration: '8:45',
    description: 'Step-by-step guide to register and start selling',
  },
  {
    title: 'Success Stories',
    thumbnail: '⭐',
    duration: '6:12',
    description: 'Real businesses sharing their ONDC journey',
  },
];

export function ONDCBenefits() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">Why Join ONDC?</h3>
        <p className="text-muted-foreground text-sm">
          Discover the benefits of being part of India's open commerce network
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="space-y-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="glass-card p-4 rounded-xl border-white/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1">{benefit.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Videos Section */}
      <div className="pt-4">
        <h4 className="text-lg font-bold mb-3">Educational Resources</h4>
        <div className="space-y-3">
          {videos.map((video, index) => (
            <div
              key={index}
              className="glass-card p-4 rounded-xl border-white/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-500 to-slate-500 flex items-center justify-center text-3xl flex-shrink-0">
                  {video.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="font-semibold text-sm">{video.title}</h5>
                    <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
                      {video.duration}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="glass-card p-6 rounded-xl border-white/20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold mb-2">Ready to Transform Your Business?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Fill out the registration form to join thousands of businesses already thriving on ONDC.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Active network with 50,000+ registered businesses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
