const ONDCSection = () => {
  const investors = [
    { name: "BSE Investments Limited" },
    { name: "NSE Investments Limited" },
    { name: "Kotak Mahindra Bank Limited" },
    { name: "Axis Bank Limited" },
    { name: "HDFC Bank Limited" },
    { name: "HSBC Securities and Capital Market(India) Private Limited" },
    { name: "National Bank for Agriculture and Rural Development (NABARD)" },
    { name: "Bank of Baroda" },
    { name: "CSC e-Governance Services India Limited" },
    { name: "UCO Bank" },
    { name: "Central Depository Services (India) Limited" },
    { name: "Punjab National Bank" },
    { name: "National Securities Depositories Limited (NSDL)" },
    { name: "Bank of India" },
    { name: "IDFC First Bank Limited" },
    { name: "Small Industries Development Bank of India (SIDBI)" },
    { name: "State Bank of India" },
    { name: "ICICI Bank Limited" },
    { name: "RBL" },
    { name: "IndusInd Bank" },
    { name: "Canara bank" },
    { name: "Federal Bank" },
    { name: "Union Bank" },
    { name: "Bank of Maharashtra" },
    { name: "Indian Bank" },
    { name: "IDBI Bank Ltd" },
    { name: "Indian Overseas Bank" },
    { name: "Bajaj Finserv Ventures Limited" }
  ];

  // Brand logos - using placeholder for demo
  const brandLogos = [
    { name: "Quality Council of India", color: "from-blue-500 to-cyan-500" },
    { name: "NABARD", color: "from-green-500 to-emerald-500" },
    { name: "Protean", color: "from-orange-500 to-red-500" },
    { name: "Bank of Baroda", color: "from-orange-400 to-yellow-500" },
    { name: "BSE", color: "from-blue-600 to-indigo-600" },
    { name: "CSC", color: "from-slate-600 to-gray-700" },
    { name: "NSE", color: "from-red-500 to-rose-600" },
    { name: "Punjab National Bank", color: "from-orange-500 to-amber-600" },
    { name: "HDFC Bank", color: "from-blue-700 to-blue-900" },
    { name: "ICICI Bank", color: "from-orange-600 to-red-700" },
    { name: "NSDL", color: "from-yellow-600 to-orange-600" },
    { name: "SIDBI", color: "from-purple-500 to-indigo-500" },
    { name: "Bank of India", color: "from-blue-500 to-cyan-600" },
    { name: "SBI", color: "from-blue-600 to-indigo-700" },
    { name: "UCO Bank", color: "from-blue-600 to-blue-800" },
    { name: "Axis Bank", color: "from-pink-600 to-red-600" },
    { name: "IDFC First Bank", color: "from-red-600 to-rose-700" },
    { name: "Kotak", color: "from-red-500 to-pink-600" },
    { name: "CDSL", color: "from-slate-700 to-gray-800" },
    { name: "Canara Bank", color: "from-cyan-500 to-blue-600" },
    { name: "Federal Bank", color: "from-blue-800 to-indigo-900" }
  ];

  return (
    <section id="ondc" className="relative py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-gradient">Investor Relations</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            ONDC was incorporated as a Section 8 company in December 2021, with the Quality Council of India and Protean eGov Technologies Limited as Founding Members. The other Institutions that have Invested in ONDC are:
          </p>
        </div>

        {/* Investor List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {investors.map((investor, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-4 hover:scale-105 transition-all duration-300"
              style={{
                animation: `fade-in 0.5s ease-out ${index * 0.05}s both`
              }}
            >
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-sm font-medium">{investor.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Logos Grid */}
        <div className="glass-card rounded-3xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {brandLogos.map((brand, index) => (
              <div
                key={index}
                className="group relative aspect-video rounded-xl bg-white dark:bg-card flex items-center justify-center p-4 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  animation: `scale-in 0.6s ease-out ${index * 0.1}s both, float 3s ease-in-out ${index * 0.2}s infinite`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                <span className="text-xs font-bold text-center text-foreground/80 group-hover:text-foreground transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default ONDCSection;