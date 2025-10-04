
import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
  };

  const arrowClasses = {
     top: 'top-full border-t-slate-800',
     bottom: 'bottom-full border-b-slate-800',
  };

  return (
    <div className="relative group inline-flex">
      {children}
      <div 
        className={`absolute ${positionClasses[position]} left-1/2 -translate-x-1/2 w-max max-w-xs
                   opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 
                   transition-all duration-200 delay-500 pointer-events-none z-20`}
      >
         <span className="bg-slate-800 text-white text-sm rounded-md px-3 py-1.5 shadow-lg whitespace-nowrap">
            {text}
         </span>
         <div className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 
                      border-4 border-x-transparent ${arrowClasses[position]}`}>
         </div>
      </div>
    </div>
  );
};
