import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useNavigate, useLocation } from "react-router-dom";
import AuthDialog from "./AuthDialog";

const Navigation = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { user, signOut } = useAuth();
  const { heroPageLogo } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 65; // Reduced navigation height offset
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = sectionTop - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  const scrollToHome = () => {
    if (location.pathname === '/') {
      scrollToSection("home");
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection("home");
      }, 100);
    }
  };

  useEffect(() => {
    // Function to update active section based on hash
    const updateActiveSection = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash) {
        setActiveSection(hash);
      } else {
        setActiveSection("");
      }
    };

    // Initial check
    updateActiveSection();

    // Listen for hash changes
    window.addEventListener("hashchange", updateActiveSection);

    // Listen for scroll to detect section visibility
    const handleScroll = () => {
      const sections = ["home", "products", "creators", "pricing", "ondc", "contact"];
      const scrollPosition = window.scrollY + 150; // Offset for header

      // Check if we're at the top (home section)
      if (window.scrollY < 300) {
        setActiveSection("home");
        return;
      }

      // Check other sections - find which section is most visible
      let activeSectionFound = "";
      let maxVisibility = 0;

      for (const section of sections) {
        if (section === "home") continue;
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(elementTop, window.scrollY + 150);
          const visibleBottom = Math.min(elementBottom, window.scrollY + window.innerHeight - 150);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibility = visibleHeight / rect.height;

          // If this section is more visible than previous ones, make it active
          if (visibility > maxVisibility && scrollPosition >= elementTop - 200) {
            maxVisibility = visibility;
            activeSectionFound = section;
          }
        }
      }

      if (activeSectionFound) {
        setActiveSection(activeSectionFound);
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", updateActiveSection);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card rounded-full px-6 py-2 flex items-center justify-between backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            {heroPageLogo ? (
              <img src={heroPageLogo} alt="Hero Page Logo" className="h-8 w-auto object-contain" />
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <h1 className="text-2xl font-bold tracking-tight">SELLER TSP</h1>
              </>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "home" || activeSection === ""
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Home
            </a>
            <a 
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("products");
              }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "products"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Products
            </a>
            <a 
              href="#creators"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("creators");
              }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "creators"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Creators
            </a>
            <a 
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("pricing");
              }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "pricing"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Pricing
            </a>
            <a 
              href="#ondc"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("ondc");
              }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "ondc"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "text-foreground hover:text-primary"
              }`}
            >
              ONDC
            </a>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "contact"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            {!user && (
              <Button 
                className="gap-2 gradient-primary border-0 hover:shadow-lg transition-all rounded-full px-6 py-2"
                size="sm"
                onClick={() => setAuthDialogOpen(true)}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Get Started</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </nav>
  );
};

export default Navigation;
