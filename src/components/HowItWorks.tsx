import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, Star, Download, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartBuilder: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartBuilder }) => {
  const steps = [
    {
      icon: <Mic2 className="w-10 h-10" />,
      title: "Share Your Vision",
      desc: "Tell us your story or paste your lyrics. Our AI helps you refine the perfect concept.",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: <Star className="w-10 h-10" />,
      title: "Human Touch",
      desc: "Our pro producers take your concept and record a studio-quality track from scratch.",
      color: "from-fuchsia-500 to-pink-600"
    },
    {
      icon: <Download className="w-10 h-10" />,
      title: "Ready to Play",
      desc: "In 24 hours, you get a mastered audio file ready for Spotify or your living room.",
      color: "from-cyan-500 to-indigo-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter"
          >
            Studio Quality, <br />
            <span className="text-indigo-400">Streamlined Process.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass p-12 rounded-[2.5rem] border-white/5 hover:border-indigo-500/30 transition-all group"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <h3 className="text-3xl font-black mb-6">{step.title}</h3>
              <p className="text-xl text-slate-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={onStartBuilder}
            className="px-12 py-6 glass border-white/10 hover:bg-white text-white hover:text-slate-950 font-black rounded-2xl transition-all flex items-center gap-4 uppercase tracking-widest text-sm"
          >
            Start Creating Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
