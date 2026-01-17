import React from 'react';
import { Card } from './ui/Card';
import { Wrench, Droplets, Ruler, ChevronRight } from 'lucide-react';

export const SPECIALIZED_TRADES = [
  {
    id: 'auto',
    icon: Wrench,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    title: 'Automotive Mechanic',
    subtitle: 'Engine Diagnostics, Maintenance, Repair',
  },
  {
    id: 'plumbing',
    icon: Droplets,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    title: 'Plumbing Services',
    subtitle: 'Leak detection, Pipe repair, Installation',
  },
  {
    id: 'carpentry',
    icon: Ruler,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    title: 'Master Carpentry',
    subtitle: 'Custom furniture, Framing, Deck building',
  }
];

interface ServicesProps {
  onSelectTrade: (id: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectTrade }) => {
  return (
    <section id="services" className="py-24 bg-neutral-950 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-white">Battle-tested Trades</h2>
          <p className="text-gray-400">
            Our infrastructure connects you directly with the best. No middlemen, just skilled hands.
            Select a category to view all verified specialists.
          </p>
        </div>

        {/* Specialized Trades List */}
        <div className="pt-4">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Categories</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-xs text-cyan-500 uppercase font-bold tracking-wider">Live Network Status</span>
              </div>
           </div>
           
           <div className="flex flex-col gap-4">
             {SPECIALIZED_TRADES.map((widget) => (
               <div key={widget.id} onClick={() => onSelectTrade(widget.id)}>
                 <Card className="p-4 md:p-6 relative flex items-center group cursor-pointer border-white/5 hover:border-cyan-500/20" hoverEffect={true}>
                    <div className="flex items-center gap-6 pr-16">
                       <div className={`w-14 h-14 shrink-0 rounded-2xl ${widget.bg} flex items-center justify-center ${widget.color} border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                         <widget.icon className="w-7 h-7" />
                       </div>
                       <div>
                         <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{widget.title}</h4>
                         <p className="text-sm text-gray-400">{widget.subtitle}</p>
                       </div>
                    </div>
                    
                    {/* Arrow moved to far right corner/center */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                       <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500 transition-all duration-300 group-hover:translate-x-1">
                          <ChevronRight className="w-5 h-5" />
                       </div>
                    </div>
                 </Card>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};