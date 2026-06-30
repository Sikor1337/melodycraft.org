import React from 'react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="py-16 hairline">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <a href="#home" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight mb-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              melodycraft
            </a>
            <p className="text-stone-500 max-w-sm leading-relaxed">
              Custom songs, written and produced just for you. Delivered in 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-stone-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="mailto:hello@melodycraft.org" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 text-sm text-stone-600">
          © {year} MelodyCraft. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
