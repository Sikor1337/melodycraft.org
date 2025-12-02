import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { CyberpunkGrid } from './CyberpunkGrid';

interface HeroProps {
  onStartBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilder }) => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden hero-gradient text-white">
      {/* Dynamic Cyberpunk Background */}
      <CyberpunkGrid />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05] drop-shadow-2xl">
          Craft Your Perfect <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 animate-gradient-x">
            Custom Song.
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-indigo-100/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
          Professional custom music, delivered in 24 hours. <br className="hidden md:block"/>
          Perfect for gifts, content creators, or your next hit single.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
          <button 
            onClick={onStartBuilder}
            className="group w-full md:w-auto px-12 py-6 bg-white text-slate-900 font-extrabold rounded-full text-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Start Your Song Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={scrollToPricing}
            className="w-full md:w-auto px-10 py-6 bg-slate-800/40 hover:bg-slate-800/60 text-white border border-white/10 font-bold rounded-full text-xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            View Plans
          </button>
        </div>
        
        {/* Guarantee */}
        <div className="flex flex-wrap justify-center gap-8 text-base md:text-lg text-indigo-200/60 font-medium">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            Money Back Guarantee
          </span>
          <span className="hidden md:block">•</span>
          <span>No Credit Card Required to Draft</span>
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};