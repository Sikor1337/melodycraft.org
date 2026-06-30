import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className="min-h-screen flex flex-col font-sans relative bg-neutral-950 text-white selection:bg-amber-400 selection:text-neutral-950 overflow-x-hidden"
    >
      <Navbar onLoginClick={() => setIsLoginOpen(true)} isLoggedIn={isLoggedIn} />

      <main className="flex-grow">
        <section id="home">
          <Hero onStartBuilder={() => handleStartBuilder()} />
        </section>

        <TrustedBy />

        <section id="how-it-works">
          <HowItWorks onStartBuilder={() => handleStartBuilder()} />
        </section>

        <AudioSamples />

        <Testimonials />

        <section id="pricing">
          <Pricing onSelectPlan={(tier) => handleStartBuilder('', tier)} />
        </section>

        <FAQ />
      </main>

      <section id="contact">
        <Footer />
      </section>

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
