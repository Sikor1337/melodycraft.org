import React from 'react';

const PLATFORMS = [
  { name: 'Spotify', className: 'italic' },
  { name: 'Apple Music', className: '' },
  { name: 'TIKTOK', className: 'tracking-widest' },
  { name: 'YouTube', className: '' },
  { name: 'Amazon Music', className: '' },
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-20 border-y border-white/5 glass">
      <div className="container mx-auto px-6">
        <p className="text-center text-slate-500 font-black text-xs uppercase tracking-[0.3em] mb-12">
          Release your song on every major platform
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
          {PLATFORMS.map((p) => (
            <span key={p.name} className={`text-2xl md:text-3xl font-black text-white ${p.className}`}>
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
