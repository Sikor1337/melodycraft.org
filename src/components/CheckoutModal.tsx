import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, CheckCircle, Loader2 } from 'lucide-react';
import { OrderItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: OrderItem | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, item }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  if (!isOpen || !item) return null;

  const isPremium = item.tier === 'premium';

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    // Demo flow — a real backend would create the order and a payment intent here.
    setTimeout(() => setStep('success'), 1800);
  };

  const summaryParts = [
    item.order.genre,
    item.order.occasion,
    item.order.forWhom && `for ${item.order.forWhom}`,
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 16 }}
        className="surface bg-neutral-950 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
      >
        {step === 'form' && (
          <>
            <div className="px-7 py-6 border-b border-white/8 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white tracking-tight">Checkout</h2>
              <button onClick={onClose} aria-label="Close" className="p-2 -mr-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="p-7 space-y-7">
              <div className="surface rounded-xl p-5">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-white">
                    {isPremium ? 'Pro Release' : 'Custom Song'}
                  </span>
                  <span className="text-xl font-bold text-amber-400">${item.price}</span>
                </div>
                {summaryParts.length > 0 && (
                  <p className="text-sm text-neutral-500 mt-2 capitalize">{summaryParts.join(' · ')}</p>
                )}
              </div>

              <form onSubmit={handlePay} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-300">Card number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    required
                    className="w-full px-4 py-3 rounded-lg surface text-white font-mono placeholder:text-neutral-600 outline-none focus:border-amber-400/40 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-300">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      className="w-full px-4 py-3 rounded-lg surface text-white font-mono placeholder:text-neutral-600 outline-none focus:border-amber-400/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-300">CVC</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      required
                      className="w-full px-4 py-3 rounded-lg surface text-white font-mono placeholder:text-neutral-600 outline-none focus:border-amber-400/40 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Pay ${item.price}
                </button>
                <p className="text-center text-xs text-neutral-600">Demo checkout — no real payment is processed.</p>
              </form>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="p-16 flex flex-col items-center justify-center text-center gap-5">
            <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
            <p className="text-neutral-400 font-medium">Processing…</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 flex flex-col items-center justify-center text-center gap-6 animate-fade-in">
            <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Order confirmed</h3>
              <p className="text-neutral-400 max-w-xs mx-auto leading-relaxed">
                Your brief is with our production team. Expect your first draft within 24 hours.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-white text-neutral-950 font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
