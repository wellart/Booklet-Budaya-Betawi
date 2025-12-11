import React from 'react';

interface GigiBalangProps {
  position: 'top' | 'bottom';
  color?: string; // Note: Color prop is preserved for interface compatibility but the specific pattern uses fixed Betawi colors.
}

export const GigiBalang: React.FC<GigiBalangProps> = ({ position }) => {
  const isTop = position === 'top';
  
  // Pola Gigi Balang Khas: Kuning dan Hijau dengan lubang di tengah
  // Menggunakan SVG Pattern agar responsif dan tajam saat dicetak
  
  return (
    <div className={`w-full h-14 md:h-16 overflow-hidden flex ${isTop ? 'mb-2' : 'mt-2 rotate-180'}`}>
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <pattern 
            id="gigiBalangPattern" 
            x="0" 
            y="0" 
            width="80" 
            height="60" 
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1, 1)"
          >
             {/* Bentuk Kuning (Kiri) */}
             <path d="M2 0 H38 V35 L20 60 L2 35 Z" fill="#fdb813" />
             <circle cx="20" cy="25" r="7" fill="white" />
             
             {/* Bentuk Hijau (Kanan) */}
             <path d="M42 0 H78 V35 L60 60 L42 35 Z" fill="#00a651" />
             <circle cx="60" cy="25" r="7" fill="white" />
          </pattern>
        </defs>
        
        {/* Mengisi seluruh area dengan pola berulang */}
        <rect width="100%" height="100%" fill="url(#gigiBalangPattern)" />
      </svg>
    </div>
  );
};