import React, { useState, useEffect } from 'react';
import { X, Loader2, Music, Sparkles, ArrowRight, Star } from 'lucide-react';
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

  // Reset or set initial genre when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialGenre) {
        setSelectedGenre(initialGenre);
      }
    } else {
      // Optional: reset state on close if desired
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
      alert("Failed to generate song concept. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectOrder = () => {
    // If no input provided, use defaults
    const finalGenre = selectedGenre || "Artist's Choice";
    const finalVision = vision.trim() || "No specific details provided - Surprise me!";

    // Create a manual concept object from the user's input
    const manualConcept: SongConcept = {
      title: "Custom Song Request",
      genre: finalGenre,
      mood: "Custom User Request",
      lyricsSnippet: finalVision,
      instrumentationIdeas: ["As described in request"]
    };
    onOrder(manualConcept);
  };

  const isPremium = selectedTier === 'premium';
  const price = isPremium ? 99 : 49;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-300">
        {/* Header */}
        <div className={`p-6 border-b flex justify-between items-center rounded-t-2xl ${isPremium ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-50 border-slate-100 text-slate-800'}`}>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {isPremium ? <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" /> : <Sparkles className="w-6 h-6 text-yellow-500" />}
              {isPremium ? 'Pro Artist Vision' : 'Draft Your Vision'}
            </h2>
            <p className={`text-sm mt-1 ${isPremium ? 'text-slate-400' : 'text-slate-500'}`}>
              {isPremium ? 'Describe the hit you want to release.' : 'Use AI to brainstorm ideas, or send us your own vision.'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isPremium ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-500'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {!concept ? (
            <>
              {/* Step 1: Genre */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  1. Choose a Genre
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGenre(g)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedGenre === g
                          ? 'bg-indigo-600 text-white shadow-md scale-105'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Vision */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  2. Describe Your Story / Lyrics
                </label>
                <textarea
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  placeholder="Type your lyrics here, or describe the story you want the song to tell..."
                  className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-700"
                />
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={!selectedGenre || !vision || isLoading}
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Dreaming up lyrics...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate AI Concept (Brainstorm)
                    </>
                  )}
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase font-semibold">OR</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                  onClick={handleDirectOrder}
                  disabled={isLoading}
                  className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl border-2 border-indigo-100 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  Skip AI & Order Directly (${price})
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-indigo-900">{concept.title}</h3>
                    <p className="text-indigo-600 font-medium">{concept.genre} • {concept.mood}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Music className="w-6 h-6 text-indigo-500" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-800 uppercase mb-2">Chorus Preview</h4>
                    <p className="font-serif text-lg text-slate-700 italic leading-relaxed border-l-4 border-yellow-400 pl-4 bg-white/50 p-4 rounded-r-lg">
                      "{concept.lyricsSnippet}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-indigo-800 uppercase mb-2">Suggested Vibe</h4>
                    <div className="flex flex-wrap gap-2">
                      {concept.instrumentationIdeas.map((inst, i) => (
                        <span key={i} className="px-3 py-1 bg-white text-indigo-600 text-sm rounded-md shadow-sm border border-indigo-100">
                          {inst}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setConcept(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                >
                  Try Again
                </button>
                <button 
                  className={`flex-1 py-3 font-bold rounded-xl shadow-lg transition-colors ${
                    isPremium 
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                  }`}
                  onClick={() => onOrder(concept)}
                >
                  Order {isPremium ? 'Premium' : 'Now'} (${price})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};