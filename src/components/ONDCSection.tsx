const ONDCSection = () => {
  const investors = [{
    name: "BSE Investments Limited"
  }, {
    name: "NSE Investments Limited"
  }, {
    name: "Kotak Mahindra Bank Limited"
  }, {
    name: "Axis Bank Limited"
  }, {
    name: "HDFC Bank Limited"
  }, {
    name: "HSBC Securities and Capital Market(India) Private Limited"
  }, {
    name: "National Bank for Agriculture and Rural Development (NABARD)"
  }, {
    name: "Bank of Baroda"
  }, {
    name: "CSC e-Governance Services India Limited"
  }, {
    name: "UCO Bank"
  }, {
    name: "Central Depository Services (India) Limited"
  }, {
    name: "Punjab National Bank"
  }, {
    name: "National Securities Depositories Limited (NSDL)"
  }, {
    name: "Bank of India"
  }, {
    name: "IDFC First Bank Limited"
  }, {
    name: "Small Industries Development Bank of India (SIDBI)"
  }, {
    name: "State Bank of India"
  }, {
    name: "ICICI Bank Limited"
  }, {
    name: "RBL"
  }, {
    name: "IndusInd Bank"
  }, {
    name: "Canara bank"
  }, {
    name: "Federal Bank"
  }, {
    name: "Union Bank"
  }, {
    name: "Bank of Maharashtra"
  }, {
    name: "Indian Bank"
  }, {
    name: "IDBI Bank Ltd"
  }, {
    name: "Indian Overseas Bank"
  }, {
    name: "Bajaj Finserv Ventures Limited"
  }];

  // Brand logos - using placeholder for demo
  const brandLogos = [{
    name: "Quality Council of India",
    color: "from-blue-500 to-cyan-500"
  }, {
    name: "NABARD",
    color: "from-green-500 to-emerald-500"
  }, {
    name: "Protean",
    color: "from-orange-500 to-red-500"
  }, {
    name: "Bank of Baroda",
    color: "from-orange-400 to-yellow-500"
  }, {
    name: "BSE",
    color: "from-blue-600 to-indigo-600"
  }, {
    name: "CSC",
    color: "from-slate-600 to-gray-700"
  }, {
    name: "NSE",
    color: "from-red-500 to-rose-600"
  }, {
    name: "Punjab National Bank",
    color: "from-orange-500 to-amber-600"
  }, {
    name: "HDFC Bank",
    color: "from-blue-700 to-blue-900"
  }, {
    name: "ICICI Bank",
    color: "from-orange-600 to-red-700"
  }, {
    name: "NSDL",
    color: "from-yellow-600 to-orange-600"
  }, {
    name: "SIDBI",
    color: "from-purple-500 to-indigo-500"
  }, {
    name: "Bank of India",
    color: "from-blue-500 to-cyan-600"
  }, {
    name: "SBI",
    color: "from-blue-600 to-indigo-700"
  }, {
    name: "UCO Bank",
    color: "from-blue-600 to-blue-800"
  }, {
    name: "Axis Bank",
    color: "from-pink-600 to-red-600"
  }, {
    name: "IDFC First Bank",
    color: "from-red-600 to-rose-700"
  }, {
    name: "Kotak",
    color: "from-red-500 to-pink-600"
  }, {
    name: "CDSL",
    color: "from-slate-700 to-gray-800"
  }, {
    name: "Canara Bank",
    color: "from-cyan-500 to-blue-600"
  }, {
    name: "Federal Bank",
    color: "from-blue-800 to-indigo-900"
  }];
  return <section id="ondc" className="relative py-16 px-6 overflow-hidden">
      {/* Crystal clear glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-indigo-100/80 to-purple-100/80 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 rounded-t-[3rem] rounded-b-[3rem]"></div>
      
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
      
      {/* Crystal reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent rounded-t-[3rem] rounded-b-[3rem]"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-gradient">Investor Relations</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            ONDC was incorporated as a Section 8 company in December 2021, with the Quality Council of India and Protean eGov Technologies Limited as Founding Members. The other Institutions that have Invested in ONDC are:
          </p>
        </div>

        {/* Investor List */}
        

        {/* Brand Logos Grid with enhanced crystal glass */}
        <div className="relative">
          {/* Crystal glass container */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-blue-50/50 to-purple-50/40 dark:from-white/5 dark:via-blue-950/10 dark:to-purple-950/10 backdrop-blur-2xl rounded-3xl border border-white/50 dark:border-white/10 shadow-2xl"></div>
          <div className="relative glass-card rounded-3xl p-12 bg-white/30 dark:bg-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {brandLogos.map((brand, index) => <div key={index} className="group relative aspect-video rounded-xl bg-white/80 dark:bg-card/80 backdrop-blur-sm flex items-center justify-center p-4 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl border border-white/60 dark:border-white/10" style={{
              animation: `scale-in 0.6s ease-out ${index * 0.1}s both, float 3s ease-in-out ${index * 0.2}s infinite`
            }}>
                  {/* Crystal shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                  <span className="relative text-xs font-bold text-center text-foreground/80 group-hover:text-foreground transition-colors z-10">
                    {brand.name}
                  </span>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>;
};
export default ONDCSection;