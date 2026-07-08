import React from 'react';
import { motion } from 'framer-motion';
import { TrackPlayer, Track } from './TrackPlayer';

// Inline 30s previews via a custom on-brand player (no Spotify white "Preview"
// panel). cover = Spotify CDN image, preview = p.scdn.co mp3, href = full track.
const SAMPLES: Track[] = [
  {
    title: 'Heatwave Hotline',
    subtitle: 'Boogie Blaster · Funk · 1980s',
    cover: 'https://i.scdn.co/image/ab67616d0000b273d75b6fc940aee8b393e849fd',
    preview: 'https://p.scdn.co/mp3-preview/d0300da2fbb9d9a41ee3975eb4f6e06b06d4bbdf',
    href: 'https://open.spotify.com/track/2PTBNDmJHinIE09YrwMDik',
  },
  {
    title: 'Echoes in the Rain',
    subtitle: 'Evan Vale · Pop',
    cover: 'https://i.scdn.co/image/ab67616d0000b27327f843b83240e834c32fad73',
    preview: 'https://p.scdn.co/mp3-preview/157ba2c4845d6e9a4acf450917a00af890f64302',
    href: 'https://open.spotify.com/track/0wMONJVD4odQngAdcJvYHM',
  },
  {
    title: 'Dubai Bass',
    subtitle: 'ØPERATØRS · EDM',
    cover: 'https://i.scdn.co/image/ab67616d0000b273f7a8963b6af760a1dd7c14b5',
    preview: 'https://p.scdn.co/mp3-preview/8f953701b5932ffd2d35f8d0af30baf6759a9907',
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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SAMPLES.map((track, idx) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <TrackPlayer track={track} />
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-stone-400 mt-10">
          30-second previews. Your song is made from scratch, just for you.
        </p>
      </div>
    </section>
  );
};
