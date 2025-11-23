import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import CreatorsSection from "@/components/CreatorsSection";
import PricingSection from "@/components/PricingSection";
import ONDCSection from "@/components/ONDCSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { SectionWrapper } from "@/components/SectionWrapper";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when coming from dashboard or other pages
    if (location.pathname === '/') {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <div id="home">
        <SectionWrapper delay={0}>
          <HeroSection />
        </SectionWrapper>
      </div>
      <ScrollToTop />
      
      {/* Products Section */}
      <SectionWrapper delay={100}>
        <ProductsSection />
      </SectionWrapper>
      
      {/* Creators Section - No animation */}
      <div>
        <CreatorsSection />
      </div>

      {/* Pricing Section */}
      <SectionWrapper delay={200}>
        <PricingSection />
      </SectionWrapper>

      {/* ONDC Investor Relations Section */}
      <SectionWrapper delay={300}>
        <ONDCSection />
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper delay={400}>
        <ContactSection />
      </SectionWrapper>

      {/* Footer */}
      <SectionWrapper delay={500}>
        <Footer />
      </SectionWrapper>
    </div>
  );
};

export default Index;
