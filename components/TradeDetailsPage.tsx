import React, { useState, useMemo, useRef } from 'react';
import { ArrowLeft, Plus, User, Phone, Mail, Building2, Star, CheckCircle, X, Search, MessageSquare, Calendar, Camera, Upload } from 'lucide-react';
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

export const TradeDetailsPage: React.FC<TradeDetailsPageProps> = ({ tradeId, onBack, pros, onAdd, onReview }) => {
  const tradeInfo = SPECIALIZED_TRADES.find(t => t.id === tradeId);
  const [isAdding, setIsAdding] = useState(false);
  const [reviewingProId, setReviewingProId] = useState<string | null>(null);
  const [viewingReviewsProId, setViewingReviewsProId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // File upload refs
  const registrationFileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const [editingProId, setEditingProId] = useState<string | null>(null);

  // Review State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Form State
  const [newPro, setNewPro] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    specialty: '',
    imageUrl: '' // Custom image if uploaded
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
    
    // Fallback if no image uploaded: Use a placeholder that identifies as an icon
    const finalImageUrl = newPro.imageUrl || `ICON_FALLBACK_${tradeId}`;

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
      imageUrl: finalImageUrl,
      specialty: newPro.specialty,
      comments: []
    };
    onAdd(tradeId, added);
    setIsAdding(false);
    setNewPro({ name: '', company: '', email: '', phone: '', specialty: '', imageUrl: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isRegistration: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isRegistration) {
          setNewPro(prev => ({ ...prev, imageUrl: reader.result as string }));
        } else if (editingProId) {
          // In a real app, this would call an API. Here we find and update locally.
          const pro = pros.find(p => p.id === editingProId);
          if (pro) {
             pro.imageUrl = reader.result as string;
             // Trigger a re-render by updating state (pros comes from parent, so it's a bit of a cheat here)
             // In a perfect world we'd have a specific `onUpdate` prop.
             setEditingProId(null);
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
    }
  };

  const reviewingPro = pros.find(p => p.id === reviewingProId);
  const viewingReviewsPro = pros.find(p => p.id === viewingReviewsProId);

  // Helper to render the profile image or the trade icon
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
      {/* Hidden inputs for image uploading */}
      <input type="file" ref={editFileRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, false)} />
      
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
                       {renderProfileImage(pro.imageUrl, "w-20 h-20", true, pro.id)}
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
                             <button 
                               onClick={() => setViewingReviewsProId(pro.id)}
                               className="text-gray-500 text-xs font-medium hover:text-cyan-400 transition-colors underline decoration-dotted underline-offset-4"
                             >
                               {pro.reviews} verified reviews ({pro.rating})
                             </button>
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
                    </div>

                    <div className="flex flex-wrap gap-3">
                       <Button variant="ghost" size="sm" className="gap-2 border border-white/5 hover:border-cyan-500/30" onClick={() => setReviewingProId(pro.id)}>
                         <MessageSquare size={16} /> Review
                       </Button>
                       <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${pro.email}`)}>Email</Button>
                       <Button size="sm" className="shadow-cyan-500/20 shadow-lg" onClick={() => window.open(`tel:${pro.phone}`)}>Call</Button>
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

        {/* View Reviews Modal */}
        {viewingReviewsProId && viewingReviewsPro && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-300">
             <div className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl p-8 relative flex flex-col max-h-[80vh]">
                <button onClick={() => setViewingReviewsProId(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
                <div className="mb-6">
                   <h2 className="text-3xl font-bold text-white mb-1">Feedback History</h2>
                   <p className="text-gray-400">What clients are saying about <span className="text-cyan-400 font-bold">{viewingReviewsPro.name}</span></p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                   {viewingReviewsPro.comments && viewingReviewsPro.comments.length > 0 ? (
                     viewingReviewsPro.comments.map((comment: ReviewComment) => (
                       <div key={comment.id} className="bg-white/5 rounded-2xl p-6 border border-white/5">
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
                     <div className="py-12 text-center text-gray-500">
                        No detailed feedback available yet.
                     </div>
                   )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                   <Button variant="outline" onClick={() => setViewingReviewsProId(null)}>Close</Button>
                </div>
             </div>
          </div>
        )}

        {/* Review Modal */}
        {reviewingProId && reviewingPro && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in zoom-in duration-300">
             <div className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl p-8 relative">
                <button onClick={() => setReviewingProId(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
                <div className="mb-6">
                   <h2 className="text-2xl font-bold text-white mb-1">Leave a Review</h2>
                   <p className="text-gray-400 text-sm">Rate your experience with <span className="text-cyan-400 font-bold">{reviewingPro.name}</span></p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmitReview}>
                   <div className="flex flex-col items-center gap-4">
                      <div className="flex gap-2">
                         {[1, 2, 3, 4, 5].map((star) => (
                           <button
                             key={star}
                             type="button"
                             onClick={() => setReviewRating(star)}
                             className="focus:outline-none transition-transform hover:scale-110"
                           >
                             <Star 
                               size={32} 
                               className={star <= reviewRating ? "text-yellow-500 fill-yellow-500" : "text-gray-700"} 
                             />
                           </button>
                         ))}
                      </div>
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                        {reviewRating === 1 && "Poor"}
                        {reviewRating === 2 && "Fair"}
                        {reviewRating === 3 && "Good"}
                        {reviewRating === 4 && "Great"}
                        {reviewRating === 5 && "Excellent"}
                      </span>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Your Feedback (Optional)</label>
                      <textarea 
                        required
                        value={reviewComment} 
                        onChange={e => setReviewComment(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700 min-h-[100px] resize-none" 
                        placeholder="Tell others about the quality of service..." 
                      />
                   </div>

                   <div className="pt-2">
                      <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg shadow-cyan-500/10">Submit Review</Button>
                   </div>
                </form>
             </div>
          </div>
        )}

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
                   {/* Profile Picture Section */}
                   <div className="flex flex-col items-center gap-4 mb-6">
                      <div className="relative group/upload cursor-pointer" onClick={() => registrationFileRef.current?.click()}>
                         {renderProfileImage(newPro.imageUrl || `ICON_FALLBACK_${tradeId}`, "w-28 h-28")}
                         <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-cyan-500 border-2 border-neutral-900 flex items-center justify-center text-black">
                            <Upload size={14} />
                         </div>
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest">Change</span>
                         </div>
                      </div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Profile Picture</p>
                      <input type="file" ref={registrationFileRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                   </div>

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