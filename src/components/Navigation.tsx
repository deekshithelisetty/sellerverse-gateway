import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <h1 className="text-2xl font-bold tracking-tight">SELLER TSP</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </a>
            <a href="#ondc" className="text-sm font-medium hover:text-primary transition-colors">
              ONDC Integration
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 glass border-white/20"
                  onClick={() => setIsSignedIn(false)}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Button 
                className="gap-2 gradient-primary border-0 hover:shadow-lg transition-all"
                size="sm"
                onClick={() => setIsSignedIn(true)}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Get Started</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
