import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { TradeDetailsPage } from './components/TradeDetailsPage';
import { AuthModal } from './components/AuthModal';
import { TermsPage } from './components/TermsPage';
import { TradePro, ReviewComment } from './types';

const STORAGE_KEY = 'tradelink_specialists';

const INITIAL_PROS: Record<string, TradePro[]> = {
  auto: [
    {
      id: 'a1',
      name: 'Mike Ross',
      trade: 'Automotive Mechanic',
      companyName: 'Ross Performance & Tuning',
      email: 'mike.ross@rosstuning.com',
      phone: '+1 (555) 123-4567',
      rating: 4.9,
      reviews: 1,
      availability: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Engine Diagnostics',
      comments: [{ id: 'rc1', user: 'Client A', rating: 5, comment: 'Best mechanic in town. Highly recommended!', date: '2024-03-10' }]
    },
    {
      id: 'a2',
      name: 'Dom Toretto',
      trade: 'Tuning Specialist',
      companyName: 'Family Garage',
      email: 'dom@fastfamily.com',
      phone: '+1 (555) 999-0001',
      rating: 5.0,
      reviews: 1,
      availability: 'Busy',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Turbocharging',
      comments: [{ id: 'rc2', user: 'Brian O.', rating: 5, comment: 'Speed is everything. Dom delivered.', date: '2024-03-12' }]
    }
  ],
  electric: [
    {
      id: 'e1',
      name: 'Sarah Connor',
      trade: 'Electrician',
      companyName: 'Cyberdyne Electrical',
      email: 's.connor@cyberdyne.io',
      phone: '+1 (555) 987-6543',
      rating: 5.0,
      reviews: 1,
      availability: 'Busy',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Smart Home Install',
      comments: [{ id: 'rc3', user: 'Kyle R.', rating: 5, comment: 'Quick and efficient smart home setup.', date: '2024-03-05' }]
    },
    {
      id: 'e2',
      name: 'Nikola T.',
      trade: 'Master Electrician',
      companyName: 'Alternating Current Inc',
      email: 'nikola@wardenclyffe.com',
      phone: '+1 (555) 888-7777',
      rating: 4.8,
      reviews: 1,
      availability: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'High Voltage Grids',
      comments: [{ id: 'rc4', user: 'Thomas E.', rating: 4, comment: 'A bit unconventional but works!', date: '2024-02-28' }]
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
      rating: 4.9,
      reviews: 1,
      availability: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Industrial Sewage',
      comments: [{ id: 'rc5', user: 'Luigi R.', rating: 5, comment: 'My brother is the best. No leaks!', date: '2024-03-01' }]
    }
  ]
};

type ViewMode = 'home' | 'details' | 'terms';

function App() {
  const [view, setView] = useState<ViewMode>('home');
  const [activeTradeId, setActiveTradeId] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [specialists, setSpecialists] = useState<Record<string, TradePro[]>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_PROS;
  });

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

  const handleTermsClick = () => {
    setView('terms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddSpecialist = (tradeId: string, pro: TradePro) => {
    setSpecialists(prev => ({
      ...prev,
      [tradeId]: [pro, ...(prev[tradeId] || [])]
    }));
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
        onAuthOpen={() => setIsAuthOpen(true)} 
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

        {view === 'terms' && (
          <TermsPage onBack={handleBack} />
        )}
      </main>

      <Footer onTermsClick={handleTermsClick} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default App;
