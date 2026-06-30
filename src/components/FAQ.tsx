import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does it take?',
    a: 'Most songs are delivered within 24 hours. Pro Release orders are prioritized and include a dedicated producer who keeps you updated.',
  },
  {
    q: 'Do I own the rights?',
    a: 'Yes. Personal includes a personal-use license; Pro Release grants full commercial rights — use it on YouTube, Spotify, ads, anywhere.',
  },
  {
    q: 'Who actually makes the song?',
    a: 'Professional producers and musicians. You share the brief, and a real producer writes, records, and masters the track from scratch.',
  },
  {
    q: "What if I don't like it?",
    a: 'Every plan includes revisions so we can fine-tune the track until it feels right.',
  },
  {
    q: 'Can you distribute it to streaming?',
    a: 'Yes — Pro Release includes distribution to all major platforms, plus WAV files and stems.',
  },
];

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 hairline">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-12">
          <p className="text-sm font-medium text-amber-400 mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Questions, answered.</h2>
        </div>

        <div className="divide-y divide-white/8 border-t border-b border-white/8">
          {FAQS.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-medium text-white">{item.q}</span>
                  <Plus
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-neutral-400 leading-relaxed max-w-2xl">{item.a}</p>
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
