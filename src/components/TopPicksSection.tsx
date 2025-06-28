import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Camera, Award, Zap } from 'lucide-react';

interface CarouselImage {
  src: string;
  title: string;
  category: string;
}

const TopPicksSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);

  const images: CarouselImage[] = [
    {
      src: '/images/29.jpg',
      title: 'Portrait Excellence',
      category: 'Professional'
    },
    {
      src: '/images/14.jpg',
      title: 'Wedding Moments',
      category: 'Celebration'
    },
    {
      src: '/images/15.jpg',
      title: 'Fashion Editorial',
      category: 'Creative'
    },
    {
      src: '/images/16.jpg',
      title: 'Commercial Shoot',
      category: 'Business'
    },
    {
      src: '/images/17.jpg',
      title: 'Event Coverage',
      category: 'Documentary'
    },
    {
      src: '/images/18.jpg',
      title: 'Artistic Vision',
      category: 'Fine Art'
    },
    {
      src: '/images/19.jpg',
      title: 'Landscape Beauty',
      category: 'Nature'
    },
    {
      src: '/images/20.jpg',
      title: 'Urban Stories',
      category: 'Street'
    }
  ];

  // Calculate items per view based on screen size
  const updateItemsPerView = useCallback(() => {
    const width = window.innerWidth;
    if (width < 480) {
      setItemsPerView(1); // Mobile: 1 item
    } else if (width < 768) {
      setItemsPerView(1.5); // Large mobile: 1.5 items
    } else if (width < 1024) {
      setItemsPerView(2); // Tablet: 2 items
    } else if (width < 1280) {
      setItemsPerView(2.5); // Small desktop: 2.5 items
    } else {
      setItemsPerView(3); // Large desktop: 3 items
    }
  }, []);

  // Update items per view on resize
  useEffect(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [updateItemsPerView]);

  const scrollToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const container = carouselRef.current;
      const containerWidth = container.clientWidth;
      const itemWidth = containerWidth / itemsPerView;
      const scrollPosition = itemWidth * index;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [itemsPerView]);

  const handlePrevious = useCallback(() => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  }, [currentIndex, scrollToIndex]);

  const handleNext = useCallback(() => {
    const maxIndex = Math.max(0, images.length - Math.floor(itemsPerView));
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  }, [currentIndex, images.length, itemsPerView, scrollToIndex]);

  // Handle scroll events to update current index
  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const containerWidth = container.clientWidth;
      const itemWidth = containerWidth / itemsPerView;
      const newIndex = Math.round(container.scrollLeft / itemWidth);
      
      if (newIndex !== currentIndex && newIndex >= 0) {
        setCurrentIndex(Math.min(newIndex, images.length - Math.floor(itemsPerView)));
      }
    }
  }, [currentIndex, images.length, itemsPerView]);

  // Auto-advance carousel - INCREASED SPEED
  useEffect(() => {
    if (!isHovered && isVisible) {
      const interval = setInterval(() => {
        handleNext();
      }, 1500); // Reduced from 2000ms to 1500ms for even faster transitions
      return () => clearInterval(interval);
    }
  }, [isHovered, isVisible, handleNext]);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('top-picks-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate if navigation buttons should be shown
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < images.length - Math.floor(itemsPerView);

  return (
    <section id="top-picks-section" className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 bg-black dark:bg-black relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-blue-600 rounded-lg" style={{ backgroundColor: '#00BFFF' }}>
              <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white fill-current" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white dark:text-white text-center">
              Top <span className="text-blue-500" style={{ color: '#00BFFF' }}>Picks</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
          </div>
        </div>

        {/* Content Layout - Mobile: Stacked, Desktop: Side by Side */}
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
          
          {/* Left Side - Descriptive Text */}
          <div className="w-full lg:flex-1 lg:max-w-2xl order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 dark:text-gray-300 leading-relaxed">
                Discover our most celebrated photography collections, handpicked from thousands of captures. 
                Each image represents the pinnacle of artistic vision, technical excellence, and emotional storytelling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-gray-900/30 p-4 sm:p-5 lg:p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" style={{ color: '#00BFFF' }} />
                    <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg">Premium Quality</h3>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base text-center lg:text-left">
                    Every image is meticulously crafted using professional-grade equipment and advanced post-processing techniques.
                  </p>
                </div>

                <div className="bg-gray-900/30 p-4 sm:p-5 lg:p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" style={{ color: '#00BFFF' }} />
                    <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg">Award Winners</h3>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base text-center lg:text-left">
                    Featured collections have received recognition from prestigious photography competitions and publications.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 p-4 sm:p-5 lg:p-6 rounded-lg" style={{ background: 'linear-gradient(to right, rgba(0, 191, 255, 0.2), rgba(56, 189, 248, 0.2))', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" style={{ color: '#00BFFF' }} />
                  <h3 className="font-bold text-white text-sm sm:text-base lg:text-lg">Exclusive Access</h3>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm lg:text-base text-center lg:text-left">
                  Get behind-the-scenes insights and stories from each featured shoot. 
                  Understand the creative process that brings these extraordinary moments to life.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25 text-sm sm:text-base lg:text-lg" style={{ backgroundColor: '#00BFFF', boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)' }}>
                  View Full Gallery
                </button>
                <button className="w-full sm:w-auto border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base lg:text-lg" style={{ borderColor: '#00BFFF', color: '#00BFFF' }}>
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Fast Horizontal Carousel */}
          <div className="w-full lg:flex-1 order-1 lg:order-2">
            <div className="relative">
              {/* Navigation Controls */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white dark:text-white">Featured Collections</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={!canScrollLeft}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                      canScrollLeft 
                        ? 'bg-gray-800 hover:bg-blue-600 text-white' 
                        : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                    }`}
                    style={canScrollLeft ? { '--hover-bg': '#00BFFF' } as React.CSSProperties : {}}
                    onMouseEnter={(e) => canScrollLeft && (e.currentTarget.style.backgroundColor = '#00BFFF')}
                    onMouseLeave={(e) => canScrollLeft && (e.currentTarget.style.backgroundColor = '#1f2937')}
                    aria-label="Previous images"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canScrollRight}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                      canScrollRight 
                        ? 'bg-gray-800 hover:bg-blue-600 text-white' 
                        : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                    }`}
                    style={canScrollRight ? { '--hover-bg': '#00BFFF' } as React.CSSProperties : {}}
                    onMouseEnter={(e) => canScrollRight && (e.currentTarget.style.backgroundColor = '#00BFFF')}
                    onMouseLeave={(e) => canScrollRight && (e.currentTarget.style.backgroundColor = '#1f2937')}
                    aria-label="Next images"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </button>
                </div>
              </div>

              {/* Responsive Horizontal Scrolling Container */}
              <div
                className="relative overflow-hidden rounded-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Horizontal Scrolling Images */}
                <div 
                  ref={carouselRef}
                  className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                  onScroll={handleScroll}
                  style={{
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer flex-shrink-0 transition-all duration-200"
                      style={{ 
                        scrollSnapAlign: 'start',
                        // Responsive widths based on items per view
                        width: `calc((100% - ${Math.floor(itemsPerView) - 1} * ${
                          window.innerWidth < 640 ? '12px' : 
                          window.innerWidth < 1024 ? '16px' : '24px'
                        }) / ${itemsPerView})`
                      }}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <div className="relative bg-gradient-to-br from-blue-500/10 to-transparent p-1 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                          <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-200"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800';
                            }}
                          />
                        </div>

                        {/* Overlay with image info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-end">
                          <div className="p-2 sm:p-3 lg:p-4 w-full">
                            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
                              <span className="text-blue-400 text-xs sm:text-sm font-medium" style={{ color: '#00BFFF' }}>{image.category}</span>
                            </div>
                            <h4 className="text-white font-semibold text-xs sm:text-sm lg:text-base">{image.title}</h4>
                          </div>
                        </div>

                        {/* Active indicator for current image */}
                        {index === currentIndex && (
                          <div className="absolute top-2 right-2 w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full shadow-lg animate-pulse" style={{ backgroundColor: '#00BFFF' }}></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clean Status Bar - Mobile Only */}
              <div className="mt-4 sm:mt-6 lg:hidden">
                <div className="bg-gray-900/50 px-3 py-2 rounded-lg border border-blue-500/20 text-center" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                  <div className="flex items-center justify-center gap-3 text-sm">
                    <span className="text-gray-300">
                      {currentIndex + 1}-{Math.min(currentIndex + Math.floor(itemsPerView), images.length)} of {images.length}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ backgroundColor: '#00BFFF' }}></div>
                      <span className="text-gray-400">
                        {isHovered ? 'Paused' : 'Ultra Fast Auto-scroll'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Info */}
              <div className="hidden lg:block mt-4 text-center">
                <div className="bg-gray-900/50 px-4 py-2 rounded-lg border border-blue-500/20 inline-block" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-300">
                      Showing {Math.floor(itemsPerView)} image{Math.floor(itemsPerView) !== 1 ? 's' : ''} of {images.length}
                    </span>
                    <div className="w-px h-4 bg-blue-500/30" style={{ backgroundColor: 'rgba(0, 191, 255, 0.3)' }}></div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ backgroundColor: '#00BFFF' }}></div>
                      <span className="text-gray-400">
                        {isHovered ? 'Paused' : 'Ultra Fast Auto-scroll'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Swipe Hint */}
              <div className="lg:hidden mt-3 text-center">
                <p className="text-xs text-gray-500">
                  Swipe or use arrows to navigate • Auto-advances every 1.5 seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPicksSection;