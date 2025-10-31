import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NetworkSection from "@/components/NetworkSection";
import ProductsSection from "@/components/ProductsSection";
import CreatorsSection from "@/components/CreatorsSection";
import PricingSection from "@/components/PricingSection";
import ONDCSection from "@/components/ONDCSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Network Commerce Section */}
      <NetworkSection />
      
      {/* Products Section */}
      <ProductsSection />
      
      {/* Creators Section */}
      <CreatorsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* ONDC Investor Relations Section */}
      <ONDCSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
