import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import CreatorsSection from "@/components/CreatorsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Products Section */}
      <ProductsSection />
      
      {/* Creators Section */}
      <CreatorsSection />

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6">Pricing</h2>
            <p className="text-lg text-muted-foreground">Simple, transparent pricing that grows with your business.</p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6">Resources</h2>
            <p className="text-lg text-muted-foreground">Documentation, guides, and support to help you succeed.</p>
          </div>
        </div>
      </section>

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
