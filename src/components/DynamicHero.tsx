import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera } from 'lucide-react';

interface ScrollingColumnProps {
  images: string[];
  direction: 'up' | 'down';
  className?: string;
}

const ScrollingColumn: React.FC<ScrollingColumnProps> = ({ images, direction, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isHoveredRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout>();
  const [isVisible, setIsVisible] = useState(false);

  const scrollSpeed = 1; // pixels per frame
  const frameDelay = 30; // milliseconds

  const startScrolling = useCallback(() => {
    if (!containerRef.current || isHoveredRef.current) return;

    const container = containerRef.current;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    const scroll = () => {
      if (!container || isHoveredRef.current) return;

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

      animationRef.current = setTimeout(scroll, frameDelay);
    };

    animationRef.current = setTimeout(scroll, frameDelay);
  }, [direction]);

  const stopScrolling = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    stopScrolling();
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, [stopScrolling]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    resumeTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        startScrolling();
      }
    }, 500);
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
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [stopScrolling]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isVisible && !prefersReducedMotion) {
      startScrolling();
    } else {
      stopScrolling();
    }

    return () => stopScrolling();
  }, [isVisible, startScrolling, stopScrolling]);

  // Duplicate images for seamless looping
  const duplicatedImages = [...images, ...images];

  return (
    <div
      ref={containerRef}
      className={`h-full overflow-hidden scrollbar-hide ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div className="flex flex-col gap-4">
        {duplicatedImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative group transition-all duration-300 ease-out hover:scale-105 hover:opacity-80"
            style={{
              aspectRatio: '16/9',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
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

const DynamicHero: React.FC = () => {
  // Curated high-quality photography images from Pexels
  const leftColumnImages = [
    'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  const rightColumnImages = [
    'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  return (
    <div className="relative h-screen overflow-hidden" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[rgba(245,245,245,0.9)] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(245,245,245,0.9)] to-transparent z-10 pointer-events-none" />
      
      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white max-w-4xl px-8">
          <div className="flex items-center justify-center mb-6">
            <Camera className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight">
            Capturing Life's
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Moments
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg opacity-90 leading-relaxed">
            Where every frame tells a story and every click captures eternity
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl pointer-events-auto">
            Explore Gallery
          </button>
        </div>
      </div>

      {/* Scrolling columns */}
      <div className="flex h-full gap-8 px-8">
        <div className="flex-1">
          <ScrollingColumn 
            images={leftColumnImages} 
            direction="up"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <ScrollingColumn 
            images={rightColumnImages} 
            direction="down"
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicHero;