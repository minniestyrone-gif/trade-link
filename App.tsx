import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { TradeDetailsPage } from './components/TradeDetailsPage';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TradePro, ReviewComment } from './types';

const STORAGE_KEY = 'tradelink_specialists_v3';

const INITIAL_PROS: Record<string, TradePro[]> = {
  auto: [
    {
      id: 'a1',
      name: 'Mike Ross',
      trade: 'Automotive Mechanic',
      companyName: 'Ross Performance & Tuning',
      email: 'mike.ross@rosstuning.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      rating: 4.9,
      reviews: 42,
      availability: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Engine Diagnostics',
      comments: [{ id: 'rc1', user: 'Harvey S.', rating: 5, comment: 'Quickest diagnostic I have ever seen.', date: '2024-03-10' }]
    },
    {
      id: 'a2',
      name: 'Dom Toretto',
      trade: 'Tuning Specialist',
      companyName: 'Family Garage',
      email: 'dom@fastfamily.com',
      phone: '+1 (555) 999-0001',
      location: 'Los Angeles, CA',
      rating: 5.0,
      reviews: 120,
      availability: 'Busy',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Turbocharging',
      comments: [{ id: 'rc2', user: 'Brian O.', rating: 5, comment: 'Ten second car. Thanks Dom.', date: '2024-03-12' }]
    }
  ],
  plumbing: [
    {
      id: 'p1',
      name: 'Mario Rossi',
      trade: 'Plumber',
      companyName: 'Super Pipes Bros',
      email: 'mario@mushroom.it',
      phone: '+1 (555) 222-3333',
      location: 'Brooklyn, NY',
      rating: 4.9,
      reviews: 210,
      availability: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Industrial Sewage',
      comments: [{ id: 'rc5', user: 'Luigi R.', rating: 5, comment: 'No leaks in the castle!', date: '2024-03-01' }]
    }
  ],
  carpentry: [
    {
      id: 'c1',
      name: 'Woody Oak',
      trade: 'Master Carpenter',
      companyName: 'Fine Grain Studios',
      email: 'woody@finegrain.io',
      phone: '+1 (555) 777-1111',
      location: 'Seattle, WA',
      rating: 5.0,
      reviews: 58,
      availability: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Custom Cabinetry',
      comments: [{ id: 'rc7', user: 'Alice L.', rating: 5, comment: 'The kitchen looks stunning.', date: '2024-04-10' }]
    }
  ]
};

type ViewMode = 'home' | 'details' | 'terms' | 'privacy';

function App() {
  const [view, setView] = useState<ViewMode>('home');
  const [activeTradeId, setActiveTradeId] = useState<string | null>(null);
  
  // Specialists state now correctly typed as Record<string, TradePro[]>
  const [specialists, setSpecialists] = useState<Record<string, TradePro[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error loading specialists from storage:", e);
    }
    return INITIAL_PROS;
  });

  // Effect to sync specialists to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(specialists));
  }, [specialists]);

  const handleSelectTrade = (tradeId: string) => {
    setActiveTradeId(tradeId);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveTradeId(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddSpecialist = (tradeId: string, pro: TradePro) => {
    setSpecialists(prev => {
      const updatedList = [pro, ...(prev[tradeId] || [])];
      return {
        ...prev,
        [tradeId]: updatedList
      };
    });
  };

  const handleUpdateProRating = (tradeId: string, proId: string, newRatingValue: number, comment?: string) => {
    setSpecialists(prev => {
      const tradePros = [...(prev[tradeId] || [])];
      const proIndex = tradePros.findIndex(p => p.id === proId);
      if (proIndex === -1) return prev;

      const pro = tradePros[proIndex];
      const totalScore = pro.rating * pro.reviews;
      const updatedReviews = pro.reviews + 1;
      const updatedRating = (totalScore + newRatingValue) / updatedReviews;

      const newComment: ReviewComment = {
        id: Date.now().toString(),
        user: 'Verified Client',
        rating: newRatingValue,
        comment: comment || 'Service completed successfully.',
        date: new Date().toISOString().split('T')[0]
      };

      tradePros[proIndex] = {
        ...pro,
        rating: Number(updatedRating.toFixed(1)),
        reviews: updatedReviews,
        comments: [newComment, ...(pro.comments || [])]
      };

      return {
        ...prev,
        [tradeId]: tradePros
      };
    });
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen selection:bg-cyan-500 selection:text-black">
      <Navbar 
        onHome={handleBack}
      />
      
      <main className="transition-all duration-500">
        {view === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero onFindPro={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} />
            <Services onSelectTrade={handleSelectTrade} />
            <Testimonials />
          </div>
        )}

        {view === 'details' && activeTradeId && (
          <TradeDetailsPage 
            tradeId={activeTradeId} 
            onBack={handleBack} 
            pros={specialists[activeTradeId] || []}
            onAdd={handleAddSpecialist}
            onReview={handleUpdateProRating}
          />
        )}

        {view === 'terms' && <TermsPage onBack={handleBack} />}
        {view === 'privacy' && <PrivacyPage onBack={handleBack} />}
      </main>

      <Footer 
        onTermsClick={() => { setView('terms'); window.scrollTo(0, 0); }} 
        onPrivacyClick={() => { setView('privacy'); window.scrollTo(0, 0); }} 
      />
    </div>
  );
}

export default App;