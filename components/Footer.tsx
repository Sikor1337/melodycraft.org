import React from 'react';
import { Music } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-20 bg-slate-950 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-2 text-white font-black text-3xl tracking-tighter mb-8">
          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
            <Music className="w-7 h-7" />
          </div>
          MelodyCraft
        </div>
        <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed font-medium">
          Professional custom music for everyone. Delivered worldwide in 24 hours.
        </p>
        <div className="flex justify-center gap-8 text-slate-400 font-bold uppercase tracking-widest text-xs mb-10">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
        <p className="text-slate-700 text-xs font-bold uppercase tracking-widest">
          © 2024 MelodyCraft Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};