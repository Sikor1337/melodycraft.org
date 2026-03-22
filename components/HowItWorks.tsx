import React from 'react';
import { Mic2, Star, Download } from 'lucide-react';

export const HowItWorks: React.FC = () => {
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
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            Studio Quality, <br />
            <span className="text-indigo-400">Streamlined Process.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="glass p-12 rounded-[2.5rem] border-white/5 hover:border-indigo-500/30 transition-all group">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <h3 className="text-3xl font-black mb-6">{step.title}</h3>
              <p className="text-xl text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};