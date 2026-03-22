import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wand2, Play, Sparkles } from 'lucide-react';
import { CyberpunkGrid } from './CyberpunkGrid';

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
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-indigo-500/20 text-indigo-300 text-sm font-bold mb-10"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          AI-Powered Custom Music Studio
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.85] lg:max-w-6xl mx-auto uppercase"
        >
          TWÓJ POMYSŁ. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500">
            NASZE STUDIO.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-3xl text-slate-400 mb-14 max-w-3xl mx-auto font-medium leading-relaxed"
        >
          Tworzymy piosenki o jakości radiowej w 24 godziny. <br className="hidden md:block" />
          Twoja historia, nasze profesjonalne brzmienie.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-8 text-slate-500 font-bold uppercase tracking-[0.2em] text-xs"
        >
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 fill-current" />
            Listen to Samples
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-800"></div>
          <div>24h Delivery</div>
          <div className="w-1 h-1 rounded-full bg-slate-800"></div>
          <div>Full Rights</div>
        </motion.div>
      </div>
    </section>
  );
};
