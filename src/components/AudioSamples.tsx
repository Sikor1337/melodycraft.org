import React from 'react';
import { motion } from 'framer-motion';
import { SpotifyEmbed } from './SpotifyEmbed';

// Title/genre are just captions shown above each player; edit freely.
// src = Spotify embed link for each track (open.spotify.com/embed/track/<id>).
const SAMPLES = [
  {
    title: 'Feel-Good Funk',
    genre: 'Funk · 1980s',
    src: 'https://open.spotify.com/embed/track/2PTBNDmJHinIE09YrwMDik?theme=0',
  },
  {
    title: 'Radio-Ready Pop',
    genre: 'Pop',
    src: 'https://open.spotify.com/embed/track/0wMONJVD4odQngAdcJvYHM?theme=0',
  },
  {
    title: 'Dancefloor Drop',
    genre: 'EDM',
    src: 'https://open.spotify.com/embed/track/0hzgOHfUB2DTBIrJIihFzV?theme=0',
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
            <motion.div
              key={sample.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-semibold text-white">{sample.title}</h3>
                <span className="text-sm text-stone-500">{sample.genre}</span>
              </div>
              <SpotifyEmbed src={sample.src} title={sample.title} cropHeight={88} />
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-stone-400 mt-10">
          A few of our custom tracks. Yours is made from scratch, just for you.
        </p>
      </div>
    </section>
  );
};
