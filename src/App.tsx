import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { SongBuilderModal } from './components/SongBuilderModal';
import { ImageEditorModal } from './components/ImageEditorModal';
import { CursorTrace } from './components/CursorTrace';
import { LoginModal } from './components/LoginModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Pricing } from './components/Pricing';
import { TrustedBy } from './components/TrustedBy';
import { SongConcept } from './services/geminiService';

interface OrderItem {
  type: 'concept' | 'release';
  price: number;
  concept?: SongConcept;
}

function App() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<'standard' | 'premium'>('standard');
  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);

  // Smooth scroll to sections
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleStartBuilder = (genre?: string, tier: 'standard' | 'premium' = 'standard') => {
    setSelectedGenre(genre || '');
    setSelectedTier(tier);
    setIsBuilderOpen(true);
  };

  const handleOrderSong = (concept: SongConcept) => {
    setIsBuilderOpen(false);
    const price = selectedTier === 'premium' ? 99 : 49;
    setOrderItem({ 
      type: selectedTier === 'premium' ? 'release' : 'concept', 
      price, 
      concept 
    });
    setIsCheckoutOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col font-sans relative bg-slate-950 text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden"
    >
      <CursorTrace />
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="flex-grow">
        <section id="home">
          <Hero 
            onStartBuilder={() => handleStartBuilder(undefined, 'standard')} 
            onOpenArt={() => setIsArtOpen(true)}
          />
        </section>
        
        <TrustedBy />

        <section id="how-it-works">
          <HowItWorks onStartBuilder={() => handleStartBuilder(undefined, 'standard')} />
        </section>

        <section id="pricing">
          <Pricing onSelectPlan={(tier: 'standard' | 'premium') => handleStartBuilder(undefined, tier)} />
        </section>
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

        {isArtOpen && (
          <ImageEditorModal 
            isOpen={isArtOpen}
            onClose={() => setIsArtOpen(false)}
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
