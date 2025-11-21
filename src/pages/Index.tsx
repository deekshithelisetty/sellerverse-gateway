import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import CreatorsSection from "@/components/CreatorsSection";
import PricingSection from "@/components/PricingSection";
import ONDCSection from "@/components/ONDCSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SectionWrapper } from "@/components/SectionWrapper";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Products Section */}
      <SectionWrapper delay={0}>
        <ProductsSection />
      </SectionWrapper>
      
      {/* Creators Section */}
      <SectionWrapper delay={100}>
        <CreatorsSection />
      </SectionWrapper>

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
      <Footer />
    </div>
  );
};

export default Index;
