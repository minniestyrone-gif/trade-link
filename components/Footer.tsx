import React from 'react';
import { Globe, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
              <Globe className="w-3 h-3 text-white" />
            </div>
           <span className="text-white font-bold tracking-tight">Trade Link</span>
        </div>

        <div className="flex gap-8 text-sm text-gray-500">
           <a href="#" className="hover:text-white transition-colors">Terms</a>
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
           <a href="#" className="hover:text-white transition-colors">Careers</a>
           <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>

        <div className="flex gap-4">
           <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
           <Instagram className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
           <Linkedin className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
        </div>

      </div>
      <div className="text-center text-xs text-gray-700 mt-8">
        © 2024 Trade Link Inc. All rights reserved.
      </div>
    </footer>
  );
};