import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PricingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const plans = [{
    name: "Starter",
    icon: Zap,
    price: "₹999",
    period: "/month",
    description: "Perfect for getting started on ONDC",
    features: ["Basic store setup", "Up to 50 products", "Standard analytics", "Email support", "Mobile responsive store", "Basic payment integration"],
    gradient: "from-blue-500 to-cyan-500",
    popular: false
  }, {
    name: "Professional",
    icon: Sparkles,
    price: "₹2,499",
    period: "/month",
    description: "Best for growing businesses",
    features: ["Advanced store setup", "Unlimited products", "Advanced analytics & insights", "Priority support 24/7", "Custom branding", "Multiple payment gateways", "Inventory management", "Marketing automation"],
    gradient: "from-purple-500 to-pink-500",
    popular: true
  }, {
    name: "Enterprise",
    icon: Crown,
    price: "Custom",
    period: "",
    description: "For large-scale operations",
    features: ["Full platform customization", "Unlimited everything", "Dedicated account manager", "White-label solution", "API access", "Custom integrations", "Advanced security features", "SLA guarantee"],
    gradient: "from-orange-500 to-rose-500",
    popular: false
  }];

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-80px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <section ref={sectionRef} id="pricing" className="relative pb-16 px-6 overflow-hidden" style={{ scrollMarginTop: '4rem' }}>
      {/* Vibrant background matching hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-t-[3rem] rounded-b-[3rem]"></div>
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-pink-200 to-purple-300 rounded-full blur-3xl opacity-70 animate-pulse" style={{
      animationDelay: '1s'
    }}></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full blur-3xl opacity-50 animate-pulse" style={{
      animationDelay: '2s'
    }}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            Choose the perfect plan for your business. All plans include ONDC platform integration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => {
            let animationClass = '';
            if (isVisible) {
              if (index === 0) {
                animationClass = 'animate-fadeInLeft';
              } else if (index === 2) {
                animationClass = 'animate-fadeInRight';
              } else {
                animationClass = 'animate-fadeInCenter';
              }
            }
            
            return <div key={index} className={`relative group ${plan.popular ? 'md:-mt-8 md:scale-110' : ''} ${animationClass} ${!isVisible ? 'opacity-0' : ''}`}>
              {plan.popular && <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                  <div className="glass-card rounded-full px-4 py-1.5 text-sm font-semibold bg-white/20 border border-white/30">
                    Most Popular
                  </div>
                </div>}
              
              <div className={`glass-card rounded-3xl p-8 h-full hover:scale-105 transition-all duration-300 ${plan.popular ? 'border-2 border-white/40' : ''}`}>
                {/* Icon and Plan name */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>

                {/* CTA Button */}
                <Button className={`w-full mb-8 ${plan.popular ? 'gradient-primary border-0 hover:shadow-lg text-white' : 'glass border-white/20 hover:gradient-primary hover:border-0 hover:shadow-lg text-black'}`} size="lg">
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>)}
                </div>
              </div>
            </div>;
          })}
        </div>

        {/* Money back guarantee */}
        <div className="text-center mt-12">
          
        </div>
      </div>

      <style>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInCenter {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fadeInCenter {
          animation: fadeInCenter 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }
      `}</style>
    </section>;
};
export default PricingSection;