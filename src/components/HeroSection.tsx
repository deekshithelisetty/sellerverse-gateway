import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-3d-element.png";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

const HeroSection = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const services = [
    { icon: Zap, label: "Quick Onboarding", color: "from-blue-500 to-purple-500" },
    { icon: Shield, label: "Secure Integration", color: "from-purple-500 to-pink-500" },
    { icon: TrendingUp, label: "Growth Analytics", color: "from-pink-500 to-rose-500" },
    { icon: Sparkles, label: "Smart Automation", color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-3">
      {/* Ultra bright vibrant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-b-[3rem]"></div>
      
      {/* Luminous animated gradient orbs for enhanced glassy effect */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-pink-200 to-purple-300 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-blue-100 to-pink-200 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="glass-card rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block animate-pulse hover:animate-none">
                <div className="glass px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <span className="text-gradient">✨ Connect to ONDC Platform</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Modern Service Platform —{" "}
                <span className="text-gradient">High-level vision</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Build a premium platform where creators can sell products and experiences, manage profiles, and track analytics—all in one dashboard.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="gradient-primary border-0 hover:shadow-lg hover:scale-105 transition-all text-base px-8 py-6 rounded-2xl group"
                  onClick={() => setAuthDialogOpen(true)}
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="glass border-white/20 hover:bg-white/10 text-base px-8 py-6 rounded-2xl"
                >
                  Learn More
                </Button>
              </div>

              {/* Service Tags */}
              <div className="grid grid-cols-2 gap-3 pt-6">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="glass-card rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer group"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold">{service.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 3D Element */}
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Main 3D Element */}
                <div className="relative rounded-3xl overflow-hidden glow">
                  <img 
                    src={heroImage} 
                    alt="3D Holographic Element" 
                    className="w-full h-full object-contain drop-shadow-2xl animate-float"
                  />
                </div>

                {/* Floating service badges */}
                <div className="absolute top-1/4 -left-4 glass-card rounded-2xl px-4 py-3 animate-float-delayed shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-semibold whitespace-nowrap">ONDC Ready</span>
                  </div>
                </div>

                <div className="absolute bottom-1/4 -right-4 glass-card rounded-2xl px-4 py-3 animate-float shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-xs font-semibold whitespace-nowrap">Instant Setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
      `}</style>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
};

export default HeroSection;
