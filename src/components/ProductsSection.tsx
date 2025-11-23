import { Link2, Palette, ShoppingCart, BarChart3, Calendar, Mail, Globe, Zap } from "lucide-react";
import { GlareCard } from "@/components/ui/glare-card";

const ProductsSection = () => {
  const features = [
    {
      icon: Link2,
      title: "Link Management",
      description: "Unlimited links with drag-and-drop ordering, featured pins, auto metadata fetching, and custom icons",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Palette,
      title: "Themes",
      description: "AI-powered theme generator, custom colors, fonts, backgrounds, and drag-and-drop builder",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: ShoppingCart,
      title: "Monetization & Commerce",
      description: "Commerce store, booking services, affiliate links, product and experiences showcases - all in one place",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: BarChart3,
      title: "Analytics & Integrations",
      description: "Detailed visitor tracking, link performance, geographic data, device insights, and export capabilities",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Calendar,
      title: "Booking & Scheduling",
      description: "Accept appointments, manage availability, send reminders, and sync with your calendar",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Mail,
      title: "Marketing",
      description: "Build your list, subscriptions, create campaigns, automate sequences, and engage your audience",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Globe,
      title: "Social Integrations",
      description: "Connect Instagram, Facebook, YouTube, TikTok, X, Snapchat and more to showcase your content",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "AI-Powered Tools",
      description: "Auto-generate themes, content suggestions, email templates, and optimize your page for conversions",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="products" className="relative pt-8 pb-16 px-6 overflow-hidden" style={{ scrollMarginTop: '4rem' }}>
      {/* Vibrant background matching PricingSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-t-[3rem] rounded-b-[3rem]"></div>
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-pink-200 to-purple-300 rounded-full blur-3xl opacity-70 animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full blur-3xl opacity-50 animate-pulse" style={{
        animationDelay: '2s'
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            Powerful features designed to help creators, entrepreneurs, and businesses grow their digital presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-4">
          {features.map((feature, index) => (
            <GlareCard 
              key={index}
              className="glass-card rounded-2xl p-6 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </GlareCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
