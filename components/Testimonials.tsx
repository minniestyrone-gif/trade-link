import React from 'react';
import { Card } from './ui/Card';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    user: 'Jonathan Ark',
    role: 'Homeowner',
    content: "Trade Link's reliability is unmatched. I found a plumber at 10 PM on a Sunday, and the issue was resolved by midnight.",
    avatarUrl: 'https://picsum.photos/50/50?random=201',
    rating: 5
  },
  {
    id: '2',
    user: 'Emily Chen',
    role: 'Small Business Owner',
    content: "The custom quote feature saved me hours of phone calls. The electrician I hired was professional and transparent with pricing.",
    avatarUrl: 'https://picsum.photos/50/50?random=202',
    rating: 5
  },
  {
    id: '3',
    user: 'Marcus R.',
    role: 'Property Manager',
    content: "24/7 support is real. When a job had a minor hiccup, the Trade Link team stepped in immediately to mediate. Fantastic service.",
    avatarUrl: 'https://picsum.photos/50/50?random=203',
    rating: 4
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-black relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />

       <div className="max-w-7xl mx-auto px-6 relative z-10">
         <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Header */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Reliability <br />
                <span className="text-gray-500">Built on Trust.</span>
              </h2>
              <p className="text-gray-400 max-w-md">
                Don't take our word for it. Join thousands of users who have streamlined their maintenance needs with Trade Link.
              </p>
              
              <div className="flex gap-8 pt-4">
                 <div>
                    <div className="text-3xl font-bold text-white">15k+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Jobs Completed</div>
                 </div>
                 <div>
                    <div className="text-3xl font-bold text-white">4.9/5</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Average Rating</div>
                 </div>
              </div>
            </div>

            {/* Right Cards Stack */}
            <div className="grid gap-6">
               {TESTIMONIALS.map((t, idx) => (
                 <div key={t.id} className="animate-float" style={{ animationDelay: `${idx * 1.2}s` }}>
                   <Card 
                      className={`p-6 border-l-4 ${idx === 0 ? 'border-l-cyan-500' : 'border-l-gray-700'}`}
                      hoverEffect={true}
                   >
                      <div className="flex gap-4 items-start">
                         <img src={t.avatarUrl} className="w-12 h-12 rounded-full border border-white/10" alt={t.user} />
                         <div>
                            <p className="text-gray-300 mb-3 text-lg leading-relaxed">"{t.content}"</p>
                            <div>
                               <div className="text-white font-medium">{t.user}</div>
                               <div className="text-cyan-500 text-xs uppercase font-bold">{t.role}</div>
                            </div>
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