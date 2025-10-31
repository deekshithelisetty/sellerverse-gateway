const ONDCSection = () => {
  const investors = [
    { name: "Quality Council of India", position: { x: 15, y: 20 } },
    { name: "Protean", position: { x: 85, y: 20 } },
    { name: "NABARD", position: { x: 10, y: 45 } },
    { name: "Bank of Baroda", position: { x: 30, y: 35 } },
    { name: "BSE", position: { x: 50, y: 25 } },
    { name: "NSE", position: { x: 70, y: 35 } },
    { name: "HDFC Bank", position: { x: 90, y: 45 } },
    { name: "ICICI Bank", position: { x: 20, y: 65 } },
    { name: "SBI", position: { x: 45, y: 55 } },
    { name: "Axis Bank", position: { x: 65, y: 65 } },
    { name: "Kotak", position: { x: 85, y: 60 } },
    { name: "SIDBI", position: { x: 15, y: 80 } },
    { name: "Punjab National Bank", position: { x: 40, y: 75 } },
    { name: "NSDL", position: { x: 60, y: 80 } },
    { name: "CDSL", position: { x: 80, y: 75 } },
  ];

  return (
    <section id="ondc" className="relative py-16 px-6 overflow-hidden rounded-t-[3rem] rounded-b-[3rem]">
      {/* Crystal clear glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-indigo-100/80 to-purple-100/80 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30"></div>
      
      {/* Multiple layered glass orbs for crystal effect */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-200/40 to-blue-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-300/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-200/30 to-violet-300/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-cyan-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 text-gradient">Investor Relations</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            ONDC was incorporated as a Section 8 company in December 2021, with the Quality Council of India and Protean eGov Technologies Limited as Founding Members.
          </p>
        </div>

        {/* Network Visualization */}
        <div className="relative h-[600px] w-full">
          {/* SVG for connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(245, 45%, 52%)" stopOpacity="0.4" />
                <stop offset="50%" stopColor="hsl(280, 50%, 65%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(320, 60%, 70%)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            
            {/* Animated connection lines from center ONDC hub to all investors */}
            {investors.map((investor, index) => (
              <line
                key={index}
                x1="50%"
                y1="50%"
                x2={`${investor.position.x}%`}
                y2={`${investor.position.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="8 4"
                className="animate-pulse"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </svg>

          {/* Central ONDC Hub */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              animation: 'scale-in 1s ease-out, pulse 3s ease-in-out infinite'
            }}
          >
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Main hub */}
              <div className="relative glass-card rounded-full p-12 border-2 border-primary/40 bg-card/80 backdrop-blur-xl shadow-2xl">
                <div className="text-center">
                  <div className="w-3 h-3 mx-auto mb-3 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50"></div>
                  <h3 className="text-2xl font-bold text-gradient">ONDC</h3>
                  <p className="text-xs text-muted-foreground mt-1">Network Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investor Nodes */}
          {investors.map((investor, index) => (
            <div
              key={index}
              className="absolute z-20 group"
              style={{
                left: `${investor.position.x}%`,
                top: `${investor.position.y}%`,
                transform: 'translate(-50%, -50%)',
                animation: `scale-in 0.6s ease-out ${index * 0.15}s both, float 4s ease-in-out ${index * 0.3}s infinite`
              }}
            >
              <div className="relative">
                {/* Hover glow effect */}
                <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Card */}
                <div className="relative glass-card rounded-2xl p-4 border border-primary/20 bg-card/70 backdrop-blur-xl hover:border-primary/40 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 shadow-lg shadow-primary/50 animate-pulse"></div>
                    <p className="text-xs font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                      {investor.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
};

export default ONDCSection;