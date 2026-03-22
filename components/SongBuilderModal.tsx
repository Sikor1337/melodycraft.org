
import React, { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, Star } from 'lucide-react';
import { generateSongConcept, SongConcept } from '../services/geminiService';

interface SongBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGenre?: string;
  selectedTier?: 'standard' | 'premium';
  onOrder: (concept: SongConcept) => void;
}

const GENRES = ["Pop", "Hip Hop", "Country", "R&B", "EDM", "Rock", "Lo-Fi", "Jazz"];

export const SongBuilderModal: React.FC<SongBuilderModalProps> = ({ 
  isOpen, 
  onClose, 
  initialGenre, 
  selectedTier = 'standard',
  onOrder 
}) => {
  const [vision, setVision] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [concept, setConcept] = useState<SongConcept | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialGenre) setSelectedGenre(initialGenre);
      setVision('');
      setConcept(null);
    }
  }, [isOpen, initialGenre]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!vision || !selectedGenre) return;
    setIsLoading(true);
    try {
      const result = await generateSongConcept(vision, selectedGenre);
      setConcept(result);
    } catch (error) {
      console.error(error);
      alert("Composition failed. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const isPremium = selectedTier === 'premium';
  const price = isPremium ? 99 : 49;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className={`p-8 border-b border-white/5 flex justify-between items-center ${isPremium ? 'bg-gradient-to-r from-indigo-950/50 to-slate-900' : 'bg-slate-900'}`}>
          <div>
            <h2 className="text-3xl font-black flex items-center gap-3 text-white">
              {isPremium ? <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" /> : <Sparkles className="w-8 h-8 text-indigo-500" />}
              {isPremium ? 'Pro Artist Session' : 'Song Draft Concept'}
            </h2>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <div className="p-10 overflow-y-auto space-y-10">
          {!concept ? (
            <>
              <div className="space-y-4">
                <label className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">1. Select Your Sound</label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGenre(g)}
                      className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                        selectedGenre === g ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'glass text-slate-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">2. Your Story or Lyrics</label>
                <textarea
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  placeholder="What should the song be about? A memory, a person, or a specific vibe..."
                  className="w-full h-40 p-6 rounded-2xl glass border-white/10 outline-none text-lg placeholder:text-slate-600 focus:border-indigo-500/50 transition-all resize-none text-white"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!selectedGenre || !vision || isLoading}
                className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 text-xl disabled:opacity-50"
              >
                {isLoading ? <><Loader2 className="w-6 h-6 animate-spin" /> Composing Masterpiece...</> : <><Sparkles className="w-6 h-6" /> Generate Concept</>}
              </button>
            </>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-4xl font-black text-white">{concept.title}</h3>
                  <p className="text-indigo-400 font-bold tracking-widest uppercase text-sm mt-2">{concept.genre} • {concept.mood}</p>
                </div>
                <div className="p-6 bg-indigo-500/5 border-l-4 border-indigo-500 italic text-xl text-slate-200 font-serif leading-relaxed">
                  "{concept.lyricsSnippet}"
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {concept.instrumentationIdeas.slice(0, 4).map((idea, i) => (
                    <div key={i} className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      {idea}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setConcept(null)} className="flex-1 py-5 glass hover:bg-white/10 font-black rounded-2xl text-white">Refine Vision</button>
                <button onClick={() => onOrder(concept)} className="flex-[2] py-5 bg-indigo-600 hover:bg-indigo-500 font-black rounded-2xl text-xl text-white">Confirm Order (${price})</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
