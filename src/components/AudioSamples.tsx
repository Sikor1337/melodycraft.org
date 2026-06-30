import React from 'react';
import { motion } from 'framer-motion';
import { SpotifyEmbed } from './SpotifyEmbed';

// PLACEHOLDERS — swap each src for one of the studio's own Spotify track/playlist
// embed links. Title/genre are just captions shown above each player.
const SAMPLES = [
  {
    title: 'Anniversary Ballad',
    genre: 'Pop · Piano',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0',
  },
  {
    title: 'Birthday Hype',
    genre: 'Hip Hop',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator&theme=0',
  },
  {
    title: 'Wedding First Dance',
    genre: 'Acoustic',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX1lVhptIYRda?utm_source=generator&theme=0',
  },
];

export const AudioSamples: React.FC = () => {
  return (
    <section id="samples" className="py-20 md:py-28 hairline">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-accent mb-4">Listen</p>
          <h2 className="font-display text-4xl md:text-6xl font-medium text-white mb-4 leading-[1.05]">
            Real instruments. Real vocals.
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
              <SpotifyEmbed src={sample.src} title={sample.title} />
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-stone-600 mt-10">
          Sample players shown for layout — MelodyCraft's own releases go here.
        </p>
      </div>
    </section>
  );
};
