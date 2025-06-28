import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollingColumnProps {
  images: string[];
  direction: 'up' | 'down';
  className?: string;
}

const ScrollingColumn: React.FC<ScrollingColumnProps> = ({ images, direction, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isHoveredRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  const scrollSpeed = 1;

  const startScrolling = useCallback(() => {
    if (!containerRef.current || isHoveredRef.current) return;

    const container = containerRef.current;
    
    const scroll = () => {
      if (!container || isHoveredRef.current) return;

      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (direction === 'up') {
        container.scrollTop += scrollSpeed;
        if (container.scrollTop >= maxScroll / 2) {
          container.scrollTop = 0;
        }
      } else {
        container.scrollTop -= scrollSpeed;
        if (container.scrollTop <= 0) {
          container.scrollTop = maxScroll / 2;
        }
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
  }, [direction, scrollSpeed]);

  const stopScrolling = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    stopScrolling();
  }, [stopScrolling]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    setTimeout(() => {
      if (!isHoveredRef.current) {
        startScrolling();
      }
    }, 100);
  }, [startScrolling]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      stopScrolling();
    };
  }, [stopScrolling]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isVisible && !prefersReducedMotion) {
      setTimeout(() => {
        startScrolling();
      }, 100);
    } else {
      stopScrolling();
    }

    return () => stopScrolling();
  }, [isVisible, startScrolling, stopScrolling]);

  const tripleImages = [...images, ...images, ...images];

  return (
    <div
      ref={containerRef}
      className={`overflow-y-scroll scrollbar-hide ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
        {tripleImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="continuous-border-strip flex-shrink-0"
            style={{ 
              width: '100%', 
              maxWidth: '200px', // Increased from 150px
              height: '240px', // Increased from 150px
              aspectRatio: '5/6' // Adjusted aspect ratio for larger images
            }}
          >
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const DarkHero: React.FC = () => {
  const leftColumnImages = [
    '/images/1.jpeg',
    '/images/2.jpg',
    '/images/3.jpeg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
  ];

  const rightColumnImages = [
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.jpg',
    '/images/12.jpg',
  ];

  return (
    <div className="relative bg-black overflow-hidden pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-16 min-h-screen flex items-center">
      {/* Main content */}
      <div className="relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center min-h-[60vh] lg:min-h-[700px]">
          {/* Left side - Text content - Moved up with items-start and reduced margins */}
          <div className="w-full lg:flex-1 flex items-start lg:items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-8 xl:px-16 mb-6 lg:mb-0 pt-8 sm:pt-12 lg:pt-16">
            <div className="max-w-2xl text-center lg:text-left relative">
  {/* Subtle logo above the title */}
<img
  src="/images/logo.png"
  alt="ARIF PHOTOGRAPHY Logo"
  className="absolute -top-48 left-6 opacity-20 w-60 sm:w-72 lg:w-[22rem] xl:w-[26rem] pointer-events-none select-none"
/>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight">
                Capturing Life's
                <br />
                <span className="text-white">
                  Moments in Pixels
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Welcome to Arif Photography, where every click captures a tale of heroism through the lens! 
                Our website is a sanctuary for those who seek to immortalize moments.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25" style={{ backgroundColor: '#00BFFF' }}>
                Photography
              </button>
            </div>
          </div>

          {/* Right side - Two scrolling columns with larger images */}
          <div className="w-full lg:flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-16">
            <div className="flex gap-6 sm:gap-8 lg:gap-10 xl:gap-12 h-[350px] sm:h-[450px] lg:h-[550px] xl:h-[650px] w-full max-w-md sm:max-w-lg lg:max-w-none">
              {/* Left scrolling column (scrolls up) - Increased max width */}
              <div className="flex-1 max-w-[160px] sm:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px]">
                <ScrollingColumn 
                  images={leftColumnImages} 
                  direction="up"
                  className="h-full"
                />
              </div>
              
              {/* Right scrolling column (scrolls down) - Increased max width */}
              <div className="flex-1 max-w-[160px] sm:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px]">
                <ScrollingColumn 
                  images={rightColumnImages} 
                  direction="down"
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 xl:w-64 xl:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 xl:w-64 xl:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 xl:w-64 xl:h-64 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
    </div>
  );
};

export default DarkHero;