import Link from 'next/link';

export default function GatewayPage() {
  return (
    <div className="min-h-screen bg-[#121212] font-sans selection:bg-gray-700 flex flex-col overflow-hidden relative">
      
      {/* HEADER */}
      <header className="absolute top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-transparent">
        <div className="flex items-center space-x-3 text-sm tracking-wide">
          <span className="font-semibold text-white">RMIT University Vietnam</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">Cultural Visions: Curatorial Photo Archive</span>
        </div>
        
        <div className="flex items-center space-x-6 text-sm tracking-wide">
          <button className="text-gray-400 hover:text-white transition-colors">
            {/* Search Icon */}
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>
          </button>
          <Link href="/honored-works" className="flex items-center gap-2 font-semibold text-white border border-gray-700 px-4 py-2 hover:bg-white hover:text-black transition-all rounded-full">
            <span className="text-[#FFD700] text-lg leading-none mt-[-2px]">★</span>
            Honored Works
          </Link>
        </div>
      </header>

      {/* CINEMATIC MAP CANVAS */}
      <main className="flex-grow flex items-center justify-center relative w-full h-screen">
        
        {/* Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* MAP CONTAINER */}
        <div className="relative w-[300px] md:w-[400px] h-[600px] md:h-[800px] flex items-center justify-center">
          
          {/* STYLIZED VIETNAM SVG LINE ART */}
          <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full absolute inset-0">
            <path 
              d="M 80 20 Q 110 30, 120 50 T 110 120 Q 90 180, 110 240 T 150 320 Q 160 360, 110 380 Q 70 380, 70 350 Q 70 320, 100 300 Q 120 280, 100 240 Q 80 200, 70 150 Q 60 100, 80 20 Z" 
              className="stroke-gray-700 opacity-40" 
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* NODE: HÀ NỘI */}
          <Link href="/archive/hanoi" className="absolute top-[14%] left-[53%] group flex flex-col items-center -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-out blur-md"></div>
              <div className="absolute w-8 h-8 border border-white/20 rounded-full animate-[spin_4s_linear_infinite] group-hover:border-white/50"></div>
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] group-hover:scale-150 transition-transform duration-300"></div>
            </div>
            <span className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 text-xl font-light tracking-[0.3em] text-white whitespace-nowrap translate-x-4 group-hover:translate-x-0">
              HÀ NỘI
            </span>
          </Link>

          {/* NODE: SÀI GÒN */}
          <Link href="/archive/saigon" className="absolute top-[78%] left-[67%] group flex flex-col items-center -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-out blur-md"></div>
              <div className="absolute w-8 h-8 border border-white/20 rounded-full animate-[spin_4s_linear_infinite] group-hover:border-white/50"></div>
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] group-hover:scale-150 transition-transform duration-300"></div>
            </div>
            <span className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 text-xl font-light tracking-[0.3em] text-white whitespace-nowrap -translate-x-4 group-hover:translate-x-0">
              SÀI GÒN
            </span>
          </Link>

        </div>
      </main>
      
    </div>
  );
}
