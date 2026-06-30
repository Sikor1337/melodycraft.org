import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Demo auth — a real backend would verify credentials here.
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      onClose();
    }, 1200);
  };

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
        className="surface bg-stone-950 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-7 py-6 border-b border-white/8 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-tight">Welcome back</h2>
          <button onClick={onClose} aria-label="Close" className="p-2 -mr-2 hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-7 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg surface text-white placeholder:text-stone-600 outline-none focus:border-accent/40 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg surface text-white placeholder:text-stone-600 outline-none focus:border-accent/40 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-accent hover:bg-accent/90 text-stone-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-center text-sm text-stone-500">
            New here? <button type="button" className="text-accent font-medium hover:underline">Create an account</button>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};
