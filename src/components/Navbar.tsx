import React, { useState, useEffect } from 'react';
import { Music } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass border-b border-white/5 bg-slate-950/80' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-white font-black text-2xl tracking-tighter">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-xl flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          Melody<span className="text-indigo-400">Craft</span>
        </a>

        <div className="hidden md:flex gap-10 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-white transition-colors">Support</a>
        </div>

        <button 
          onClick={onLoginClick}
          className={`px-6 py-3 rounded-xl glass border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all flex items-center gap-3 ${isLoggedIn ? 'bg-indigo-500 border-indigo-400' : ''}`}
        >
          {isLoggedIn ? 'Account' : 'Login'}
        </button>
      </div>
    </nav>
  );
};