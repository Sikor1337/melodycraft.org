import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      "I was skeptical at first, but the song for my wife's birthday made her cry. The lyrics were spot on and the melody was unforgettable.",
    author: 'Michael R.',
    role: 'Austin, TX',
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    quote:
      "As a YouTuber, I needed intro music that wouldn't get copyright struck. MelodyCraft delivered a banger in 24 hours. The Pro plan is worth every cent.",
    author: 'Sarah Jenkins',
    role: 'Content Creator',
    image: 'https://i.pravatar.cc/150?img=45',
  },
  {
    quote:
      'The process was effortless. I typed a few ideas, the AI drafted the perfect concept, and the producers brought it to life beautifully.',
    author: 'David Chen',
    role: 'Los Angeles, CA',
    image: 'https://i.pravatar.cc/150?img=33',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Don't Take Our Word For It</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Loved by 10,000+ Creators</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass p-10 rounded-[2.5rem] border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all"
            >
              <div>
                <div className="mb-8 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xl text-slate-200 mb-10 leading-relaxed font-medium">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-5">
                <img
                  src={t.image}
                  alt={t.author}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">{t.author}</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
