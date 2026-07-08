import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { SongOrder, Tier, TIER_PRICE, TIER_LABEL, TIER_NOTE } from '../types';

interface SongBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGenre?: string;
  selectedTier?: Tier;
  onOrder: (order: SongOrder) => void;
}

const GENRES = ['Pop', 'Hip Hop', 'Country', 'R&B', 'Acoustic', 'Rock', 'Lo-Fi', 'Jazz'];

export const SongBuilderModal: React.FC<SongBuilderModalProps> = ({
  isOpen,
  onClose,
  initialGenre,
  selectedTier = 'standard',
  onOrder,
}) => {
  const [genre, setGenre] = useState('');
  const [occasion, setOccasion] = useState('');
  const [forWhom, setForWhom] = useState('');
  const [story, setStory] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setGenre(initialGenre || '');
      setOccasion('');
      setForWhom('');
      setStory('');
      setError(null);
    }
  }, [isOpen, initialGenre]);

  if (!isOpen) return null;

  const price = TIER_PRICE[selectedTier];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!genre) {
      setError('Pick a style to get started.');
      return;
    }
    if (story.trim().length < 10) {
      setError('Tell us a little more about the story (at least a sentence).');
      return;
    }
    onOrder({ genre, occasion: occasion.trim(), forWhom: forWhom.trim(), story: story.trim() });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 16 }}
        className="surface bg-stone-950 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="px-7 py-6 border-b border-white/8 flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1">
              {TIER_LABEL[selectedTier]}
            </p>
            <h2 className="text-2xl font-bold text-white tracking-tight">Tell us about your song</h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 -mr-2 hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-7 overflow-y-auto space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-stone-300">Style</label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenre(g)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    genre === g
                      ? 'bg-accent text-stone-950'
                      : 'surface text-stone-300 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-stone-300">Occasion <span className="text-stone-400 font-normal">(optional)</span></label>
              <input
                type="text"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="Birthday, wedding, anniversary…"
                className="w-full px-4 py-3 rounded-lg surface text-white placeholder:text-stone-600 outline-none focus:border-accent/40 transition-colors"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-stone-300">Who is it for? <span className="text-stone-400 font-normal">(optional)</span></label>
              <input
                type="text"
                value={forWhom}
                onChange={(e) => setForWhom(e.target.value)}
                placeholder="My wife, our team, myself…"
                className="w-full px-4 py-3 rounded-lg surface text-white placeholder:text-stone-600 outline-none focus:border-accent/40 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-stone-300">The story</label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Share the memory, the message, or the vibe you want. The more detail, the better the song."
              className="w-full h-36 px-4 py-3 rounded-lg surface text-white placeholder:text-stone-600 outline-none focus:border-accent/40 transition-colors resize-none leading-relaxed"
            />
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-accent hover:bg-accent/90 text-stone-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Continue to checkout · ${price}
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-xs text-stone-400">
            You won't be charged yet · {TIER_NOTE[selectedTier]}
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};
