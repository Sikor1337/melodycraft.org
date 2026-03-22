
import React, { useState, useRef } from 'react';
import { X, Loader2, Image as ImageIcon, Wand2, Upload, ArrowRight } from 'lucide-react';
import { editImage } from '@/services/geminiService';

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ isOpen, onClose }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!originalImage || !prompt) return;
    setIsLoading(true);
    try {
      const [header, base64Data] = originalImage.split(',');
      const mimeType = header.split(':')[1].split(';')[0];
      const resultBase64 = await editImage(base64Data, mimeType, prompt);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (error) {
      console.error(error);
      alert("Failed to edit image. Try a simpler prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-3xl font-black flex items-center gap-3 text-white">
              <ImageIcon className="w-8 h-8 text-fuchsia-500" />
              Art Studio
            </h2>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <div className="p-10 overflow-y-auto space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <label className="text-xs font-black text-fuchsia-400 uppercase tracking-[0.3em]">1. Upload Base Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group cursor-pointer border-2 border-dashed rounded-[2rem] h-72 flex flex-col items-center justify-center transition-all ${
                  originalImage ? 'border-fuchsia-500/40 bg-fuchsia-500/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                {originalImage ? (
                  <img src={originalImage} alt="Input" className="w-full h-full object-contain p-4 rounded-[2rem]" />
                ) : (
                  <div className="text-center p-8">
                    <Upload className="w-12 h-12 text-slate-600 mb-4 mx-auto group-hover:scale-110 transition-transform" />
                    <p className="text-slate-400 font-bold">Drop your image here</p>
                    <p className="text-xs text-slate-600 mt-2 uppercase tracking-widest font-black">JPG / PNG / WEBP</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-xs font-black text-fuchsia-400 uppercase tracking-[0.3em]">Result Preview</label>
              <div className="border border-white/10 rounded-[2rem] h-72 bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                 {isLoading && (
                   <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                      <Loader2 className="w-12 h-12 animate-spin text-fuchsia-500 mb-4" />
                      <p className="text-fuchsia-400 font-black uppercase tracking-widest text-xs animate-pulse">Rendering Design...</p>
                   </div>
                 )}
                 {generatedImage ? (
                   <img src={generatedImage} alt="Result" className="w-full h-full object-contain p-4" />
                 ) : (
                   <div className="text-center p-8 text-slate-700">
                     <Wand2 className="w-12 h-12 mb-4 mx-auto opacity-20" />
                     <p className="font-bold">Magic happens here</p>
                   </div>
                 )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-xs font-black text-fuchsia-400 uppercase tracking-[0.3em]">2. Describe Your Artistic Vision</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Make it look like a 90s rock album with vintage noise..."
                className="flex-grow p-6 rounded-2xl glass border-white/10 outline-none text-lg text-white placeholder:text-slate-600 focus:border-fuchsia-500/50 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              />
              <button
                onClick={handleEdit}
                disabled={!originalImage || !prompt || isLoading}
                className="px-10 py-6 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-fuchsia-600/20 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Apply Magic"}
              </button>
            </div>
          </div>
          
          {generatedImage && (
            <div className="flex gap-4 justify-end animate-fade-in">
              <a href={generatedImage} download="melodycraft-cover.png" className="px-8 py-4 glass border-white/10 hover:bg-white/10 text-white font-bold rounded-xl flex items-center gap-2">
                Download Art
              </a>
              <button onClick={() => { setOriginalImage(generatedImage); setGeneratedImage(null); }} className="px-8 py-4 bg-white text-slate-950 font-black rounded-xl flex items-center gap-2">
                Iterate <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
