import React from 'react';
import { GigiBalang } from './GigiBalang';

interface BookletPageProps {
  children: React.ReactNode;
  pageNumber?: number;
  className?: string;
  accentColor?: string;
}

export const BookletPage: React.FC<BookletPageProps> = ({ 
  children, 
  pageNumber, 
  className = "",
  accentColor = "fill-teal-600"
}) => {
  return (
    <div className={`
      relative bg-white text-slate-800 
      w-full max-w-4xl mx-auto 
      min-h-[1123px] /* Approx A4 height in pixels for screen */
      shadow-xl print-shadow-none 
      print-full-width
      flex flex-col
      page-break
      print:min-h-0 print:h-[296mm] print:overflow-hidden /* Force A4 height in print to prevent spillover */
      ${className}
    `}>
      {/* Header Pattern */}
      <GigiBalang position="top" color={accentColor} />

      {/* Content Area */}
      <div className="flex-1 px-12 py-8 flex flex-col relative z-10 print:py-6 print:px-10">
        {children}
      </div>

      {/* Footer Pattern & Page Number */}
      <div className="mt-auto">
        {pageNumber && (
          <div className="text-center text-sm text-gray-400 font-serif mb-2">
            - {pageNumber} -
          </div>
        )}
        <GigiBalang position="bottom" color={accentColor} />
      </div>
    </div>
  );
};