import { Store, ShoppingCart } from "lucide-react";

const ONDCSection = () => {
  const sellers = [
    { name: "Varun Bakery", image: "🍰", badge: "I sell on ONDC", position: "top-20 left-[30%]" },
    { name: "Lakshmi Pickles", image: "🥘", badge: "I sell on ONDC", position: "top-40 left-[40%]" },
    { name: "Preethi", image: "👩‍🍳", badge: "2 Sarees", position: "bottom-40 left-[20%]" },
    { name: "WOW Momo", image: "🥟", badge: "I sell on ONDC", position: "bottom-32 left-[35%]" },
    { name: "Farmer's Produce", image: "🌾", badge: "I sell on ONDC", position: "bottom-20 right-[40%]" },
  ];

  const buyers = [
    { name: "Kudumbashree", image: "🏪", badge: "I sell on ONDC", position: "top-32 right-[30%]" },
    { name: "Jyoti Silks", image: "👗", badge: "I sell on ONDC", position: "top-48 right-[35%]" },
    { name: "Abha", image: "👩", badge: "1 Saree", position: "top-64 right-[20%]" },
  ];

  const sellerNodes = [
    { position: "top-24 left-[10%]", delay: "0s" },
    { position: "top-48 left-[20%]", delay: "0.3s" },
    { position: "bottom-28 left-[25%]", delay: "0.6s" },
    { position: "bottom-16 right-[35%]", delay: "0.9s" },
  ];

  const buyerNodes = [
    { position: "top-40 right-[10%]", delay: "0.2s" },
    { position: "top-56 right-[22%]", delay: "0.5s" },
    { position: "bottom-24 right-[18%]", delay: "0.8s" },
  ];

  return (
    <section id="ondc" className="relative py-16 px-6 overflow-hidden rounded-t-[3rem] rounded-b-[3rem] min-h-screen flex items-center">
      {/* Crystal clear glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-indigo-100/80 to-purple-100/80 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30"></div>
      
      {/* Multiple layered glass orbs for crystal effect */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-200/40 to-blue-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-300/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-200/30 to-violet-300/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-cyan-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="max-w-7xl mx-auto relative w-full">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full glass-card border border-primary/30 mb-4">
            <span className="text-sm font-semibold text-primary">Investor Relations</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-gradient">ONDC Network Ecosystem</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            ONDC was incorporated as a Section 8 company in December 2021, connecting sellers, buyers, and applications in an open digital commerce network.
          </p>
        </div>

        {/* Network Diagram */}
        <div className="relative h-[600px] glass-card rounded-3xl p-8">
          {/* Connection Lines Background */}
          <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="ondcLineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(280, 50%, 65%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(245, 45%, 52%)" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="ondcLineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(320, 60%, 70%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(280, 50%, 65%)" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Animated lines */}
            <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="url(#ondcLineGradient1)" strokeWidth="2" className="animate-pulse" />
            <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="url(#ondcLineGradient1)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
            <line x1="50%" y1="50%" x2="75%" y2="40%" stroke="url(#ondcLineGradient2)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
            <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="url(#ondcLineGradient2)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: "0.9s" }} />
          </svg>

          {/* Seller Nodes */}
          {sellerNodes.map((node, index) => (
            <div
              key={`seller-${index}`}
              className={`absolute ${node.position} z-10`}
              style={{
                animation: `scale-in 0.5s ease-out ${node.delay} both, float 3s ease-in-out ${node.delay} infinite`
              }}
            >
              <div className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:scale-110 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  <Store className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">SELLER APP</span>
              </div>
            </div>
          ))}

          {/* Buyer Nodes */}
          {buyerNodes.map((node, index) => (
            <div
              key={`buyer-${index}`}
              className={`absolute ${node.position} z-10`}
              style={{
                animation: `scale-in 0.5s ease-out ${node.delay} both, float 3s ease-in-out ${node.delay} infinite`
              }}
            >
              <div className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:scale-110 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">BUYER APP</span>
              </div>
            </div>
          ))}

          {/* Seller Cards */}
          {sellers.map((seller, index) => (
            <div
              key={`seller-card-${index}`}
              className={`absolute ${seller.position} z-20`}
              style={{
                animation: `fade-in 0.6s ease-out ${index * 0.2}s both, float 4s ease-in-out ${index * 0.3}s infinite`
              }}
            >
              <div className="glass-card rounded-xl p-3 flex flex-col items-center gap-2 hover:scale-110 transition-all shadow-xl">
                <div className="w-12 h-12 rounded-lg bg-white dark:bg-card flex items-center justify-center text-2xl">
                  {seller.image}
                </div>
                <span className="text-xs font-bold">{seller.name}</span>
                <div className="px-3 py-1 rounded-full bg-primary/20 text-primary">
                  <span className="text-xs font-semibold">{seller.badge}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Buyer Cards */}
          {buyers.map((buyer, index) => (
            <div
              key={`buyer-card-${index}`}
              className={`absolute ${buyer.position} z-20`}
              style={{
                animation: `fade-in 0.6s ease-out ${(index + 3) * 0.2}s both, float 4s ease-in-out ${(index + 2) * 0.3}s infinite`
              }}
            >
              <div className="glass-card rounded-xl p-3 flex flex-col items-center gap-2 hover:scale-110 transition-all shadow-xl">
                <div className="w-12 h-12 rounded-lg bg-white dark:bg-card flex items-center justify-center text-2xl">
                  {buyer.image}
                </div>
                <span className="text-xs font-bold">{buyer.name}</span>
                <div className="px-3 py-1 rounded-full bg-secondary/20 text-secondary">
                  <span className="text-xs font-semibold">{buyer.badge}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Central ONDC Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <div 
              className="glass-card rounded-full p-8 shadow-2xl"
              style={{
                animation: "scale-in 0.8s ease-out 0.5s both, pulse 2s ease-in-out infinite"
              }}
            >
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">ONDC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
};

export default ONDCSection;