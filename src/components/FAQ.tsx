import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does it take to get my song?',
    a: 'Most custom songs are delivered within 24 hours. Pro Release orders are prioritized and include a dedicated producer who keeps you updated throughout.',
  },
  {
    q: 'Do I own the rights to my song?',
    a: 'Yes. The Personal Song plan includes a personal-use license, and the Pro Release plan grants full commercial rights — you can monetize it on YouTube, Spotify, ads, anywhere.',
  },
  {
    q: 'Is it really made by humans, or just AI?',
    a: 'Both. Our AI helps you shape the concept and lyrics instantly, then professional producers record and master a studio-quality track from scratch. You get the speed of AI with a real human touch.',
  },
  {
    q: 'What if I don’t like the result?',
    a: 'Every plan includes revisions so we can fine-tune your track until it feels right. Your satisfaction is the whole point.',
  },
  {
    q: 'Can you distribute my song to Spotify and Apple Music?',
    a: 'Yes — the Pro Release plan includes distribution to all major streaming platforms, plus WAV files and stems for total flexibility.',
  },
];

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-slate-950">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Got Questions?</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Frequently Asked</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={item.q} className="glass border-white/5 rounded-3xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 p-7 text-left"
                >
                  <span className="text-lg md:text-xl font-bold text-white">{item.q}</span>
                  <Plus
                    className={`w-6 h-6 text-indigo-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-7 text-lg text-slate-400 leading-relaxed font-medium">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
