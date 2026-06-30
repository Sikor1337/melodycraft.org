import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onStartBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilder }) => {
  const scrollToSamples = () => {
    document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* One soft, restrained light source — no neon, no grid. */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-amber-400/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium text-amber-400 mb-6"
          >
            Custom music studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-7"
          >
            Custom songs, made
            <br />
            for your <span className="text-amber-400">moment</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-10 max-w-xl"
          >
            Tell us the story. Our producers write, record, and master a studio-quality
            track that's entirely yours — delivered in 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onStartBuilder}
              className="group px-7 py-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Start your song
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={scrollToSamples}
              className="px-7 py-4 border border-white/15 hover:bg-white/5 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Hear samples
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-14 text-sm text-neutral-500"
          >
            <span>24-hour delivery</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-neutral-700" />
            <span>Real producers</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-neutral-700" />
            <span>You own the rights</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
