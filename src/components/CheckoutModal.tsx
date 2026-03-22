import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle, Loader2, Download } from 'lucide-react';
import { SongConcept } from '@/services/geminiService';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {step === 'form' && (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                Secure Checkout
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-8">
              <div className="mb-8 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p className="text-sm text-indigo-600 uppercase font-semibold mb-1">Order Summary</p>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-indigo-900 text-lg">
                    {item.type === 'concept' ? `Custom Song` : 'Complete Package + Distribution'}
                  </h3>
                  <span className="text-xl font-bold text-indigo-700">${item.price}</span>
                </div>
                {item.concept && (
                  <p className="text-xs text-indigo-400 mt-2 truncate">
                    Project: {item.concept.title} ({item.concept.genre})
                  </p>
                )}
              </div>

              <form onSubmit={handlePay} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000"
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Expiry</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">CVC</label>
                    <input 
                      type="text" 
                      placeholder="123"
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Pay ${item.price}
                </button>
              </form>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Processing Payment</h3>
            <p className="text-slate-500">Connecting to secure gateway...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h3>
            <p className="text-slate-600 mb-8 max-w-xs">
              Your order for <strong>{item.concept?.title || 'Custom Song'}</strong> has been sent to our production team.
            </p>
            
            <div className="flex flex-col gap-3 w-full">
                <button 
                onClick={downloadReceipt}
                className="px-6 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                <Download className="w-4 h-4" />
                Download Receipt (Debug)
                </button>

                <button 
                onClick={onClose}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors"
                >
                Done
                </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};