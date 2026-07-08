import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

// Custom on-brand cards that link out to each track on Spotify. This avoids the
// white "Preview" panel Spotify injects into inline single-track embeds for
// logged-out visitors. Covers are Spotify CDN images; href opens the track.
const SAMPLES = [
  {
    title: 'Feel-Good Funk',
    genre: 'Funk · 1980s',
    cover: 'https://i.scdn.co/image/ab67616d00001e02d75b6fc940aee8b393e849fd',
    href: 'https://open.spotify.com/track/2PTBNDmJHinIE09YrwMDik',
  },
  {
    title: 'Radio-Ready Pop',
    genre: 'Pop',
    cover: 'https://i.scdn.co/image/ab67616d00001e0227f843b83240e834c32fad73',
    href: 'https://open.spotify.com/track/0wMONJVD4odQngAdcJvYHM',
  },
  {
    title: 'Dancefloor Drop',
    genre: 'EDM',
    cover: 'https://i.scdn.co/image/ab67616d00001e02f7a8963b6af760a1dd7c14b5',
    href: 'https://open.spotify.com/track/0hzgOHfUB2DTBIrJIihFzV',
  },
];

export const AudioSamples: React.FC = () => {
  return (
    <section id="samples" className="py-20 md:py-28 hairline">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-accent mb-4">Listen</p>
          <h2 className="font-display text-4xl md:text-6xl font-medium text-white mb-4 leading-[1.05]">
            Made to sound like a hit.
          </h2>
          <p className="text-lg text-stone-400 leading-relaxed">
            Press play to hear the production quality we deliver on every order.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SAMPLES.map((sample, idx) => (
            <motion.a
              key={sample.title}
              href={sample.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group surface rounded-2xl p-4 block hover:border-white/20 transition-colors"
            >
              <div className="relative">
                <img
                  src={sample.cover}
                  alt={`${sample.title} cover`}
                  loading="lazy"
                  className="w-full aspect-square rounded-xl object-cover"
                />
                <span className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-accent text-stone-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Play className="w-5 h-5 fill-current pl-0.5" />
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{sample.title}</p>
                  <p className="text-sm text-stone-400">{sample.genre}</p>
                </div>
                <span className="text-xs text-stone-500 group-hover:text-accent transition-colors">
                  Spotify ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <p className="text-sm text-stone-400 mt-10">
          A few of our custom tracks. Yours is made from scratch, just for you.
        </p>
      </div>
    </section>
  );
};
