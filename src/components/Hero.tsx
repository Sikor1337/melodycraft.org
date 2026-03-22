import React from 'react';
import { ArrowRight, Wand2 } from 'lucide-react';
import { CyberpunkGrid } from './CyberpunkGrid.tsx';

interface HeroProps {
  onStartBuilder: () => void;
  onOpenArt: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilder, onOpenArt }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden hero-gradient">
      <div className="absolute inset-0 z-0">
        <CyberpunkGrid />
      </div>
      
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-indigo-500/20 text-indigo-300 text-sm font-bold mb-10 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
          AI-Powered Custom Music Studio
        </div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] lg:max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          TWÓJ POMYSŁ. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 animate-gradient-x">
            NASZE STUDIO.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Tworzymy piosenki o jakości radiowej w 24 godziny. Twoja historia, nasze profesjonalne brzmienie.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={onStartBuilder}
            className="group w-full sm:w-auto px-12 py-6 bg-indigo-600 text-white font-black rounded-2xl text-xl shadow-[0_0_40px_-5px_rgba(79,70,229,0.5)] hover:bg-indigo-500 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
          >
            Stwórz Utwór
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onOpenArt}
            className="w-full sm:w-auto px-12 py-6 glass hover:bg-white/5 text-white font-bold rounded-2xl text-xl transition-all flex items-center justify-center gap-3"
          >
            <Wand2 className="w-5 h-5" />
            Art Studio
          </button>
        </div>
      </div>
    </section>
  );
};