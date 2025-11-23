import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const { heroPageLogo } = useSettings();
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const footerLinks = {
    product: [
      { name: "Link Management", href: "#products" },
      { name: "Themes", href: "#products" },
      { name: "Analytics", href: "#products" },
      { name: "Commerce", href: "#products" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press Kit", href: "#" },
      { name: "Blog", href: "#" },
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Community", href: "#" },
      { name: "Support", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Compliance", href: "#" },
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  useEffect(() => {
    const element = footerRef.current;
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

  return (
    <footer ref={footerRef} className={`relative py-12 px-6 overflow-hidden transition-all duration-700 ease-out ${
      isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-8'
    }`}>
      {/* Gradient Background matching hero */}
      <div className="absolute inset-0 gradient-mesh rounded-t-[3rem]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-t-[3rem]"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Main Footer Content */}
        <div className="glass-card rounded-3xl p-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                {heroPageLogo ? (
                  <img src={heroPageLogo} alt="Hero Page Logo" className="h-8 w-auto object-contain" />
                ) : (
                  <>
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                    <h3 className="text-2xl font-bold">SELLER TSP</h3>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Empowering businesses on the Open Network for Digital Commerce. Join the revolution of inclusive e-commerce.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full glass border border-primary/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-foreground">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} SELLER TSP. All rights reserved. Built on ONDC.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Accessibility
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sitemap
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Status
              </a>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Powered by Tabhi Group of Companies • Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;