import React from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote:
      "The song for my wife's birthday made her cry. The lyrics were spot on and the melody stuck with us for weeks.",
    author: 'Michael R.',
    role: 'Austin, TX',
  },
  {
    quote:
      "As a YouTuber I needed intro music that wouldn't get copyright struck. They delivered a track I genuinely love in 24 hours.",
    author: 'Sarah Jenkins',
    role: 'Content creator',
  },
  {
    quote:
      'I shared a few ideas and got back a finished, professional song. The whole process was effortless.',
    author: 'David Chen',
    role: 'Los Angeles, CA',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 hairline">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-accent mb-4">Customers</p>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white">
            People send us their stories. We send back songs.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="surface rounded-2xl p-8 flex flex-col"
            >
              <blockquote className="text-lg text-stone-200 leading-relaxed flex-1">"{t.quote}"</blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/15 text-accent flex items-center justify-center text-sm font-semibold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.author}</div>
                  <div className="text-sm text-stone-500">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
