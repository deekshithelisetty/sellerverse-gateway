import { Store, ShoppingCart } from "lucide-react";
const ONDCSection = () => {
  // Combine all cards and position them in a 360-degree circle (spread upward)
  const allCards = [
    { name: "Varun Bakery", image: "🍰", badge: "I sell on ONDC", type: "seller", angle: -20 },
    { name: "Lakshmi Pickles", image: "🥘", badge: "I sell on ONDC", type: "seller", angle: 20 },
    { name: "Preethi", image: "👩‍🍳", badge: "2 Sarees", type: "seller", angle: 70 },
    { name: "WOW Momo", image: "🥟", badge: "I sell on ONDC", type: "seller", angle: 120 },
    { name: "Farmer's Produce", image: "🌾", badge: "I sell on ONDC", type: "seller", angle: 160 },
    { name: "Kudumbashree", image: "🏪", badge: "I sell on ONDC", type: "buyer", angle: 200 },
    { name: "Jyoti Silks", image: "👗", badge: "I sell on ONDC", type: "buyer", angle: 250 },
    { name: "Abha", image: "👩", badge: "1 Saree", type: "buyer", angle: 300 },
  ];

  // Calculate positions in a circle (radius ~32% from center, centered)
  const getCardPosition = (angle: number) => {
    const radius = 32; // percentage from center
    const centerX = 50;
    const centerY = 50; // Centered vertically
    const radian = (angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(radian);
    const y = centerY + radius * Math.sin(radian);
    return { x, y };
  };
  
  // Position nodes in a circle at a different radius than cards to avoid overlap
  // Spread them more evenly to avoid overlapping
  const allNodes = [
    { type: "seller", angle: 0, delay: "0s" },
    { type: "seller", angle: 45, delay: "0.3s" },
    { type: "seller", angle: 90, delay: "0.6s" },
    { type: "seller", angle: 135, delay: "0.9s" },
    { type: "buyer", angle: 180, delay: "0.2s" },
    { type: "buyer", angle: 225, delay: "0.5s" },
    { type: "buyer", angle: 270, delay: "0.8s" },
  ];

  // Calculate node positions (at 22% radius, between center and cards, centered)
  const getNodePosition = (angle: number) => {
    const radius = 22; // percentage from center (closer than cards, reduced to avoid overlap)
    const centerX = 50;
    const centerY = 50; // Centered vertically
    const radian = (angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(radian);
    const y = centerY + radius * Math.sin(radian);
    return { x, y };
  };
  return <section id="ondc" className="relative pb-16 px-6 overflow-hidden rounded-t-[3rem] rounded-b-[3rem] h-screen flex items-center" style={{ scrollMarginTop: '4rem' }}>
      {/* Crystal clear glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-indigo-100/80 to-purple-100/80 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30"></div>
      
      {/* Multiple layered glass orbs for crystal effect */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-200/40 to-blue-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-300/40 rounded-full blur-3xl animate-pulse" style={{
      animationDelay: "1s"
    }}></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-200/30 to-violet-300/30 rounded-full blur-2xl animate-pulse" style={{
      animationDelay: "0.5s"
    }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-cyan-200/40 rounded-full blur-3xl animate-pulse" style={{
      animationDelay: "1.5s"
    }}></div>
      
      <div className="max-w-7xl mx-auto relative w-full h-full flex flex-col justify-center">
        <div className="text-center mb-3">
          <h2 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              The Future of Commerce is Open
            </span>
          </h2>
        </div>

        {/* Network Diagram */}
        <div className="relative flex-1 glass-card rounded-3xl p-8 min-h-[500px]">
          {/* Description text at top of card */}
          <div className="text-center mb-6">
            <p className="text-xs text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We are proud to be part of the Open Network for Digital Commerce (ONDC), a revolutionary initiative to unbundle and democratize e-commerce in India.
            </p>
          </div>
          {/* Connection Lines Background */}
          <svg className="absolute inset-0 w-full h-full opacity-30" style={{
          zIndex: 1
        }}>
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
            {/* Animated lines - connecting each card to center */}
            {allCards.map((card, index) => {
              const pos = getCardPosition(card.angle);
              return (
                <line
                  key={`card-line-${index}`}
                  x1={`${pos.x}%`}
                  y1={`${pos.y}%`}
                  x2="50%"
                  y2="50%"
                  stroke={card.type === "seller" ? "url(#ondcLineGradient1)" : "url(#ondcLineGradient2)"}
                  strokeWidth="2"
                  className="animate-pulse"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              );
            })}
            {/* Animated lines - connecting each node to center */}
            {allNodes.map((node, index) => {
              const pos = getNodePosition(node.angle);
              return (
                <line
                  key={`node-line-${index}`}
                  x1={`${pos.x}%`}
                  y1={`${pos.y}%`}
                  x2="50%"
                  y2="50%"
                  stroke={node.type === "seller" ? "url(#ondcLineGradient1)" : "url(#ondcLineGradient2)"}
                  strokeWidth="2"
                  className="animate-pulse"
                  style={{ animationDelay: `${(index + 8) * 0.1}s` }}
                />
              );
            })}
          </svg>

          {/* All Nodes positioned in 360-degree circle (between center and cards) */}
          {allNodes.map((node, index) => {
            const pos = getNodePosition(node.angle);
            return (
              <div
                key={`node-${index}`}
                className="absolute z-10"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `scale-in 0.5s ease-out ${node.delay} both, float 3s ease-in-out ${node.delay} infinite`
                }}
              >
                <div className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:scale-110 transition-all shadow-lg">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${node.type === "seller" ? "from-orange-400 to-orange-600" : "from-green-400 to-emerald-600"} flex items-center justify-center text-white`}>
                    {node.type === "seller" ? <Store className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">{node.type === "seller" ? "SELLER APP" : "BUYER APP"}</span>
                </div>
              </div>
            );
          })}

          {/* All Cards positioned in 360-degree circle */}
          {allCards.map((card, index) => {
            const pos = getCardPosition(card.angle);
            return (
              <div
                key={`card-${index}`}
                className="absolute z-20"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `fade-in 0.6s ease-out ${index * 0.1}s both, float 4s ease-in-out ${index * 0.2}s infinite`
                }}
              >
                <div className="glass-card rounded-xl p-3 flex flex-col items-center gap-2 hover:scale-110 transition-all shadow-xl">
                  <div className="w-12 h-12 rounded-lg bg-white dark:bg-card flex items-center justify-center text-2xl">
                    {card.image}
                  </div>
                  <span className="text-xs font-bold">{card.name}</span>
                  <div className={`px-3 py-1 rounded-full ${card.type === "seller" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"}`}>
                    <span className="text-xs font-semibold">{card.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Central ONDC Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="glass-card rounded-full p-8 shadow-2xl" style={{
            animation: "scale-in 0.8s ease-out 0.5s both, pulse 2s ease-in-out infinite"
          }}>
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>;
};
export default ONDCSection;