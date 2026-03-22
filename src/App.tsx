import { useState } from 'react';
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

  const handleStartBuilder = (genre?: string, tier: 'standard' | 'premium' = 'standard') => {
    setSelectedGenre(genre || '');
    setSelectedTier(tier);
    setIsBuilderOpen(true);
  };

  const handleOrderSong = (concept: SongConcept) => {
    setIsBuilderOpen(false);
    // Determine price based on selected tier
    const price = selectedTier === 'premium' ? 99 : 49;
    setOrderItem({ 
      type: selectedTier === 'premium' ? 'release' : 'concept', 
      price, 
      concept 
    });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      <CursorTrace />
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="flex-grow">
        <div id="home">
          <Hero 
            onStartBuilder={() => handleStartBuilder(undefined, 'standard')} 
            onOpenArt={() => setIsArtOpen(true)}
          />
        </div>
        
        <TrustedBy />

        <div id="how-it-works">
          <HowItWorks />
        </div>

        <Pricing onSelectPlan={(tier) => handleStartBuilder(undefined, tier)} />
      </main>
      
      <div id="contact">
        <Footer />
      </div>
      
      <SongBuilderModal 
        isOpen={isBuilderOpen} 
        onClose={() => setIsBuilderOpen(false)} 
        initialGenre={selectedGenre}
        selectedTier={selectedTier}
        onOrder={handleOrderSong}
      />
      
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={() => setIsLoggedIn(true)}
      />

      <ImageEditorModal 
        isOpen={isArtOpen}
        onClose={() => setIsArtOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        item={orderItem}
      />
    </div>
  );
}

export default App;