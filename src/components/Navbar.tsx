import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#samples', label: 'Samples' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        solid ? 'py-3 bg-stone-950/90 backdrop-blur-md border-b border-white/8' : 'py-5 md:py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
          <span className="w-2 h-2 rounded-full bg-accent" />
          melodycraft
        </a>

        <div className="hidden md:flex gap-9 text-sm font-medium text-stone-400">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden p-2 -mr-2 text-white"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden container mx-auto px-6 pt-4 pb-2">
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-stone-300 hover:text-white border-b border-white/5 text-base font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
