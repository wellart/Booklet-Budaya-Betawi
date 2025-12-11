import React from 'react';

interface GigiBalangProps {
  position: 'top' | 'bottom';
  color?: string;
}

export const GigiBalang: React.FC<GigiBalangProps> = ({ position, color = "fill-teal-600" }) => {
  const isTop = position === 'top';
  
  return (
    <div className={`w-full h-8 overflow-hidden flex ${isTop ? 'mb-4' : 'mt-4 scale-y-[-1]'}`}>
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className={`w-full h-full ${color}`}
      >
        <path d="M0 0 L10 20 L20 0 L30 20 L40 0 L50 20 L60 0 L70 20 L80 0 L90 20 L100 0 V20 H0 Z" />
      </svg>
    </div>
  );
};
