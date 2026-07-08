import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { TrackPlayer } from './TrackPlayer';

interface HeroProps {
  onStartBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilder }) => {
  const scrollToSamples = () => {
    document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 md:pt-32 pb-20 overflow-hidden">
      {/* One soft, warm light source — boutique, not neon. */}
      <div className="absolute top-[-15%] left-1/4 w-[55%] h-[55%] bg-accent/[0.07] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — message + CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-sm text-stone-400 mb-8"
            >
              <span className="flex gap-0.5 text-accent">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </span>
              Loved by 10,000+ people
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl md:text-7xl font-medium leading-[1.05] text-white mb-7"
            >
              A song made just
              <br />
              for your <em className="text-accent not-italic">moment</em>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-stone-400 leading-relaxed mb-10 max-w-lg"
            >
              Tell us the story. We craft it into a polished, studio-quality
              track that's entirely yours, delivered in 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={onStartBuilder}
                className="group px-7 py-4 bg-accent hover:bg-accent/90 text-stone-950 font-semibold rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Start your song
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={scrollToSamples}
                className="px-7 py-4 border border-white/15 hover:bg-white/5 text-white font-medium rounded-full transition-colors"
              >
                Listen to our work
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-12 text-sm text-stone-500"
            >
              <span>24-hour delivery</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-stone-700" />
              <span>Real producers</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-stone-700" />
              <span>You own the rights</span>
            </motion.div>
          </div>

          {/* Right — featured track card (bespoke, on-brand player) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="w-full max-w-[25rem] 2xl:max-w-[30rem] mx-auto lg:mx-0"
          >
            <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-6">Featured work</p>

            {/* Inline 30s preview player (custom, on-brand) — plays on the
                page, no Spotify white "Preview" bar. */}
            <TrackPlayer
              track={{
                title: 'New York',
                subtitle: 'Cypher League',
                cover: 'https://i.scdn.co/image/ab67616d0000b273fd4b042ce8bfaf25b4c65246',
                preview: 'https://p.scdn.co/mp3-preview/862df5e5220c6c8173d8284b50b97a7130019064',
                href: 'https://open.spotify.com/album/60EGaHJnaGtF12R0fgxpzE',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
