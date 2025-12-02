import React, { useState, useRef } from 'react';
import { X, Loader2, Image as ImageIcon, Wand2, Upload, ArrowRight } from 'lucide-react';
import { editImage } from '../services/geminiService';

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
      // Extract base64 data and mime type
      const [header, base64Data] = originalImage.split(',');
      const mimeType = header.split(':')[1].split(';')[0];

      const resultBase64 = await editImage(base64Data, mimeType, prompt);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (error) {
      console.error(error);
      alert("Failed to edit image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Wand2 className="w-6 h-6 text-purple-600" />
              Album Art Studio
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Refine your album cover with AI magic.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Input Side */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                1. Upload Original Image
              </label>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center transition-all ${
                  originalImage ? 'border-indigo-300 bg-indigo-50/30' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
                
                {originalImage ? (
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="w-full h-full object-contain p-2 rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-400 p-4 text-center">
                    <Upload className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">Click to upload image</p>
                    <p className="text-xs mt-1">Supports JPG, PNG</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                 <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  2. Describe Changes
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Add a retro vintage filter, make the background blue..."
                    className="w-full p-4 pr-12 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-slate-700 font-medium placeholder:font-normal"
                    onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Wand2 className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleEdit}
                disabled={!originalImage || !prompt || isLoading}
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5" />
                    Generate Edit
                  </>
                )}
              </button>
            </div>

            {/* Output Side */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Result
              </label>
              
              <div className="border border-slate-200 rounded-xl h-64 bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
                 {isLoading && (
                   <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-10 flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
                        <p className="text-purple-900 font-semibold animate-pulse">Designing...</p>
                      </div>
                   </div>
                 )}
                 
                 {generatedImage ? (
                   <img 
                    src={generatedImage} 
                    alt="Generated" 
                    className="w-full h-full object-contain p-2"
                   />
                 ) : (
                   <div className="flex flex-col items-center text-slate-300 p-8 text-center">
                     <ImageIcon className="w-12 h-12 mb-3 opacity-50" />
                     <p>Your edited image will appear here</p>
                   </div>
                 )}
              </div>
              
              {generatedImage && (
                <div className="flex gap-3">
                   <a 
                    href={generatedImage} 
                    download="melodycraft-art.png"
                    className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors flex justify-center items-center gap-2"
                  >
                    Download
                  </a>
                  <button 
                     onClick={() => {
                       setOriginalImage(generatedImage);
                       setGeneratedImage(null);
                       setPrompt('');
                     }}
                     className="flex-1 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl transition-colors flex justify-center items-center gap-2"
                  >
                    Use as Base <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};