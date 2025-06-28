import React from 'react';

interface MinimalisticDividerProps {
  className?: string;
  withDot?: boolean;
}

const MinimalisticDivider: React.FC<MinimalisticDividerProps> = ({ 
  className = '', 
  withDot = false 
}) => {
  return (
    <div className={`w-full py-6 sm:py-8 lg:py-12 px-4 lg:px-8 ${className}`}>
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent">
        {withDot && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" style={{ backgroundColor: '#00BFFF' }}></div>
        )}
      </div>
    </div>
  );
};

export default MinimalisticDivider;