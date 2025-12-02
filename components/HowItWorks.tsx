import React from 'react';
import { Mic, Hourglass, Download, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Mic className="w-8 h-8 text-white" />,
      color: "bg-indigo-600",
      shadow: "shadow-indigo-200",
      title: "Describe Your Vision",
      desc: "Tell us about your song idea, style, and mood. The AI helps you draft lyrics instantly.",
    },
    {
      icon: <Hourglass className="w-8 h-8 text-white" />,
      color: "bg-pink-600",
      shadow: "shadow-pink-200",
      title: "Passionate Creators Build",
      desc: "Our dedicated team of producers brings your unique track to life.",
    },
    {
      icon: <Download className="w-8 h-8 text-white" />,
      color: "bg-cyan-600",
      shadow: "shadow-cyan-200",
      title: "Download & Use Forever",
      desc: "Receive your studio-quality song, fully mastered and ready to share anywhere.",
    },
  ];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/4 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-sm tracking-wide uppercase mb-6">
            Simple Process
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
            From Idea to Airwaves <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
              In 3 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            We've streamlined music production. No studios, no expensive hourly rates. 
            Just your vision and our team.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-y-1/2 z-0 border-t-2 border-dashed border-slate-300"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="h-full bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 z-10 relative overflow-hidden flex flex-col items-center text-center">
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg ${step.shadow} rotate-3 group-hover:rotate-6 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">{index + 1}. {step.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 mb-6 font-medium">Ready to hear your song?</p>
          <button 
             onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
             className="inline-flex items-center gap-2 text-indigo-600 font-bold text-lg hover:text-indigo-700 transition-colors group"
          >
            Start Creating Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};