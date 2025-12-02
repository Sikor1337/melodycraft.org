import React from 'react';
import { Facebook, Twitter, Youtube, Instagram, ShieldCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 relative pt-16">
      <div className="container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16 border-b border-slate-800 pb-12">
          <div className="col-span-1 md:col-span-1">
             <a href="#" onClick={scrollToTop} className="text-white font-bold text-2xl tracking-tighter mb-6 block">
              Melody<span className="text-yellow-400">Craft</span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The world's easiest way to create custom songs for any occasion. Professional quality, delivered fast.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" onClick={scrollToTop} className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" onClick={scrollToTop} className="hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" onClick={scrollToTop} className="hover:text-indigo-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" onClick={scrollToTop} className="hover:text-indigo-400 transition-colors">Help Center</a></li>
              <li><a href="#" onClick={scrollToTop} className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" onClick={scrollToTop} className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
             <h4 className="text-white font-bold mb-6">Secure Payment</h4>
             <div className="flex items-center gap-2 text-sm mb-4">
               <Lock className="w-4 h-4 text-green-400" />
               <span>SSL Encrypted Checkout</span>
             </div>
             <div className="flex flex-wrap gap-2 opacity-70">
               {/* Mock Payment Badges */}
               <div className="h-8 bg-slate-900 rounded px-2 flex items-center border border-slate-800 font-bold text-xs italic">VISA</div>
               <div className="h-8 bg-slate-900 rounded px-2 flex items-center border border-slate-800 font-bold text-xs">Mastercard</div>
               <div className="h-8 bg-slate-900 rounded px-2 flex items-center border border-slate-800 font-bold text-xs font-serif">AMEX</div>
               <div className="h-8 bg-slate-900 rounded px-2 flex items-center border border-slate-800 font-bold text-xs">Stripe</div>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>Copyright © 2024 MelodyCraft, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
             <ShieldCheck className="w-4 h-4" />
             <span>Money Back Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};