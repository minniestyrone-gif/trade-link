import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-3xl 
        bg-[#0f0f0f]/80 backdrop-blur-xl 
        border border-white/5 
        ${hoverEffect ? 'hover:border-white/20 hover:bg-[#1a1a1a] transition-all duration-500 group' : ''}
        ${className}
      `}
    >
      {/* Internal shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};