import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, UserCircle, LogOut } from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  onAuthOpen: () => void;
  onHome: () => void;
  user: any;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAuthOpen, onHome, user, onLogout }) => {
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
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                    <UserCircle size={20} />
                  </div>
                  <span className="text-sm font-bold text-white max-w-[100px] truncate">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  title="Log Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="gap-2" onClick={onAuthOpen}>
                  Log In
                </Button>
                <Button variant="primary" size="sm" onClick={onAuthOpen}>
                  Get Started
                </Button>
              </>
            )}
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
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
                <UserCircle className="text-cyan-500" />
                <span className="text-white font-bold">{user.name}</span>
              </div>
              <Button variant="outline" className="w-full justify-center gap-2 text-red-400" onClick={() => { onLogout(); setMobileOpen(false); }}>
                <LogOut size={18} /> Log Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="secondary" className="w-full justify-center" onClick={() => { setMobileOpen(false); onAuthOpen(); }}>Log In</Button>
              <Button variant="primary" className="w-full justify-center" onClick={() => { setMobileOpen(false); onAuthOpen(); }}>Get Started</Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};