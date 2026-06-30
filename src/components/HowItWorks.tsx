import React from 'react';
import { motion } from 'framer-motion';
import { PenLine, Music, Download, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartBuilder: () => void;
}

const STEPS = [
  {
    icon: PenLine,
    title: 'Share your story',
    desc: 'Tell us the occasion, the person, and the feeling. A sentence is enough to start.',
  },
  {
    icon: Music,
    title: 'We produce it',
    desc: 'A professional producer writes, records, and masters a track built around your brief.',
  },
  {
    icon: Download,
    title: 'You receive it',
    desc: 'Within 24 hours you get a finished, mastered song — ready to gift, post, or release.',
  },
];

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartBuilder }) => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 hairline">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-accent mb-4">How it works</p>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white">
            Three steps from idea to finished song.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="surface rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-mono text-stone-600">0{idx + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-stone-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={onStartBuilder}
          className="group inline-flex items-center gap-2 text-white font-medium hover:text-accent transition-colors"
        >
          Start your song
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
