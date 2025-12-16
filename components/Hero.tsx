import React from 'react';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-neutral-950">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Animation Noodle Light Beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
         
         {/* Beam 1: Top area, Left -> Right */}
         <path 
           d="M-100 100 Q 720 -50 1540 100"
           stroke="url(#beam-grad-1)" 
           strokeWidth="2"
           strokeLinecap="round"
           className="animate-beam"
           strokeDasharray="500 2000"
           style={{ animationDuration: '15s' }}
         />
         
         {/* Beam 2: Bottom area, Right -> Left */}
         <path 
           d="M1540 800 Q 720 950 -100 800"
           stroke="url(#beam-grad-2)" 
           strokeWidth="2"
           strokeLinecap="round"
           className="animate-beam"
           strokeDasharray="400 2200"
           style={{ animationDuration: '18s', animationDelay: '-5s' }}
         />

         {/* Beam 3: Right Side Vertical-ish, Top -> Bottom */}
         <path 
           d="M1000 -100 C 1200 300, 1100 600, 1300 1000"
           stroke="url(#beam-grad-3)" 
           strokeWidth="1.5"
           strokeLinecap="round"
           className="animate-beam"
           strokeDasharray="300 1500"
           style={{ animationDuration: '12s', animationDelay: '-2s' }}
         />
         
         {/* Beam 4: Left-ish but behind text (very low opacity), Bottom -> Top */}
         {/* Kept away from main text block to avoid obstruction */}
         <path 
           d="M-100 900 C 50 600, 50 300, -50 0"
           stroke="url(#beam-grad-1)" 
           strokeWidth="3"
           strokeLinecap="round"
           className="animate-beam"
           strokeDasharray="200 1800"
           style={{ animationDuration: '20s', animationDelay: '-8s', opacity: 0.3 }}
         />

         {/* Beam 5: Crossing through the right visual area, Left -> Right */}
         <path 
           d="M600 200 C 900 400, 1000 600, 1500 500"
           stroke="url(#beam-grad-2)" 
           strokeWidth="1"
           strokeLinecap="round"
           className="animate-beam"
           strokeDasharray="150 1200"
           style={{ animationDuration: '14s', animationDelay: '-1s' }}
         />
      </svg>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Live in 50+ Cities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.1] relative z-20">
            One-click for <br />
            <span className="text-white">Expert Trades.</span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed relative z-20">
            The subserver connecting you to elite mechanics, plumbers, and electricians. 
            Stop searching, start fixing. 
            <span className="block mt-2 text-cyan-200 font-medium">"Mastery on Demand."</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-20">
            <Button size="lg" className="group">
              Find a Pro <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* Join Button without beam */}
            <Button variant="secondary" size="lg" className="border-white/10 bg-white/5 hover:bg-white/10">
              Join as Professional
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-white/10 relative z-20">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-400">Vetted Pros</span>
             </div>
             <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-400">Instant Quotes</span>
             </div>
          </div>
        </div>

        {/* Right Visuals */}
        <div className="relative h-[500px] w-full hidden lg:block">
          {/* Central Floating Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-gradient-to-b from-white/10 to-transparent backdrop-blur-2xl rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-float">
            <div className="flex justify-between items-start">
               <div>
                 <h3 className="text-white font-semibold text-lg">Electrical Repair</h3>
                 <p className="text-gray-400 text-sm">Residential Wiring Fix</p>
               </div>
               <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">COMPLETED</div>
            </div>
            
            {/* Value Graph Mockup */}
            <div className="h-16 flex items-end gap-1">
               {[40, 60, 45, 70, 50, 80, 75, 90, 60].map((h, i) => (
                 <div key={i} style={{ height: `${h}%`}} className="w-full bg-white/10 rounded-sm hover:bg-cyan-500/50 transition-colors" />
               ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://picsum.photos/32/32?random=${i}`} className="w-8 h-8 rounded-full border-2 border-black" alt="user" />
                ))}
              </div>
              <span className="text-white font-mono">$1,240 saved</span>
            </div>
          </div>

          {/* Floating Popular Review Widget */}
          <div className="absolute top-10 right-0 animate-float" style={{ animationDuration: '7s' }}>
            <div className="bg-[#111] p-4 rounded-xl border border-white/10 shadow-lg w-64">
              <div className="flex items-center gap-3 mb-2">
                 <img src="https://picsum.photos/40/40?random=99" className="w-10 h-10 rounded-full" alt="Reviewer" />
                 <div>
                   <p className="text-white text-sm font-medium">Alex M.</p>
                   <div className="flex text-yellow-500 w-3 h-3 gap-0.5">
                     <Star fill="currentColor" size={12}/>
                     <Star fill="currentColor" size={12}/>
                     <Star fill="currentColor" size={12}/>
                     <Star fill="currentColor" size={12}/>
                     <Star fill="currentColor" size={12}/>
                   </div>
                 </div>
              </div>
              <p className="text-gray-400 text-xs italic">"The mechanic arrived in 20 mins. Trade Link is a lifesaver for emergencies."</p>
            </div>
          </div>

           {/* Connection Node */}
           <div className="absolute bottom-20 left-10 bg-black/80 backdrop-blur border border-white/20 p-3 rounded-full flex items-center gap-3 animate-float" style={{ animationDelay: '1s', animationDuration: '8s' }}>
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-xs text-gray-300">128 Pros Online</span>
           </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-gray-500 text-sm">
         <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
           <ArrowRight className="rotate-90 w-4 h-4" />
         </div>
         <span>Scroll down</span>
      </div>
    </section>
  );
};