import React from 'react';
import { Check, Star } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (tier: 'standard' | 'premium') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-32 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Music for Every Need.</h2>
          <p className="text-xl text-slate-400">Choose the level of production that fits your vision.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Personal Card */}
          <div className="glass p-12 rounded-[3rem] border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors">
            <div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-widest text-slate-400">Personal Song</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-7xl font-black">$49</span>
                <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">one time</span>
              </div>
              <ul className="space-y-6 mb-12">
                {["3 Minute Production", "Mastered MP3", "2 Revisions Included", "Personal License"].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                    <Check className="w-5 h-5 text-indigo-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <button 
              onClick={() => onSelectPlan('standard')}
              className="w-full py-5 glass border-white/10 hover:bg-white/10 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-sm"
            >
              Select Personal
            </button>
          </div>

          {/* Pro Card */}
          <div className="relative glass p-12 rounded-[3rem] border-indigo-500/30 bg-indigo-500/5 shadow-[0_0_100px_rgba(99,102,241,0.1)] flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-[0.2em]">Artist Standard</div>
            <div>
              <h3 className="text-2xl font-black mb-4 flex items-center gap-3 uppercase tracking-widest text-indigo-400">
                Pro Release <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-7xl font-black">$99</span>
                <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">per track</span>
              </div>
              <ul className="space-y-6 mb-12">
                {["Full Commercial Rights", "Spotify/Apple Distribution", "WAV + Stems Included", "Priority 24h Delivery", "Dedicated Producer"].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-medium">
                    <Check className="w-5 h-5 text-indigo-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <button 
              onClick={() => onSelectPlan('premium')}
              className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all text-xl uppercase tracking-tighter"
            >
              Select Pro Artist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};