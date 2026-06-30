import React, { useState } from 'react';
import { Play, Pause, Music2 } from 'lucide-react';

const SAMPLES = [
  { id: 1, title: 'Anniversary Ballad', genre: 'Pop / Piano', duration: '0:30' },
  { id: 2, title: 'Birthday Hype', genre: 'Hip Hop', duration: '0:30' },
  { id: 3, title: 'Late Night Lo-Fi', genre: 'Lo-Fi', duration: '0:30' },
];

export const AudioSamples: React.FC = () => {
  const [playing, setPlaying] = useState<number | null>(null);

  const togglePlay = (id: number) => {
    setPlaying((current) => (current === id ? null : id));
  };

  return (
    <section id="samples" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Hear the Difference</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Real Songs, Real Quality.</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Listen to tracks crafted by our team — real instruments, professional vocals, studio mastering.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {SAMPLES.map((sample) => (
            <div
              key={sample.id}
              className="glass border-white/5 rounded-[2rem] p-8 hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Music2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black px-3 py-1 glass border-white/10 rounded-full text-slate-400 uppercase tracking-widest">
                  {sample.genre}
                </span>
              </div>

              <h3 className="font-black text-xl text-white mb-1">{sample.title}</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">Studio Quality Master</p>

              <div className="glass border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => togglePlay(sample.id)}
                  aria-label={playing === sample.id ? `Pause ${sample.title}` : `Play ${sample.title}`}
                  className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors shadow-md shadow-indigo-600/20 shrink-0"
                >
                  {playing === sample.id ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current pl-0.5" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-indigo-500 rounded-full transition-all ease-linear ${
                        playing === sample.id ? 'w-full duration-[30000ms]' : 'w-0 duration-300'
                      }`}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">{sample.duration}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-600 text-xs font-bold uppercase tracking-widest mt-12">
          Demo previews · Audio playback is illustrative
        </p>
      </div>
    </section>
  );
};
