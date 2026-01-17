import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowLeft, Plus, User, Phone, Mail, Building2, Star, CheckCircle, X, Search, MessageSquare, Calendar, Camera, Upload, CreditCard, ShieldCheck, Lock, ArrowRight, BellRing, BadgeCheck, Database, MapPin } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { TradePro, ReviewComment } from '../types';
import { SPECIALIZED_TRADES } from './Services';

interface TradeDetailsPageProps {
  tradeId: string;
  onBack: () => void;
  pros: TradePro[];
  onAdd: (tradeId: string, pro: TradePro) => void;
  onReview: (tradeId: string, proId: string, rating: number, comment?: string) => void;
}

type RegistrationStep = 'details' | 'payment' | 'processing' | 'success';

export const TradeDetailsPage: React.FC<TradeDetailsPageProps> = ({ tradeId, onBack, pros, onAdd, onReview }) => {
  const tradeInfo = SPECIALIZED_TRADES.find(t => t.id === tradeId);
  const [isAdding, setIsAdding] = useState(false);
  const [regStep, setRegStep] = useState<RegistrationStep>('details');
  const [reviewingProId, setReviewingProId] = useState<string | null>(null);
  const [viewingReviewsProId, setViewingReviewsProId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  
  const registrationFileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const [editingProId, setEditingProId] = useState<string | null>(null);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const [newPro, setNewPro] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    specialty: '',
    imageUrl: ''
  });

  const filteredPros = useMemo(() => {
    return pros.filter(pro => 
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pros, searchQuery]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (type: 'call' | 'email', value: string) => {
    showToast(`Connecting to specialist via ${type}...`);
    setTimeout(() => {
      window.location.href = type === 'call' ? `tel:${value}` : `mailto:${value}`;
    }, 500);
  };

  const handleJoinClick = () => {
    setRegStep('details');
    setIsAdding(true);
  };

  const goToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setRegStep('payment');
  };

  const handleExternalPaymentClick = () => {
    // Immediate feedback for the user
    setRegStep('processing');
    
    // Simulate sending email notification to the master address
    console.log("Subscribing expert. Sending reminder notification to: elevatesolutions26@gmail.com");
    
    // Prepare the pro object with verification flags for database persistence
    const finalImageUrl = newPro.imageUrl || `ICON_FALLBACK_${tradeId}`;
    const added: TradePro = {
      id: Date.now().toString(),
      name: newPro.name,
      trade: tradeInfo?.title || 'Specialist',
      companyName: newPro.company,
      email: newPro.email,
      phone: newPro.phone,
      location: newPro.location,
      rating: 5.0,
      reviews: 0,
      availability: 'Available',
      imageUrl: finalImageUrl,
      specialty: newPro.specialty,
      comments: [],
      isVerified: true,
      isSubscriptionActive: true
    };
    
    // Persist permanently to the app database via the provided onAdd callback
    onAdd(tradeId, added);

    // Simulate a brief processing delay before success UI
    setTimeout(() => {
      setRegStep('success');
      showToast("Profile Added to Database");
      
      setTimeout(() => {
        setIsAdding(false);
        setNewPro({ name: '', company: '', email: '', phone: '', location: '', specialty: '', imageUrl: '' });
      }, 5000);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isRegistration: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isRegistration) {
          setNewPro(prev => ({ ...prev, imageUrl: reader.result as string }));
        } else if (editingProId) {
          const proIndex = pros.findIndex(p => p.id === editingProId);
          if (proIndex !== -1) {
             pros[proIndex].imageUrl = reader.result as string;
             setEditingProId(null);
             showToast("Profile image updated.");
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewingProId) {
      onReview(tradeId, reviewingProId, reviewRating, reviewComment);
      setReviewingProId(null);
      setReviewRating(5);
      setReviewComment('');
      showToast("Thank you for your feedback!");
    }
  };

  const reviewingPro = pros.find(p => p.id === reviewingProId);
  const viewingReviewsPro = pros.find(p => p.id === viewingReviewsProId);

  const renderProfileImage = (imageUrl: string, sizeClass: string = "w-20 h-20", isCard: boolean = false, proId?: string) => {
    const isIcon = imageUrl.startsWith('ICON_FALLBACK_');
    const Icon = tradeInfo?.icon || User;

    return (
      <div className={`relative group/avatar cursor-pointer ${sizeClass} rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg bg-neutral-900 flex items-center justify-center`}
           onClick={() => isCard && proId ? (setEditingProId(proId), editFileRef.current?.click()) : null}>
        {isIcon ? (
          <div className={`w-full h-full flex items-center justify-center ${tradeInfo?.bg} ${tradeInfo?.color}`}>
            <Icon size={isCard ? 32 : 48} />
          </div>
        ) : (
          <img src={imageUrl} className="w-full h-full object-cover" alt="Profile" />
        )}
        
        {isCard && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity">
            <Camera size={20} className="text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-neutral-950">
      <input type="file" ref={editFileRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, false)} />
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-cyan-600 text-white px-6 py-3 rounded-full shadow-2xl animate-in slide-in-from-top-10 duration-300 font-bold text-sm">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-10">
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
                   <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                      {tradeInfo?.title}
                   </h1>
                   <div className={`w-3 h-3 rounded-full ${tradeInfo?.color.replace('text', 'bg')} animate-pulse mt-2`} />
                 </div>
                 <p className="text-gray-400 mt-2 text-lg">{tradeInfo?.subtitle}</p>
              </div>
           </div>
           <Button onClick={handleJoinClick} className="gap-2 px-8">
             <Plus size={18} /> Join as Expert
           </Button>
        </div>

        <div className="relative group">
           <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
             <Search size={18} />
           </div>
           <input 
             type="text" 
             placeholder={`Filter ${tradeInfo?.title} by name, company, skill or location...`}
             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-sm shadow-inner"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>

        <div className="grid gap-6">
          {filteredPros.length > 0 ? (
            filteredPros.map((pro) => (
              <Card key={pro.id} className="p-8 border-white/5 hover:border-cyan-500/30 shadow-xl" hoverEffect={true}>
                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                       {renderProfileImage(pro.imageUrl, "w-20 h-20", true, pro.id)}
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                             <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                               {pro.name}
                               {pro.isVerified && (
                                 <BadgeCheck className="text-cyan-500" size={20} />
                               )}
                             </h3>
                             <div className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest ${pro.availability === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {pro.availability.toUpperCase()}
                             </div>
                          </div>
                          <p className="text-cyan-400 text-sm font-medium">{pro.specialty}</p>
                          <div className="flex items-center gap-2 mt-2">
                             <div className="flex text-yellow-500 gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(pro.rating) ? "currentColor" : "none"} />)}
                             </div>
                             <button 
                               onClick={() => setViewingReviewsProId(pro.id)}
                               className="text-gray-500 text-xs font-medium hover:text-cyan-400 transition-colors underline decoration-dotted underline-offset-4"
                             >
                               {pro.reviews} reviews ({pro.rating})
                             </button>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-6 lg:gap-12">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-500 shadow-inner">
                             <Building2 size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Entity</p>
                             <p className="text-white text-sm font-medium">{pro.companyName}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-500 shadow-inner">
                             <MapPin size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Location</p>
                             <p className="text-white text-sm font-medium">{pro.location}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-500 shadow-inner">
                             <Phone size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Line</p>
                             <p className="text-white text-sm font-medium">{pro.phone}</p>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                       <Button variant="ghost" size="sm" className="gap-2 border border-white/5 hover:border-cyan-500/30" onClick={() => setReviewingProId(pro.id)}>
                         <MessageSquare size={16} /> Review
                       </Button>
                       <Button variant="outline" size="sm" onClick={() => handleAction('email', pro.email)}>Email</Button>
                       <Button size="sm" className="shadow-cyan-500/20 shadow-lg" onClick={() => handleAction('call', pro.phone)}>Call Now</Button>
                    </div>
                 </div>
              </Card>
            ))
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/2 backdrop-blur-sm">
               <User className="w-16 h-16 text-gray-700 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-gray-300">No experts found</h3>
               <p className="text-gray-500 mt-2">Try adjusting your filter or join as the first pro.</p>
               <Button variant="ghost" className="mt-6 border border-white/10 hover:bg-white/5" onClick={handleJoinClick}>Be the first expert</Button>
            </div>
          )}
        </div>

        {/* Multi-step Expert Registration with Yoco */}
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in zoom-in duration-300">
             <div className="w-full max-w-xl bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl p-8 relative overflow-y-auto max-h-[90vh]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />
                <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2">
                  <X size={24} />
                </button>

                {regStep === 'details' && (
                  <div className="animate-in slide-in-from-right-10 duration-500">
                    <div className="mb-8">
                       <h2 className="text-3xl font-bold text-white mb-2">Expert Application</h2>
                       <p className="text-gray-400">
                         Register your profile for the <span className="text-cyan-400 font-bold">{tradeInfo?.title}</span> network
                       </p>
                    </div>

                    <form className="space-y-5" onSubmit={goToPayment}>
                       <div className="flex flex-col items-center gap-4 mb-6">
                          <div className="relative group/upload cursor-pointer" onClick={() => registrationFileRef.current?.click()}>
                             {renderProfileImage(newPro.imageUrl || `ICON_FALLBACK_${tradeId}`, "w-28 h-28")}
                             <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-cyan-500 border-2 border-neutral-900 flex items-center justify-center text-black">
                                <Upload size={14} />
                             </div>
                          </div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Profile Identity</p>
                          <input type="file" ref={registrationFileRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                            <input required value={newPro.name} onChange={e => setNewPro({...newPro, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-700 shadow-inner" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Trade Entity</label>
                            <input required value={newPro.company} onChange={e => setNewPro({...newPro, company: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-700 shadow-inner" placeholder="Business Name" />
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Primary Skillset</label>
                            <input required value={newPro.specialty} onChange={e => setNewPro({...newPro, specialty: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-700 shadow-inner" placeholder="e.g. Master Engine Rebuilds" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Primary Location</label>
                            <input required value={newPro.location} onChange={e => setNewPro({...newPro, location: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-700 shadow-inner" placeholder="e.g. Cape Town, WC" />
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mobile</label>
                            <input required value={newPro.phone} onChange={e => setNewPro({...newPro, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-700 shadow-inner" placeholder="+27 ..." />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Business Email</label>
                            <input required type="email" value={newPro.email} onChange={e => setNewPro({...newPro, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-700 shadow-inner" placeholder="contact@expert.com" />
                          </div>
                       </div>

                       <div className="pt-4">
                          <Button type="submit" className="w-full py-4 text-lg font-bold group">
                            Next: Setup Subscription <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                       </div>
                    </form>
                  </div>
                )}

                {regStep === 'payment' && (
                  <div className="animate-in slide-in-from-right-10 duration-500">
                    <div className="mb-8 flex justify-between items-start">
                       <div>
                          <h2 className="text-3xl font-bold text-white mb-2">Monthly Subscription</h2>
                          <p className="text-gray-400">Recurring billing on the <span className="text-blue-500 font-bold">1st of every month</span></p>
                       </div>
                       <div className="w-16 h-8 bg-white rounded-md flex items-center justify-center p-2">
                          <span className="text-[#3b3db1] font-black italic text-xs tracking-tighter">YOCO</span>
                       </div>
                    </div>

                    <div className="bg-blue-600/5 border border-blue-600/20 rounded-2xl p-6 mb-8 flex items-center justify-between shadow-inner">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                             <ShieldCheck size={20} />
                          </div>
                          <div>
                             <p className="text-white font-bold">Pro Specialist Tier</p>
                             <p className="text-gray-500 text-xs">Priority Network Listing</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-white font-bold text-2xl">R300/month</p>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                          <div className="flex items-center gap-3 text-cyan-500 font-bold text-xs uppercase tracking-widest mb-2">
                             <BellRing size={16} /> Notification System Active
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            By clicking below, you agree to a monthly subscription of <strong>R300.00</strong>. 
                            Payments are due on the <strong>1st of every month</strong>.
                          </p>
                       </div>

                       <div className="flex flex-col gap-4">
                          <a 
                            href="https://pay.yoco.com/r/7y5VYb" 
                            target="_blank" 
                            onClick={handleExternalPaymentClick}
                            style={{
                              backgroundColor: 'blue', 
                              color: 'white', 
                              padding: '16px 20px', 
                              textDecoration: 'none', 
                              borderRadius: '5px',
                              textAlign: 'center',
                              fontWeight: 'bold',
                              display: 'block'
                            }}
                            className="w-full text-lg shadow-xl shadow-blue-900/20 transition-all hover:brightness-110 active:scale-95"
                          >
                            Pay & Subscribe with Yoco
                          </a>
                          
                          <button 
                            type="button"
                            onClick={() => setRegStep('details')}
                            className="text-gray-500 text-sm hover:text-white transition-colors"
                          >
                            Back to Profile Details
                          </button>
                       </div>
                       
                       <div className="flex justify-center gap-6 opacity-40 grayscale pointer-events-none mt-4">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                          <div className="text-white font-black italic text-[10px] flex items-center uppercase">Yoco Secured</div>
                       </div>
                    </div>
                  </div>
                )}

                {regStep === 'processing' && (
                  <div className="py-24 flex flex-col items-center justify-center space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 border-4 border-blue-600/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center text-[#3b3db1] font-bold text-[8px] uppercase tracking-tighter">Yoco</div>
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight">Writing to Database...</h3>
                      <p className="text-gray-500 text-sm">Registering expert profile under {tradeInfo?.title}.</p>
                    </div>
                  </div>
                )}

                {regStep === 'success' && (
                  <div className="py-20 flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-500">
                    <div className="relative">
                      <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.2)]">
                         <CheckCircle size={56} />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-neutral-900 border border-white/10 rounded-full flex items-center justify-center text-cyan-500">
                        <Database size={20} />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-2">Expert Profile Live</h3>
                      <p className="text-gray-400 max-w-sm mx-auto">
                        Verification complete. Your profile is now permanently listed in the <strong>{tradeInfo?.title}</strong> database. 
                        Reminders are configured for <span className="text-blue-500">elevatesolutions26@gmail.com</span>.
                      </p>
                    </div>
                    <Button variant="outline" className="mt-4" onClick={() => setIsAdding(false)}>View My Profile</Button>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* View Reviews Modal */}
        {viewingReviewsProId && viewingReviewsPro && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-300">
             <div className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl p-8 relative flex flex-col max-h-[80vh]">
                <button onClick={() => setViewingReviewsProId(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2">
                  <X size={24} />
                </button>
                <div className="mb-6">
                   <h2 className="text-3xl font-bold text-white mb-1">Feedback Log</h2>
                   <p className="text-gray-400">Verified performance history for <span className="text-cyan-400 font-bold">{viewingReviewsPro.name}</span></p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                   {viewingReviewsPro.comments && viewingReviewsPro.comments.length > 0 ? (
                     viewingReviewsPro.comments.map((comment: ReviewComment) => (
                       <div key={comment.id} className="bg-white/5 rounded-2xl p-6 border border-white/5 shadow-inner">
                          <div className="flex justify-between items-start mb-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-bold text-xs uppercase">
                                   {comment.user.charAt(0)}
                                </div>
                                <div>
                                   <p className="text-white font-bold text-sm">{comment.user}</p>
                                   <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Calendar size={12} />
                                      {comment.date}
                                   </div>
                                </div>
                             </div>
                             <div className="flex text-yellow-500 gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < comment.rating ? "currentColor" : "none"} />)}
                             </div>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed italic">"{comment.comment}"</p>
                       </div>
                     ))
                   ) : (
                     <div className="py-12 text-center text-gray-500 italic">
                        No detailed logs found.
                     </div>
                   )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                   <Button variant="outline" onClick={() => setViewingReviewsProId(null)}>Dismiss</Button>
                </div>
             </div>
          </div>
        )}

        {/* Review Modal */}
        {reviewingProId && reviewingPro && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in zoom-in duration-300">
             <div className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl p-8 relative">
                <button onClick={() => setReviewingProId(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2">
                  <X size={24} />
                </button>
                <div className="mb-6">
                   <h2 className="text-2xl font-bold text-white mb-1">Submit Feedback</h2>
                   <p className="text-gray-400 text-sm">Rating <span className="text-cyan-400 font-bold">{reviewingPro.name}</span></p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmitReview}>
                   <div className="flex flex-col items-center gap-4">
                      <div className="flex gap-2">
                         {[1, 2, 3, 4, 5].map((star) => (
                           <button
                             key={star}
                             type="button"
                             onClick={() => setReviewRating(star)}
                             className="focus:outline-none transition-transform hover:scale-125"
                           >
                             <Star 
                               size={32} 
                               className={star <= reviewRating ? "text-yellow-500 fill-yellow-500" : "text-gray-700"} 
                             />
                           </button>
                         ))}
                      </div>
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                        {reviewRating === 1 && "Critical"}
                        {reviewRating === 2 && "Fair"}
                        {reviewRating === 3 && "Satisfactory"}
                        {reviewRating === 4 && "Superior"}
                        {reviewRating === 5 && "Flawless"}
                      </span>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Detail (Optional)</label>
                      <textarea 
                        required
                        value={reviewComment} 
                        onChange={e => setReviewComment(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700 min-h-[100px] resize-none shadow-inner" 
                        placeholder="Describe the service quality..." 
                      />
                   </div>

                   <div className="pt-2">
                      <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg shadow-cyan-500/10">Publish Review</Button>
                   </div>
                </form>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};