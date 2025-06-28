import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  photo: string;
  rating: number;
  quote: string;
}

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoRotateRef = useRef<NodeJS.Timeout>();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechCorp Solutions",
      photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      quote: "Arif's photography exceeded all expectations. His attention to detail and creative vision transformed our corporate event into a visual masterpiece. The professionalism and quality delivered were absolutely outstanding."
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO",
      company: "Innovation Labs",
      photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      quote: "Working with Arif was an incredible experience. His entrepreneurial mindset and artistic expertise created stunning visuals for our product launch. The Times of India recognition is well-deserved!"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Brand Manager",
      company: "Creative Studios",
      photo: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      quote: "Arif's innovative approach to photography is remarkable. He captured our brand essence perfectly, delivering images that tell our story beautifully. His award-winning talent truly shines through every shot."
    }
  ];

  // Auto-rotate functionality
  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    
    autoRotateRef.current = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }
    }, 5000);
  }, [isHovered, testimonials.length]);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
  }, []);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Mouse event handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    stopAutoRotate();
  }, [stopAutoRotate]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Effects
  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, [startAutoRotate, stopAutoRotate]);

  useEffect(() => {
    if (!isHovered) {
      startAutoRotate();
    }
  }, [isHovered, startAutoRotate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${
          index < rating 
            ? 'text-blue-500 fill-current' 
            : 'text-gray-600'
        }`}
        style={index < rating ? { color: '#00BFFF' } : {}}
      />
    ));
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <Quote className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center">
              Client <span className="text-blue-500" style={{ color: '#00BFFF' }}>Testimonials</span>
            </h2>
            <Quote className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500 scale-x-[-1]" style={{ color: '#00BFFF' }} />
          </div>
          <div className="w-12 sm:w-16 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto mb-3 sm:mb-4 lg:mb-6" style={{ backgroundColor: '#00BFFF' }}></div>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Hear from our satisfied clients who have experienced the excellence of our photography services. 
            Their success stories reflect our commitment to delivering exceptional results.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={goToPrevious}
            className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 p-2 sm:p-3 bg-gray-900/80 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm"
            style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(17, 24, 39, 0.8)'}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 p-2 sm:p-3 bg-gray-900/80 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm"
            style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(17, 24, 39, 0.8)'}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Single Testimonial Display */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 relative group hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 max-w-4xl mx-auto" style={{ borderColor: 'rgba(0, 191, 255, 0.2)', '--hover-border': 'rgba(0, 191, 255, 0.4)', '--hover-shadow': '0 25px 50px -12px rgba(0, 191, 255, 0.1)' } as React.CSSProperties}>
            {/* Quote Icon */}
            <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-500" style={{ color: '#00BFFF' }} />
            </div>

            {/* Current Testimonial Content */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Client Photo and Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors duration-300" style={{ borderColor: 'rgba(0, 191, 255, 0.3)' }}>
                    <img
                      src={testimonials[currentIndex].photo}
                      alt={`${testimonials[currentIndex].name} - ${testimonials[currentIndex].position}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)' }}></div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-blue-400 font-medium mb-2 text-sm sm:text-base lg:text-lg" style={{ color: '#00BFFF' }}>
                    {testimonials[currentIndex].position}
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {testimonials[currentIndex].company}
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-gray-300 text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed italic text-center sm:text-left">
                "{testimonials[currentIndex].quote}"
              </blockquote>
            </div>

            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-4 sm:left-8 right-4 sm:right-8 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" style={{ background: 'linear-gradient(to right, transparent, rgba(0, 191, 255, 0.5), transparent)' }}></div>
          </div>

          {/* Dot Navigation */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-6 sm:w-8 h-2 sm:h-3 bg-blue-500 shadow-lg shadow-blue-500/50'
                    : 'w-2 sm:w-3 h-2 sm:h-3 bg-gray-600 hover:bg-gray-500'
                }`}
                style={index === currentIndex ? { 
                  backgroundColor: '#00BFFF',
                  boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.5), 0 4px 6px -2px rgba(0, 191, 255, 0.05)'
                } : {}}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 sm:mt-6 max-w-xs mx-auto">
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400 mb-2">
              <span>Testimonial {currentIndex + 1} of {testimonials.length}</span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ backgroundColor: '#00BFFF' }}></div>
                {isHovered ? 'Paused' : 'Auto-rotating'}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1">
              <div 
                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
                  backgroundColor: '#00BFFF'
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 p-4 sm:p-6 lg:p-8 rounded-2xl max-w-2xl mx-auto" style={{ background: 'linear-gradient(to right, rgba(0, 191, 255, 0.2), rgba(56, 189, 248, 0.2))', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-gray-300 mb-3 sm:mb-4 lg:mb-6 leading-relaxed text-xs sm:text-sm lg:text-base">
              Join our growing list of satisfied clients and experience the award-winning photography 
              that has earned recognition from Times of India and countless happy customers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25 text-xs sm:text-sm lg:text-base" style={{ backgroundColor: '#00BFFF', boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)' }}>
                Start Your Project
              </button>
              <button className="w-full sm:w-auto border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base" style={{ borderColor: '#00BFFF', color: '#00BFFF' }}>
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;