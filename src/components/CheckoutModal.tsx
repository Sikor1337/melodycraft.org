import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, Loader2, Mail } from 'lucide-react';
import { OrderItem, TIER_LABEL } from '../types';
import { STRIPE_PAYMENT_LINKS, CONTACT_EMAIL } from '../config';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: OrderItem | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, item }) => {
  const [redirecting, setRedirecting] = useState(false);

  if (!isOpen || !item) return null;

  const label = TIER_LABEL[item.tier];
  const paymentLink = STRIPE_PAYMENT_LINKS[item.tier];

  const summaryParts = [
    item.order.genre,
    item.order.occasion,
    item.order.forWhom && `for ${item.order.forWhom}`,
  ].filter(Boolean);

  const handlePay = () => {
    if (!paymentLink) return;
    setRedirecting(true);
    // Short reference so the order can be matched in Stripe; stash the brief
    // locally so it can be recovered/sent after the customer returns.
    const ref = `MC-${Date.now().toString(36).toUpperCase()}`;
    try {
      localStorage.setItem(`mc_order_${ref}`, JSON.stringify({ ...item.order, tier: item.tier, price: item.price }));
    } catch {
      /* ignore storage failures */
    }
    const sep = paymentLink.includes('?') ? '&' : '?';
    window.location.href = `${paymentLink}${sep}client_reference_id=${ref}`;
  };

  // Fallback when no Payment Link is configured yet: let the customer email the brief.
  const mailtoHref = (() => {
    const subject = `Custom song order — ${label} ($${item.price})`;
    const body = [
      `Plan: ${label} ($${item.price})`,
      `Style: ${item.order.genre}`,
      item.order.occasion && `Occasion: ${item.order.occasion}`,
      item.order.forWhom && `For: ${item.order.forWhom}`,
      '',
      'Story:',
      item.order.story,
    ]
      .filter(Boolean)
      .join('\n');
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  })();

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
        className="surface bg-stone-950 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-7 py-6 border-b border-white/8 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-tight">Checkout</h2>
          <button onClick={onClose} aria-label="Close" className="p-2 -mr-2 hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        <div className="p-7 space-y-7">
          <div className="surface rounded-xl p-5">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-white">{label}</span>
              <span className="text-xl font-bold text-accent">${item.price}</span>
            </div>
            {summaryParts.length > 0 && (
              <p className="text-sm text-stone-500 mt-2 capitalize">{summaryParts.join(' · ')}</p>
            )}
          </div>

          {paymentLink ? (
            <div className="space-y-4">
              <button
                onClick={handlePay}
                disabled={redirecting}
                className="w-full py-4 bg-accent hover:bg-accent/90 text-stone-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {redirecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Redirecting…
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Pay ${item.price} with Stripe
                  </>
                )}
              </button>
              <p className="text-center text-xs text-stone-500">
                You'll be taken to Stripe's secure checkout. Cards, Apple Pay & Google Pay supported.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="px-4 py-3 rounded-lg bg-accent/10 border border-accent/20 text-sm text-stone-300 leading-relaxed">
                Online payments are being set up. To place this order now, send us your brief and we'll
                reply with a secure payment link.
              </div>
              <a
                href={mailtoHref}
                className="w-full py-4 bg-accent hover:bg-accent/90 text-stone-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" /> Email my order
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
