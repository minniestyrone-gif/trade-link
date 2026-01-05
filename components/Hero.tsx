import React from 'react';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/Button';

interface HeroProps {
  onFindPro: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onFindPro }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-neutral-950">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Animation Noodle Light Beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
         <defs>
            <linearGradient id="beam-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
               <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
               <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
               <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
               <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
               <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
               <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
         </defs>
         
         {/* Original horizontal flows */}
         <path d="M-100 100 Q 720 -50 1540 100" stroke="url(#beam-grad-1)" strokeWidth="2" strokeLinecap="round" className="animate-beam" strokeDasharray="500 2000" style={{ animationDuration: '15s' }} />
         <path d="M1540 800 Q 720 950 -100 800" stroke="url(#beam-grad-2)" strokeWidth="2" strokeLinecap="round" className="animate-beam" strokeDasharray="400 2200" style={{ animationDuration: '18s', animationDelay: '-5s' }} />
         
         {/* New horizontal flows for depth */}
         <path d="M-100 450 Q 720 350 1540 450" stroke="url(#beam-grad-1)" strokeWidth="1" strokeLinecap="round" className="animate-beam" strokeDasharray="600 2400" style={{ animationDuration: '12s', animationDelay: '-3s' }} />
         <path d="M1540 550 Q 720 650 -100 550" stroke="url(#beam-grad-3)" strokeWidth="1.5" strokeLinecap="round" className="animate-beam" strokeDasharray="300 1800" style={{ animationDuration: '20s', animationDelay: '-7s' }} />
         <path d="M-100 250 Q 720 150 1540 300" stroke="url(#beam-grad-2)" strokeWidth="1" strokeLinecap="round" className="animate-beam opacity-30" strokeDasharray="400 2000" style={{ animationDuration: '14s', animationDelay: '-10s' }} />

         {/* Vertical and Diagonal flows */}
         <path d="M1000 -100 C 1200 300, 1100 600, 1300 1000" stroke="url(#beam-grad-3)" strokeWidth="1.5" strokeLinecap="round" className="animate-beam" strokeDasharray="300 1500" style={{ animationDuration: '12s', animationDelay: '-2s' }} />
         <path d="M400 -100 C 200 300, 300 600, 100 1000" stroke="url(#beam-grad-1)" strokeWidth="1" strokeLinecap="round" className="animate-beam" strokeDasharray="250 1600" style={{ animationDuration: '16s', animationDelay: '-4s' }} />
         <path d="M-100 900 C 50 600, 50 300, -50 0" stroke="url(#beam-grad-1)" strokeWidth="3" strokeLinecap="round" className="animate-beam" strokeDasharray="200 1800" style={{ animationDuration: '20s', animationDelay: '-8s', opacity: 0.3 }} />
         <path d="M1500 0 L 0 900" stroke="url(#beam-grad-2)" strokeWidth="1" strokeLinecap="round" className="animate-beam" strokeDasharray="300 2500" style={{ animationDuration: '22s', animationDelay: '-12s' }} />
         <path d="M0 0 L 1500 900" stroke="url(#beam-grad-3)" strokeWidth="0.5" strokeLinecap="round" className="animate-beam opacity-20" strokeDasharray="200 2000" style={{ animationDuration: '25s', animationDelay: '-1s' }} />
         
         {/* Extra accent beams */}
         <path d="M720 -100 Q 800 450 720 1000" stroke="url(#beam-grad-1)" strokeWidth="0.5" strokeLinecap="round" className="animate-beam opacity-40" strokeDasharray="100 3000" style={{ animationDuration: '10s' }} />
      </svg>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Elite Network: 128 Pros Online
          </div>
          
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000">
              One-click for <br />
              <span className="text-white">Expert Trades.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              The premium subserver connecting you to master mechanics, plumbers, and electricians. 
              Stop searching, start fixing with battle-tested professionals.
              <span className="block mt-4 text-cyan-200/80 font-medium italic">"Mastery on Demand."</span>
            </p>
          </div>
          
          {/* Centered CTA Button */}
          <div className="flex justify-center w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button size="lg" className="group px-12 py-5 text-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]" onClick={onFindPro}>
              Find a Pro <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12 border-t border-white/10 w-full max-w-2xl animate-in fade-in duration-1000 delay-700">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-500" />
                <span className="text-sm text-gray-400 font-medium">Vetted Professionals</span>
             </div>
             <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-400 font-medium">Instant Quotes</span>
             </div>
             <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span className="text-sm text-gray-400 font-medium">4.9/5 Average Rating</span>
             </div>
          </div>
        </div>

        {/* Floating background visuals for depth */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-500 text-xs uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity cursor-pointer group" onClick={onFindPro}>
         <span className="group-hover:text-cyan-400 transition-colors">Explore Categories</span>
         <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-1">
           <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
         </div>
      </div>
    </section>
  );
};