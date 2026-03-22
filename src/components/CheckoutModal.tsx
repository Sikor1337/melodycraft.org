import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle, Loader2, Download } from 'lucide-react';
import { SongConcept } from '../services/geminiService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    type: 'concept' | 'release';
    price: number;
    concept?: SongConcept;
  } | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, item }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  if (!isOpen || !item) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    // MOCK: Construct the order payload that would be sent to the backend
    const payload = {
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date().toISOString(),
      customer: {
        email: "user@example.com", // In a real app, from the form or auth
        paymentMethod: "Credit Card (Stripe Token)"
      },
      product: {
        type: item.type,
        price: item.price,
        currency: "USD"
      },
      songDetails: item.concept || {
        title: "Untitled Project",
        genre: "Not specified",
        mood: "Not specified",
        lyricsSnippet: "No lyrics provided"
      }
    };

    // LOGGING FOR DEMO PURPOSES
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🚀 SIMULATING ORDER SUBMISSION TO DATABASE");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("ENDPOINT: POST /api/orders");
    console.log("PAYLOAD:", JSON.stringify(payload, null, 2));
    
    setOrderDetails(payload);

    // Simulate network delay
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const downloadReceipt = () => {
    if (!orderDetails) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orderDetails, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "order_receipt.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
      >
        
        {step === 'form' && (
          <>
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
              <h2 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                <CreditCard className="w-6 h-6 text-indigo-500" />
                Secure Checkout
              </h2>
              <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div className="bg-indigo-500/5 p-6 rounded-2xl border border-indigo-500/20">
                <p className="text-[10px] text-indigo-400 uppercase font-black tracking-[0.3em] mb-3">Order Summary</p>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-xl">
                    {item.type === 'concept' ? `Custom Song` : 'Complete Package + Distribution'}
                  </h3>
                  <span className="text-2xl font-black text-indigo-400">${item.price}</span>
                </div>
                {item.concept && (
                  <p className="text-xs text-slate-500 mt-3 font-medium">
                    Project: {item.concept.title} ({item.concept.genre})
                  </p>
                )}
              </div>

              <form onSubmit={handlePay} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000"
                    required
                    className="w-full p-4 rounded-xl glass border-white/10 outline-none text-white font-mono focus:border-indigo-500/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Expiry</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      required
                      className="w-full p-4 rounded-xl glass border-white/10 outline-none text-white font-mono focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">CVC</label>
                    <input 
                      type="text" 
                      placeholder="123"
                      required
                      className="w-full p-4 rounded-xl glass border-white/10 outline-none text-white font-mono focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-widest"
                >
                  <Lock className="w-5 h-5" />
                  Pay ${item.price}
                </button>
              </form>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="p-20 flex flex-col items-center justify-center text-center space-y-6">
            <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
            <div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Processing Payment</h3>
              <p className="text-slate-500 font-medium">Connecting to secure gateway...</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="p-20 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">Order Confirmed!</h3>
              <p className="text-slate-400 font-medium max-w-xs mx-auto">
                Your order for <strong className="text-white">{item.concept?.title || 'Custom Song'}</strong> has been sent to our production team.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full">
                <button 
                  onClick={downloadReceipt}
                  className="px-8 py-4 glass border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>

                <button 
                  onClick={onClose}
                  className="px-8 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-sm"
                >
                  Done
                </button>
            </div>
          </div>
        )}

      </motion.div>
    </motion.div>
  );
};