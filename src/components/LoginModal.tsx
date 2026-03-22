import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, LogIn, Loader2 } from 'lucide-react';

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
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      onClose();
    }, 1500);
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
        className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Welcome Back</h2>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl glass border-white/10 outline-none text-white placeholder:text-slate-600 focus:border-indigo-500/50 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl glass border-white/10 outline-none text-white placeholder:text-slate-600 focus:border-indigo-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-widest"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <LogIn className="w-6 h-6" />}
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-slate-500 font-medium">
            Don't have an account? <button type="button" className="text-indigo-400 font-bold hover:underline">Sign up</button>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};