import React from 'react';
import { Music, PlayCircle, Radio, Disc } from 'lucide-react';

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6">
        <p className="text-center text-slate-400 font-bold text-xs tracking-[0.2em] uppercase mb-10">
          We Distribute Your Music To All Major Platforms
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0">
          
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="font-bold text-2xl text-slate-800 tracking-tight">Spotify</span>
          </div>

          <div className="flex items-center gap-2 group">
            <Music className="w-8 h-8 text-pink-500" />
            <span className="font-bold text-2xl text-slate-800 tracking-tight">Apple Music</span>
          </div>

          <div className="flex items-center gap-2 group">
             <div className="relative w-8 h-8 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                <span className="text-white font-bold text-xs">TIK</span>
             </div>
            <span className="font-bold text-2xl text-slate-800 tracking-tight">TikTok</span>
          </div>

          <div className="flex items-center gap-2 group">
            <Radio className="w-8 h-8 text-orange-500" />
            <span className="font-bold text-2xl text-slate-800 tracking-tight">SoundCloud</span>
          </div>

          <div className="flex items-center gap-2 group">
            <PlayCircle className="w-8 h-8 text-red-600 fill-red-600 text-white" />
            <span className="font-bold text-2xl text-slate-800 tracking-tight">YouTube</span>
          </div>
        </div>
      </div>
    </section>
  );
};