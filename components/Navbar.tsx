import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  onHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHome }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services & Trades', href: '#services' },
    { name: 'Reviews', href: '#testimonials' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === '#') {
      onHome();
    } else if (href.startsWith('#')) {
      const target = document.getElementById(href.substring(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        onHome();
      }
    }
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`
          flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300
          ${scrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl' : 'bg-transparent'}
        `}>
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={onHome}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">Trade Link</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="primary" size="sm" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Network
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-10">
          {navLinks.map((link) => (
             <a 
               key={link.name} 
               href={link.href}
               onClick={(e) => handleLinkClick(e, link.href)}
               className="text-lg font-medium text-gray-300 hover:text-white"
             >
               {link.name}
             </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <Button variant="primary" className="w-full justify-center" onClick={() => { setMobileOpen(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Explore Network
          </Button>
        </div>
      )}
    </nav>
  );
};