import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export interface Track {
  title: string;
  /** Genre or artist line shown under the title. */
  subtitle: string;
  /** Album cover image URL (Spotify CDN). */
  cover: string;
  /** 30-second preview mp3 (Spotify p.scdn.co) played inline. */
  preview: string;
  /** Full track on Spotify, for the "Spotify ↗" link. */
  href: string;
}

// Only one preview plays at a time across the whole page.
let currentAudio: HTMLAudioElement | null = null;

interface TrackPlayerProps {
  track: Track;
  /** 'card' = cover on top (samples grid); 'row' = compact horizontal (hero). */
  variant?: 'card' | 'row';
}

export const TrackPlayer: React.FC<TrackPlayerProps> = ({ track, variant = 'card' }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const onEnd = () => setProgress(0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      if (currentAudio === audio) currentAudio = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    if (currentAudio && currentAudio !== audio) currentAudio.pause();
    currentAudio = audio;
    void audio.play().catch(() => {});
  };

  // Click or drag the range overlay to jump to that point in the preview.
  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(audio.duration) || audio.duration === 0) return;
    const frac = Number(e.target.value) / 1000;
    audio.currentTime = frac * audio.duration;
    setProgress(frac);
  };

  const playLabel = `${playing ? 'Pause' : 'Play'} preview of ${track.title}`;
  const icon = playing ? (
    <Pause className="w-5 h-5 fill-current" />
  ) : (
    <Play className="w-5 h-5 fill-current pl-0.5" />
  );

  const progressBar = (
    <div className="relative py-2">
      <div className="h-1 rounded-full bg-white/10 overflow-hidden pointer-events-none">
        <div className="h-full bg-accent" style={{ width: `${progress * 100}%` }} />
      </div>
      <input
        type="range"
        min={0}
        max={1000}
        value={Math.round(progress * 1000)}
        onChange={onSeek}
        aria-label={`Seek ${track.title}`}
        className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
      />
    </div>
  );

  if (variant === 'row') {
    return (
      <div className="group flex items-center gap-4 rounded-2xl bg-stone-900/60 border border-white/8 p-4">
        <img src={track.cover} alt="" loading="lazy" className="w-16 h-16 rounded-xl object-cover shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white truncate">{track.title}</p>
          <p className="text-sm text-stone-400 truncate">{track.subtitle}</p>
          <div className="mt-2">{progressBar}</div>
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-label={playLabel}
          aria-pressed={playing}
          className="w-11 h-11 rounded-full bg-accent hover:bg-accent/90 text-stone-950 flex items-center justify-center shrink-0 transition-colors"
        >
          {icon}
        </button>
        <audio ref={audioRef} src={track.preview} preload="none" />
      </div>
    );
  }

  return (
    <div className="group surface rounded-2xl p-4">
      <div className="relative">
        <img
          src={track.cover}
          alt={`${track.title} cover`}
          loading="lazy"
          className="w-full aspect-square rounded-xl object-cover"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playLabel}
          aria-pressed={playing}
          className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-accent hover:bg-accent/90 text-stone-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"
        >
          {icon}
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-white truncate">{track.title}</p>
          <p className="text-sm text-stone-400 truncate">{track.subtitle}</p>
        </div>
        <a
          href={track.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-stone-500 hover:text-accent transition-colors shrink-0"
        >
          Spotify ↗
        </a>
      </div>
      <div className="mt-3">{progressBar}</div>
      <audio ref={audioRef} src={track.preview} preload="none" />
    </div>
  );
};
