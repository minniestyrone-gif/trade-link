import React from 'react';
import { Globe, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onTermsClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTermsClick }) => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex items-center gap-2 group cursor-pointer">
           <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <Globe className="w-3 h-3 text-white" />
            </div>
           <span className="text-white font-bold tracking-tight group-hover:text-cyan-400 transition-colors">Trade Link</span>
        </div>

        <div className="flex gap-8 text-sm text-gray-500">
           <button 
             onClick={onTermsClick} 
             className="hover:text-white transition-colors focus:outline-none"
           >
             Terms & Conditions
           </button>
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>

        <div className="flex gap-4">
           <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-white transition-colors">
             <Twitter className="w-5 h-5" />
           </a>
           <a 
             href="https://www.instagram.com/tradelink_connect?igsh=bHczanFoazU4ZA==" 
             target="_blank" 
             rel="noopener noreferrer" 
             aria-label="Instagram" 
             className="text-gray-500 hover:text-white transition-colors"
           >
             <Instagram className="w-5 h-5" />
           </a>
           <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-white transition-colors">
             <Linkedin className="w-5 h-5" />
           </a>
        </div>

      </div>
      <div className="text-center text-xs text-gray-700 mt-8">
        © 2025 Trade Link Inc. All rights reserved.
      </div>
    </footer>
  );
};