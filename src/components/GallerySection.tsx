import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Grid, Filter } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious
}) => {
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      ref={lightboxRef}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
      onClick={(e) => e.target === lightboxRef.current && onClose()}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 sm:top-4 right-2 sm:right-4 z-60 p-2 sm:p-3 bg-black/50 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110"
        style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Navigation buttons */}
      <button
        onClick={onPrevious}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-60 p-2 sm:p-3 bg-black/50 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110"
        style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-60 p-2 sm:p-3 bg-black/50 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110"
        style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Image container */}
      <div className="relative max-w-7xl max-h-full flex items-center justify-center">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          loading="lazy"
        />
        
        {/* Image info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6 rounded-b-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
            <span className="text-blue-400 text-xs sm:text-sm font-medium" style={{ color: '#00BFFF' }}>{currentImage.category}</span>
          </div>
          <h3 className="text-white text-base sm:text-xl font-bold">{currentImage.title}</h3>
          <p className="text-gray-300 text-xs sm:text-sm mt-1">
            {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
};

const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver>();

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/images/1.jpeg',
      alt: 'Professional portrait photography showcasing natural lighting',
      category: 'Portrait',
      title: 'Natural Light Portrait'
    },
    {
      id: 2,
      src: '/images/2.jpg',
      alt: 'Elegant wedding ceremony captured in golden hour',
      category: 'Wedding',
      title: 'Golden Hour Wedding'
    },
    {
      id: 3,
      src: '/images/13.jpg',
      alt: 'High fashion editorial photography with dramatic lighting',
      category: 'Fashion',
      title: 'Editorial Fashion'
    },
    {
      id: 4,
      src: '/images/10.JPG',
      alt: 'Commercial product photography with professional setup',
      category: 'Commercial',
      title: 'Product Excellence'
    },
    {
      id: 5,
      src: '/images/19.jpg',
      alt: 'Corporate event photography capturing key moments',
      category: 'Event',
      title: 'Corporate Gathering'
    },
    {
      id: 6,
      src: '/images/11.jpg',
      alt: 'Fine art photography with creative composition',
      category: 'Art',
      title: 'Creative Vision'
    },
    {
      id: 7,
      src: '/images/12.jpg',
      alt: 'Stunning landscape photography at sunrise',
      category: 'Landscape',
      title: 'Morning Glory'
    },
    {
      id: 8,
      src: '/images/24.jpg',
      alt: 'Urban street photography capturing city life',
      category: 'Street',
      title: 'City Stories'
    },
    {
      id: 9,
      src: '/images/25.jpg',
      alt: 'Intimate portrait session with emotional depth',
      category: 'Portrait',
      title: 'Emotional Depth'
    },
    {
      id: 10,
      src: '/images/8.jpg',
      alt: 'Romantic wedding photography in natural setting',
      category: 'Wedding',
      title: 'Natural Romance'
    },
    {
      id: 11,
      src: '/images/6.jpg',
      alt: 'Professional business portrait with modern styling',
      category: 'Commercial',
      title: 'Business Professional'
    },
    {
      id: 12,
      src: '/images/9.jpg',
      alt: 'Artistic black and white photography composition',
      category: 'Art',
      title: 'Monochrome Art'
    }
  ];

  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Lazy loading implementation
  const lastImageElementRef = useCallback((node: HTMLDivElement) => {
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imageId = parseInt(entry.target.getAttribute('data-image-id') || '0');
          setVisibleImages(prev => new Set([...prev, imageId]));
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    if (node) observerRef.current.observe(node);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const previousImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <Camera className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center">
              Photography <span className="text-blue-500" style={{ color: '#00BFFF' }}>Gallery</span>
            </h2>
            <Grid className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
          </div>
          <div className="w-12 sm:w-16 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto mb-3 sm:mb-4 lg:mb-6" style={{ backgroundColor: '#00BFFF' }}></div>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Explore our curated collection of professional photography spanning multiple genres. 
            Each image represents our commitment to artistic excellence and technical precision.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 lg:mb-12 px-4">
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 p-1 sm:p-2 rounded-xl border border-blue-500/20 overflow-x-auto scrollbar-hide max-w-full" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400 ml-1 sm:ml-2 flex-shrink-0" style={{ color: '#00BFFF' }} />
            <div className="flex gap-1 sm:gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                  style={selectedCategory === category ? {
                    backgroundColor: '#00BFFF',
                    boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)'
                  } : {}}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid - Mobile: 2 columns portrait, Tablet+: 3-4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              ref={index === filteredImages.length - 1 ? lastImageElementRef : null}
              data-image-id={image.id}
              className="group relative cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              {/* Image container with blue border effect */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent p-1 border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                <div className="relative bg-black rounded-lg overflow-hidden">
                  {/* Lazy loaded image - Portrait aspect ratio on mobile */}
                  {visibleImages.has(image.id) || index < 8 ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-48 sm:h-56 lg:h-64 xl:h-80 object-cover transition-all duration-500 group-hover:scale-110"
                      style={{
                        // Mobile: Portrait aspect ratio (3:4)
                        // Tablet+: Maintain current aspect ratios
                        aspectRatio: window.innerWidth < 640 ? '3/4' : 'auto'
                      }}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  ) : (
                    <div 
                      className="w-full bg-gray-900 flex items-center justify-center"
                      style={{
                        height: window.innerWidth < 640 ? 'auto' : '12rem',
                        aspectRatio: window.innerWidth < 640 ? '3/4' : 'auto'
                      }}
                    >
                      <Camera className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-gray-600" />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                    <div className="p-2 sm:p-3 lg:p-4 w-full">
                      <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
                        <span className="text-blue-400 text-xs sm:text-sm font-medium" style={{ color: '#00BFFF' }}>{image.category}</span>
                      </div>
                      <h3 className="text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">{image.title}</h3>
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                        <ZoomIn className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                        <span className="text-xs sm:text-sm">Click to enlarge</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-1 sm:top-2 lg:top-3 left-1 sm:left-2 lg:left-3 bg-blue-600/90 backdrop-blur-sm text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs font-medium" style={{ backgroundColor: 'rgba(0, 191, 255, 0.9)' }}>
                {image.category}
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Stats */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-8 bg-gray-900/30 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{galleryImages.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Total Images</div>
            </div>
            <div className="hidden sm:block w-px h-6 lg:h-8 bg-blue-500/30" style={{ backgroundColor: 'rgba(0, 191, 255, 0.3)' }}></div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{categories.length - 1}</div>
              <div className="text-xs sm:text-sm text-gray-400">Categories</div>
            </div>
            <div className="hidden sm:block w-px h-6 lg:h-8 bg-blue-500/30" style={{ backgroundColor: 'rgba(0, 191, 255, 0.3)' }}></div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{filteredImages.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Showing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </section>
  );
};

export default GallerySection;