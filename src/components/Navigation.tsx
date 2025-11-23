import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useNavigate } from "react-router-dom";
import AuthDialog from "./AuthDialog";

const Navigation = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { user, signOut } = useAuth();
  const { heroPageLogo } = useSettings();
  const navigate = useNavigate();

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
      const sections = ["products", "creators", "pricing", "ondc", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            // Update hash without triggering scroll
            if (window.location.hash !== `#${section}`) {
              window.history.replaceState(null, "", `#${section}`);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", updateActiveSection);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-full px-6 py-2 flex items-center justify-between backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3">
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
              href="#products" 
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "products"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "hover:text-primary"
              }`}
            >
              Products
            </a>
            <a 
              href="#creators" 
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "creators"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "hover:text-primary"
              }`}
            >
              Creators
            </a>
            <a 
              href="#pricing" 
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "pricing"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "hover:text-primary"
              }`}
            >
              Pricing
            </a>
            <a 
              href="#ondc" 
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "ondc"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "hover:text-primary"
              }`}
            >
              ONDC
            </a>
            <a 
              href="#contact" 
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === "contact"
                  ? "text-primary backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
                  : "hover:text-primary"
              }`}
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => navigate('/dashboard')}
                  aria-label="Dashboard"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 glass border-white/20"
                  onClick={signOut}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Button 
                className="gap-2 gradient-primary border-0 hover:shadow-lg transition-all"
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
