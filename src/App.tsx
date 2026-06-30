import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { AudioSamples } from './components/AudioSamples';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { SongBuilderModal } from './components/SongBuilderModal';
import { LoginModal } from './components/LoginModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Pricing } from './components/Pricing';
import { TrustedBy } from './components/TrustedBy';
import { OrderItem, SongOrder, Tier, TIER_PRICE } from './types';

function App() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedTier, setSelectedTier] = useState<Tier>('standard');
  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);

  // Show a thank-you banner when Stripe redirects back with ?paid=1.
  const [paid, setPaid] = useState(() => new URLSearchParams(window.location.search).get('paid') === '1');

  // Smooth-scroll when navigating to in-page section anchors.
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const dismissPaid = () => {
    setPaid(false);
    // Clean the ?paid=1 param from the URL without reloading.
    window.history.replaceState({}, '', window.location.pathname);
  };

  const handleStartBuilder = (genre = '', tier: Tier = 'standard') => {
    setSelectedGenre(genre);
    setSelectedTier(tier);
    setIsBuilderOpen(true);
  };

  const handleOrderSong = (order: SongOrder) => {
    setIsBuilderOpen(false);
    setOrderItem({ tier: selectedTier, price: TIER_PRICE[selectedTier], order });
    setIsCheckoutOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col font-sans relative bg-stone-950 text-white selection:bg-accent selection:text-stone-950 overflow-x-hidden"
    >
      <Navbar onLoginClick={() => setIsLoginOpen(true)} isLoggedIn={isLoggedIn} />

      <AnimatePresence>
        {paid && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[120] w-[calc(100%-2rem)] max-w-md"
          >
            <div className="surface bg-stone-900 rounded-xl px-5 py-4 shadow-2xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-white">Payment received — thank you!</p>
                <p className="text-stone-400 mt-0.5">Your order is with our production team. Expect your first draft within 24 hours.</p>
              </div>
              <button onClick={dismissPaid} aria-label="Dismiss" className="p-1 -mr-1 -mt-1 text-stone-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <Hero onStartBuilder={() => handleStartBuilder()} />
        <TrustedBy />
        <HowItWorks onStartBuilder={() => handleStartBuilder()} />
        <AudioSamples />
        <Testimonials />
        <Pricing onSelectPlan={(tier) => handleStartBuilder('', tier)} />
        <FAQ />
      </main>

      <Footer />

      <AnimatePresence>
        {isBuilderOpen && (
          <SongBuilderModal
            isOpen={isBuilderOpen}
            onClose={() => setIsBuilderOpen(false)}
            initialGenre={selectedGenre}
            selectedTier={selectedTier}
            onOrder={handleOrderSong}
          />
        )}

        {isLoginOpen && (
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onLogin={() => setIsLoggedIn(true)}
          />
        )}

        {isCheckoutOpen && (
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            item={orderItem}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
