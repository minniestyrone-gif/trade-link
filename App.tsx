import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { TradeDetailsPage } from './components/TradeDetailsPage';
import { AuthModal } from './components/AuthModal';
import { TradePro } from './types';

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
      reviews: 124,
      availability: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Engine Diagnostics'
    },
    {
      id: 'a2',
      name: 'Dom Toretto',
      trade: 'Tuning Specialist',
      companyName: 'Family Garage',
      email: 'dom@fastfamily.com',
      phone: '+1 (555) 999-0001',
      rating: 5.0,
      reviews: 340,
      availability: 'Busy',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Turbocharging'
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
      reviews: 89,
      availability: 'Busy',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Smart Home Install'
    },
    {
      id: 'e2',
      name: 'Nikola T.',
      trade: 'Master Electrician',
      companyName: 'Alternating Current Inc',
      email: 'nikola@wardenclyffe.com',
      phone: '+1 (555) 888-7777',
      rating: 4.8,
      reviews: 156,
      availability: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'High Voltage Grids'
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
      reviews: 500,
      availability: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=200',
      specialty: 'Industrial Sewage'
    }
  ]
};

function App() {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveTradeId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddSpecialist = (tradeId: string, pro: TradePro) => {
    setSpecialists(prev => ({
      ...prev,
      [tradeId]: [pro, ...(prev[tradeId] || [])]
    }));
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen selection:bg-cyan-500 selection:text-black">
      <Navbar 
        onAuthOpen={() => setIsAuthOpen(true)} 
        onHome={handleBack}
      />
      
      <main className="transition-all duration-500">
        {!activeTradeId ? (
          <div className="animate-in fade-in duration-700">
            <Hero onFindPro={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} />
            <Services onSelectTrade={handleSelectTrade} />
            <Testimonials />
          </div>
        ) : (
          <TradeDetailsPage 
            tradeId={activeTradeId} 
            onBack={handleBack} 
            pros={specialists[activeTradeId] || []}
            onAdd={handleAddSpecialist}
          />
        )}
      </main>

      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default App;