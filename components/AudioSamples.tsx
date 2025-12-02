import React, { useState } from 'react';
import { Play, Pause, Music2 } from 'lucide-react';

export const AudioSamples: React.FC = () => {
  const [playing, setPlaying] = useState<number | null>(null);

  const samples = [
    { id: 1, title: "Anniversary Ballad", genre: "Pop / Piano", duration: "0:30" },
    { id: 2, title: "Birthday Hype", genre: "Hip Hop", duration: "0:30" },
    { id: 3, title: "Relaxing Lo-Fi Study", genre: "Lo-Fi", duration: "0:30" },
  ];

  const togglePlay = (id: number) => {
    if (playing === id) {
      setPlaying(null);
    } else {
      setPlaying(id);
    }
  };

  return (
    <section id="samples" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hear the Difference</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it. Listen to samples created by our team.
            Real instruments, professional vocals, studio quality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {samples.map((sample) => (
            <div key={sample.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <Music2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-500 uppercase tracking-wide">
                  {sample.genre}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-slate-900 mb-1">{sample.title}</h3>
              <p className="text-slate-500 text-sm mb-6">Professional Studio Quality</p>

              <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                <button 
                  onClick={() => togglePlay(sample.id)}
                  className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors shadow-md shadow-indigo-600/20"
                >
                  {playing === sample.id ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current pl-0.5" />}
                </button>
                <div className="flex-1 space-y-1">
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-indigo-500 rounded-full transition-all duration-[2000ms] ${playing === sample.id ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">{sample.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};