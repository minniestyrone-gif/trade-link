import React, { useState, useMemo } from 'react';
import { ArrowLeft, Plus, User, Phone, Mail, Building2, Star, CheckCircle, X, Search, Filter } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { TradePro } from '../types';
import { SPECIALIZED_TRADES } from './Services';

interface TradeDetailsPageProps {
  tradeId: string;
  onBack: () => void;
  pros: TradePro[];
  onAdd: (tradeId: string, pro: TradePro) => void;
}

export const TradeDetailsPage: React.FC<TradeDetailsPageProps> = ({ tradeId, onBack, pros, onAdd }) => {
  const tradeInfo = SPECIALIZED_TRADES.find(t => t.id === tradeId);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [newPro, setNewPro] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    specialty: ''
  });

  const filteredPros = useMemo(() => {
    return pros.filter(pro => 
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pros, searchQuery]);

  const handleAddPro = (e: React.FormEvent) => {
    e.preventDefault();
    const added: TradePro = {
      id: Date.now().toString(),
      name: newPro.name,
      trade: tradeInfo?.title || 'Specialist',
      companyName: newPro.company,
      email: newPro.email,
      phone: newPro.phone,
      rating: 5.0,
      reviews: 0,
      availability: 'Available',
      imageUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&q=80&w=200&h=200`,
      specialty: newPro.specialty
    };
    onAdd(tradeId, added);
    setIsAdding(false);
    setNewPro({ name: '', company: '', email: '', phone: '', specialty: '' });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-neutral-950">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="flex items-center gap-6">
              <button 
                onClick={onBack}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-all shadow-lg"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                 <div className="flex items-center gap-3">
                   <h1 className="text-3xl md:text-5xl font-bold text-white">
                      {tradeInfo?.title}
                   </h1>
                   <div className={`w-3 h-3 rounded-full ${tradeInfo?.color.replace('text', 'bg')} animate-pulse mt-2`} />
                 </div>
                 <p className="text-gray-400 mt-2 text-lg">{tradeInfo?.subtitle}</p>
              </div>
           </div>
           <Button onClick={() => setIsAdding(true)} className="gap-2 px-8">
             <Plus size={18} /> Register as Expert
           </Button>
        </div>

        {/* Search & Filter Bar */}
        <div className="relative group">
           <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
             <Search size={18} />
           </div>
           <input 
             type="text" 
             placeholder={`Search ${tradeInfo?.title} specialists by name, company or skill...`}
             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>

        {/* Directory List */}
        <div className="grid gap-6">
          {filteredPros.length > 0 ? (
            filteredPros.map((pro) => (
              <Card key={pro.id} className="p-8 border-white/5 hover:border-cyan-500/30 shadow-xl" hoverEffect={true}>
                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                       <img src={pro.imageUrl} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/10 shadow-lg" alt={pro.name} />
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                             <h3 className="text-2xl font-bold text-white">{pro.name}</h3>
                             <div className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest ${pro.availability === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {pro.availability.toUpperCase()}
                             </div>
                          </div>
                          <p className="text-cyan-400 text-sm font-medium">{pro.specialty}</p>
                          <div className="flex items-center gap-2 mt-2">
                             <div className="flex text-yellow-500 gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(pro.rating) ? "currentColor" : "none"} />)}
                             </div>
                             <span className="text-gray-500 text-xs font-medium">{pro.reviews} verified reviews</span>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-6 lg:gap-12">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-500">
                             <Building2 size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Company</p>
                             <p className="text-white text-sm font-medium">{pro.companyName}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-500">
                             <Phone size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Contact</p>
                             <p className="text-white text-sm font-medium">{pro.phone}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-500">
                             <Mail size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Email</p>
                             <p className="text-white text-sm font-medium truncate max-w-[140px]">{pro.email}</p>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-3">
                       <Button variant="outline" className="flex-1 lg:flex-none" onClick={() => window.open(`mailto:${pro.email}`)}>Email</Button>
                       <Button className="flex-1 lg:flex-none shadow-cyan-500/20 shadow-lg" onClick={() => window.open(`tel:${pro.phone}`)}>Call Now</Button>
                    </div>
                 </div>
              </Card>
            ))
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/2 backdrop-blur-sm">
               <User className="w-16 h-16 text-gray-700 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-gray-300">No experts found</h3>
               <p className="text-gray-500 mt-2">Try adjusting your search or be the first to register in this category.</p>
               <Button variant="ghost" className="mt-6 border border-white/10 hover:bg-white/5" onClick={() => setIsAdding(true)}>Be the first expert</Button>
            </div>
          )}
        </div>

        {/* Registration Modal */}
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in zoom-in duration-300">
             <div className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
                <div className="mb-8">
                   <h2 className="text-3xl font-bold text-white mb-2">Expert Onboarding</h2>
                   <p className="text-gray-400">Join the <span className="text-cyan-400 font-bold">{tradeInfo?.title}</span> network.</p>
                </div>
                
                <form className="space-y-5" onSubmit={handleAddPro}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input required value={newPro.name} onChange={e => setNewPro({...newPro, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700" placeholder="e.g. John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Company Name</label>
                        <input required value={newPro.company} onChange={e => setNewPro({...newPro, company: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700" placeholder="e.g. Apex Mechanics" />
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Specific Skillset / Specialty</label>
                      <input required value={newPro.specialty} onChange={e => setNewPro({...newPro, specialty: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700" placeholder="e.g. Master Engine Rebuilds" />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                        <input required value={newPro.phone} onChange={e => setNewPro({...newPro, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Work Email</label>
                        <input required type="email" value={newPro.email} onChange={e => setNewPro({...newPro, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700" placeholder="contact@expert.com" />
                      </div>
                   </div>

                   <div className="pt-4 space-y-4">
                      <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg shadow-cyan-500/10">Submit for Verification</Button>
                      <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                         <CheckCircle size={12} className="text-cyan-500" />
                         Automated Identity Sync Active
                      </div>
                   </div>
                </form>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};