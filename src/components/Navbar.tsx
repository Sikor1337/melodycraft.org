import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-neutral-950/80 backdrop-blur-md border-b border-white/8' : 'py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          melodycraft
        </a>

        <div className="hidden md:flex gap-9 text-sm font-medium text-neutral-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#samples" className="hover:text-white transition-colors">Samples</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <button
          onClick={onLoginClick}
          className="px-4 py-2 rounded-lg border border-white/15 text-white text-sm font-medium hover:bg-white/5 transition-colors"
        >
          {isLoggedIn ? 'Account' : 'Log in'}
        </button>
      </div>
    </nav>
  );
};
