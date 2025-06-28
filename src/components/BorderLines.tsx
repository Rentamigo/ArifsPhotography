import React from 'react';

// Style 1: Sleek Minimalist Design
export const MinimalistBorder: React.FC = () => {
  return (
    <div className="w-full py-4 sm:py-6 lg:py-8 px-4 lg:px-8">
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent">
        {/* Center accent dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

// Style 2: Decorative Modern Pattern
export const DecorativeBorder: React.FC = () => {
  return (
    <div className="w-full py-6 sm:py-8 lg:py-12 px-4 lg:px-8">
      <div className="relative flex items-center justify-center">
        {/* Left decorative line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-red-500/30"></div>
        
        {/* Center decorative element */}
        <div className="relative mx-4 sm:mx-6 lg:mx-8">
          {/* Outer ring */}
          <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border border-red-500/30 rounded-full flex items-center justify-center">
            {/* Inner ring */}
            <div className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 border border-red-500 rounded-full flex items-center justify-center">
              {/* Center dot */}
              <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Rotating accent */}
          <div className="absolute inset-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-t border-red-500/60 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
        </div>
        
        {/* Right decorative line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-red-500/30"></div>
      </div>
    </div>
  );
};

// Style 3: Animated Gradient Line
export const AnimatedBorder: React.FC = () => {
  return (
    <div className="w-full py-4 sm:py-6 lg:py-8 px-4 lg:px-8">
      <div className="relative w-full h-px sm:h-1 lg:h-1 bg-black rounded-full overflow-hidden">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-400 to-red-600 rounded-full"
          style={{
            backgroundSize: '200% 100%',
            animation: 'gradient-flow 3s ease-in-out infinite'
          }}
        ></div>
      </div>
    </div>
  );
};

// Style 4: Geometric Pattern Border
export const GeometricBorder: React.FC = () => {
  return (
    <div className="w-full py-6 sm:py-8 lg:py-10 px-4 lg:px-8">
      <div className="relative flex items-center justify-center">
        {/* Left line with geometric elements */}
        <div className="flex-1 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-red-500/30"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rotate-45 mx-1 sm:mx-2"></div>
          <div className="w-4 sm:w-6 lg:w-8 h-px bg-red-500"></div>
        </div>
        
        {/* Center diamond */}
        <div className="relative mx-3 sm:mx-4 lg:mx-6">
          <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-red-500 rotate-45"></div>
          <div className="absolute inset-1 bg-black rotate-45"></div>
        </div>
        
        {/* Right line with geometric elements */}
        <div className="flex-1 flex items-center">
          <div className="w-4 sm:w-6 lg:w-8 h-px bg-red-500"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rotate-45 mx-1 sm:mx-2"></div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-red-500/30"></div>
        </div>
      </div>
    </div>
  );
};

// Style 5: Pulsing Dots Border
export const PulsingDotsBorder: React.FC = () => {
  return (
    <div className="w-full py-4 sm:py-6 lg:py-8 px-4 lg:px-8">
      <div className="flex items-center justify-center space-x-2 sm:space-x-3 lg:space-x-4">
        {/* Left line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-red-500/30"></div>
        
        {/* Pulsing dots */}
        <div className="flex space-x-1 sm:space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"
              style={{
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${index * 0.3}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Right line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-red-500/30"></div>
      </div>
    </div>
  );
};

// Style 6: Hover Interactive Border
export const InteractiveBorder: React.FC = () => {
  return (
    <div className="w-full py-4 sm:py-6 lg:py-8 px-4 lg:px-8 group cursor-pointer">
      <div className="relative w-full h-px sm:h-1 bg-red-500/20 rounded-full overflow-hidden transition-all duration-500 group-hover:h-1 sm:group-hover:h-1">
        {/* Animated fill on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
        ></div>
      </div>
    </div>
  );
};