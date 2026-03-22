import React from 'react';

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-20 border-y border-white/5 glass">
      <div className="container mx-auto px-6">
        <p className="text-center text-slate-500 font-black text-xs uppercase tracking-[0.3em] mb-12">Distribute your hits globally</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale">
          <span className="text-3xl font-black text-white italic">Spotify</span>
          <span className="text-3xl font-black text-white">Apple Music</span>
          <span className="text-3xl font-black text-white tracking-widest">TIKTOK</span>
          <span className="text-3xl font-black text-white">YouTube</span>
          <span className="text-3xl font-black text-white">Amazon</span>
        </div>
      </div>
    </section>
  );
};