import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Wrench, Zap, Droplets, X, CheckCircle, Thermometer, Ruler, Paintbrush, Lock, ChevronRight } from 'lucide-react';
import { TradePro } from '../types';

const TRADES_DATA: TradePro[] = [
  {
    id: '1',
    name: 'Mike Ross',
    trade: 'Master Mechanic',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 85,
    availability: 'Available',
    imageUrl: 'https://picsum.photos/200/200?random=101',
    specialty: 'Engine Diagnostics'
  },
  {
    id: '2',
    name: 'Sarah Connor',
    trade: 'Electrician',
    rating: 5.0,
    reviews: 89,
    hourlyRate: 95,
    availability: 'Busy',
    imageUrl: 'https://picsum.photos/200/200?random=102',
    specialty: 'Smart Home Install'
  },
  {
    id: '3',
    name: 'Davos S.',
    trade: 'Plumber',
    rating: 4.8,
    reviews: 210,
    fixedPriceStart: 120,
    availability: 'Available',
    imageUrl: 'https://picsum.photos/200/200?random=103',
    specialty: 'Leak Detection'
  },
  {
    id: '4',
    name: 'Gendry B.',
    trade: 'General Contractor',
    rating: 4.7,
    reviews: 56,
    hourlyRate: 60,
    availability: 'Offline',
    imageUrl: 'https://picsum.photos/200/200?random=104',
    specialty: 'Renovations'
  }
];

const SPECIALIZED_TRADES = [
  {
    id: 'auto',
    icon: Wrench,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    title: 'Automotive Mechanic',
    subtitle: 'Engine Diagnostics, Maintenance, Repair',
    trend: 'High Demand',
    linkedProId: '1'
  },
  {
    id: 'electric',
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    title: 'Electrical Services',
    subtitle: 'Smart home, Wiring, High voltage',
    trend: 'Urgent',
    linkedProId: '2'
  },
  {
    id: 'plumbing',
    icon: Droplets,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    title: 'Plumbing Services',
    subtitle: 'Leak detection, Pipe repair, Installation',
    trend: 'Consistent',
    linkedProId: '3'
  },
  {
    id: 'hvac',
    icon: Thermometer,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    title: 'HVAC & Cooling',
    subtitle: 'AC Repair, Heating installation, Ductwork',
    trend: 'High Demand',
    linkedProId: '4'
  },
  {
    id: 'carpentry',
    icon: Ruler,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    title: 'Master Carpentry',
    subtitle: 'Custom furniture, Framing, Deck building',
    trend: 'Steady'
  },
  {
    id: 'paint',
    icon: Paintbrush,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    title: 'Painting & Decor',
    subtitle: 'Interior, Exterior, Texturing, Wallpaper',
    trend: 'Available'
  },
  {
    id: 'lock',
    icon: Lock,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    title: 'Locksmith Services',
    subtitle: 'Emergency lockout, Security install, Rekeying',
    trend: 'Urgent'
  }
];

export const Services: React.FC = () => {
  const [selectedPro, setSelectedPro] = useState<TradePro | null>(null);

  const handleTradeClick = (proId?: string) => {
    if (proId) {
      const pro = TRADES_DATA.find(p => p.id === proId);
      if (pro) setSelectedPro(pro);
    }
  };

  return (
    <section id="services" className="py-24 bg-neutral-950 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-white">Battle-tested Trades</h2>
          <p className="text-gray-400">
            Our infrastructure connects you directly with the best. No middlemen, just skilled hands.
            Select a specialized trade below to request a quote.
          </p>
        </div>

        {/* Specialized Trades List */}
        <div className="pt-4">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Specialized Trades</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-xs text-cyan-500 uppercase font-bold tracking-wider">Live Network Status</span>
              </div>
           </div>
           
           <div className="flex flex-col gap-4">
             {SPECIALIZED_TRADES.map((widget) => (
               <div key={widget.id} onClick={() => handleTradeClick(widget.linkedProId)}>
                 <Card className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between group cursor-pointer border-white/5 hover:border-white/10" hoverEffect={true}>
                    <div className="flex items-center gap-6 mb-4 md:mb-0">
                       <div className={`w-14 h-14 shrink-0 rounded-2xl ${widget.bg} flex items-center justify-center ${widget.color} border border-white/5`}>
                         <widget.icon className="w-7 h-7" />
                       </div>
                       <div>
                         <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{widget.title}</h4>
                         <p className="text-sm text-gray-400">{widget.subtitle}</p>
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:gap-12 w-full md:w-auto">
                       <div className="flex items-center gap-4 ml-auto">
                          <div className={`text-xs font-medium px-3 py-1 rounded-full border ${
                            widget.trend === 'High Demand' || widget.trend === 'Urgent' 
                              ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                              : 'bg-green-500/10 text-green-400 border-green-500/20'
                          }`}>
                            {widget.trend}
                          </div>
                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                             <ChevronRight className="w-5 h-5" />
                          </div>
                       </div>
                    </div>
                 </Card>
               </div>
             ))}
           </div>
        </div>

      </div>

      {/* Quote Modal */}
      {selectedPro && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-6 relative">
              <button 
                onClick={() => setSelectedPro(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                 <img src={selectedPro.imageUrl} className="w-16 h-16 rounded-full border-2 border-white/10" alt={selectedPro.name} />
                 <div>
                    <h3 className="text-xl font-bold text-white">Request Quote</h3>
                    <p className="text-gray-400 text-sm">from {selectedPro.name} ({selectedPro.trade})</p>
                 </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Quote Sent!"); setSelectedPro(null); }}>
                 <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Issue Description</label>
                    <textarea 
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors h-24 resize-none"
                      placeholder="Describe what needs fixing..."
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Preferred Date</label>
                      <input type="date" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Zip Code</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" placeholder="10001" />
                    </div>
                 </div>

                 <div className="pt-2">
                    <Button type="submit" className="w-full justify-center">Send Request</Button>
                    <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                      <CheckCircle className="w-3 h-3" /> No payment required until job completion
                    </p>
                 </div>
              </form>
           </div>
        </div>
      )}
    </section>
  );
};