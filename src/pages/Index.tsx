import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NetworkSection from "@/components/NetworkSection";
import ProductsSection from "@/components/ProductsSection";
import CreatorsSection from "@/components/CreatorsSection";
import PricingSection from "@/components/PricingSection";
import ONDCSection from "@/components/ONDCSection";

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
      <section id="contact" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6">Contact</h2>
            <p className="text-lg text-muted-foreground">Get in touch with our team to start your ONDC journey.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
