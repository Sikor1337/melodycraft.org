import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const SAMPLES = [
  { id: 1, title: 'Anniversary Ballad', genre: 'Pop · Piano', duration: '0:30' },
  { id: 2, title: 'Birthday Hype', genre: 'Hip Hop', duration: '0:30' },
  { id: 3, title: 'Late Night', genre: 'Lo-Fi', duration: '0:30' },
];

export const AudioSamples: React.FC = () => {
  const [playing, setPlaying] = useState<number | null>(null);

  const togglePlay = (id: number) => setPlaying((current) => (current === id ? null : id));

  return (
    <section id="samples" className="py-28 hairline">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-amber-400 mb-4">Samples</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Real instruments. Real vocals.
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            A few tracks our producers have made — mastered to a release-ready standard.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SAMPLES.map((sample) => {
            const isPlaying = playing === sample.id;
            return (
              <div key={sample.id} className="surface rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => togglePlay(sample.id)}
                    aria-label={isPlaying ? `Pause ${sample.title}` : `Play ${sample.title}`}
                    className="w-11 h-11 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center justify-center transition-colors shrink-0"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current pl-0.5" />}
                  </button>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate">{sample.title}</h3>
                    <p className="text-sm text-neutral-500">{sample.genre}</p>
                  </div>
                  <span className="ml-auto text-sm font-mono text-neutral-600">{sample.duration}</span>
                </div>
                <div className="mt-5 h-1 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-amber-400 rounded-full transition-all ease-linear ${
                      isPlaying ? 'w-full duration-[30000ms]' : 'w-0 duration-300'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-neutral-600 mt-8">Demo previews — playback is illustrative.</p>
      </div>
    </section>
  );
};
