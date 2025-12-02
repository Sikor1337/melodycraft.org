import React from 'react';
import { Sparkles, Mic2, Coffee, Zap, Guitar, Heart } from 'lucide-react';

interface GenresProps {
  onSelectGenre: (genre: string) => void;
}

export const Genres: React.FC<GenresProps> = ({ onSelectGenre }) => {
  const genres = [
    { name: "Pop", gradient: "from-pink-500 to-rose-500", icon: <Sparkles className="w-8 h-8 text-white" />, desc: "Catchy hooks & upbeat rhythms" },
    { name: "Hip Hop", gradient: "from-orange-500 to-red-600", icon: <Mic2 className="w-8 h-8 text-white" />, desc: "Flow, bars & heavy beats" },
    { name: "Lo-Fi", gradient: "from-indigo-400 to-purple-500", icon: <Coffee className="w-8 h-8 text-white" />, desc: "Chill vibes to study/relax to" },
    { name: "EDM", gradient: "from-cyan-400 to-blue-600", icon: <Zap className="w-8 h-8 text-white" />, desc: "High energy festival anthems" },
    { name: "Country", gradient: "from-amber-400 to-orange-600", icon: <Guitar className="w-8 h-8 text-white" />, desc: "Heartfelt storytelling & acoustics" },
    { name: "R&B", gradient: "from-fuchsia-500 to-purple-600", icon: <Heart className="w-8 h-8 text-white" />, desc: "Smooth soul & deep emotion" },
  ];

  return (
    <section id="genres" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Find Your Sound</span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Sonic Palette</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Select a vibe to jumpstart your creativity. Our AI adapts to any style you throw at it.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((g) => (
            <button 
              key={g.name}
              onClick={() => onSelectGenre(g.name)}
              className="group relative h-64 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 text-left"
            >
              {/* Card Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${g.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Noise Texture Overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-500">
                  {g.icon}
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{g.name}</h3>
                  <p className="text-white/80 font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    {g.desc}
                  </p>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};