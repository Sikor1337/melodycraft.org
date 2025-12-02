import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-indigo-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" onClick={scrollToSection('home')} className="text-white font-bold text-2xl tracking-tighter cursor-pointer">
          Melody<span className="text-yellow-400">Craft</span>
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-200 items-center">
          <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" onClick={scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</a>
        </div>

        {/* CTA */}
        <button 
          onClick={onLoginClick}
          className={`px-6 py-2 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white hover:text-indigo-900 transition-all flex items-center gap-2 ${isLoggedIn ? 'bg-white/10' : ''}`}
        >
          {isLoggedIn ? (
            <>
              <User className="w-4 h-4" />
              My Profile
            </>
          ) : 'Login'}
        </button>
      </div>
    </nav>
  );
};