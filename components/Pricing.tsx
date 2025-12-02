import React from 'react';
import { Check, Star, Music, Mic2 } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (tier: 'standard' | 'premium') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-32 bg-slate-50 border-t border-slate-200 bg-grid-pattern">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-600">Choose the perfect package for your needs.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          
          {/* 1. The Budget Choice ($49) */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:border-indigo-200 transition-all shadow-lg hover:shadow-xl relative overflow-hidden order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Music className="w-6 h-6 text-indigo-500" />
              Personal
            </h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-extrabold text-slate-900">$49</span>
              <span className="text-lg text-slate-500 font-medium">/ song</span>
            </div>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Perfect for birthdays, anniversaries, or a special gift for a loved one.
            </p>
            
            <button 
              onClick={() => onSelectPlan('standard')}
              className="w-full py-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-lg rounded-2xl border-2 border-indigo-100 transition-all mb-10"
            >
              Select Personal
            </button>

            <ul className="space-y-5">
              {[
                "Full Custom Song (up to 3 mins)",
                "High Quality MP3 Download",
                "Personal Use License",
                "3 Day Delivery",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-4 text-base text-slate-700">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 2. The Smart Choice ($99) - HIGHLIGHTED */}
          <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden text-white transform scale-105 z-10 order-1 lg:order-2 ring-8 ring-slate-200/50">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-600 text-sm font-bold px-6 py-2 rounded-bl-2xl text-slate-900 shadow-lg">
              MOST POPULAR
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              Pro Artist & Release
            </h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-extrabold text-white">$99</span>
              <span className="text-lg text-slate-400 font-medium">/ song</span>
            </div>
            
            <p className="text-lg text-indigo-200 mb-10 leading-relaxed">
              For aspiring artists and content creators. We release it to Spotify, Apple Music, and more.
            </p>
            
            <button 
              onClick={() => onSelectPlan('premium')}
              className="w-full py-5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-lg rounded-2xl shadow-xl shadow-yellow-500/20 transition-all mb-10 transform hover:scale-[1.02]"
            >
              Start Pro Order
            </button>

            <ul className="space-y-5">
              {[
                "Everything in Personal",
                "Commercial Rights Ownership",
                "Distribution to Spotify & Apple Music",
                "WAV + Stems Included",
                "Priority 24-Hour Delivery",
                "Dedicated Producer Chat"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-4 text-base text-slate-100">
                  <div className="p-1 bg-white/10 rounded-full">
                    <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. The Anchor ($499) - EXCLUSIVE LOOK */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl relative overflow-hidden order-3">
             <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-slate-700 via-yellow-500 to-slate-700"></div>
             <div className="relative">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Mic2 className="w-6 h-6 text-slate-900" />
                  Executive Package
                </h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-extrabold text-slate-900">$499</span>
                  <span className="text-lg text-slate-500 font-medium">/ album</span>
                </div>
                
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  Launch your career with a cohesive body of work. A full album project ready for the charts.
                </p>
                
                <button 
                  onClick={() => window.location.href = 'mailto:sales@melodycraft.com?subject=Executive%20Album%20Package%20Inquiry'}
                  className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-lg rounded-2xl border-2 border-slate-200 transition-all mb-10"
                >
                  Contact for Availability
                </button>

                <ul className="space-y-5">
                  {[
                    "Everything in Pro",
                    "Complete 8-Track Album Production",
                    "Cohesive Sound Design & Mix",
                    "Unified Album Artwork Package",
                    "Full Stems & MIDI Data",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-base text-slate-700">
                      <div className="p-1 bg-slate-100 rounded-full">
                        <Check className="w-4 h-4 text-slate-900 flex-shrink-0" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
            </div>
          </div>

        </div>
        
        <p className="text-center mt-16 text-slate-500 font-medium">
          All plans are covered by our 100% money-back guarantee.
        </p>
      </div>
    </section>
  );
};
