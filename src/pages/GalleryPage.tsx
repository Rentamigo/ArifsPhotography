import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Grid, Filter, Search, Heart, Eye, Download, Share2 } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  date: string;
  location: string;
  camera: string;
  lens: string;
  settings: string;
  likes: number;
  views: number;
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
  const [showMetadata, setShowMetadata] = useState(false);

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
        case 'i':
        case 'I':
          setShowMetadata(!showMetadata);
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
  }, [isOpen, onClose, onNext, onPrevious, showMetadata]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      ref={lightboxRef}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
      onClick={(e) => e.target === lightboxRef.current && onClose()}
    >
      {/* Top Controls */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-[10000] flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="p-2 sm:p-3 bg-black/70 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
            aria-label="Toggle image info"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="hidden sm:block text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
            Press 'I' for info, arrows to navigate, ESC to close
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className="p-2 sm:p-3 bg-black/70 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
            aria-label="Share image"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            className="p-2 sm:p-3 bg-black/70 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
            aria-label="Download image"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 bg-black/70 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={onPrevious}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-[10000] p-2 sm:p-3 bg-black/70 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
        style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-[10000] p-2 sm:p-3 bg-black/70 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
        style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Content */}
      <div className="relative max-w-7xl max-h-full flex items-center justify-center">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          loading="lazy"
        />
      </div>

      {/* Image Metadata Overlay */}
      {showMetadata && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-white border border-white/20 z-[10000]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">{currentImage.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{currentImage.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{currentImage.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{currentImage.likes}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-400">Date:</span> {currentImage.date}</div>
              <div><span className="text-gray-400">Location:</span> {currentImage.location}</div>
              <div><span className="text-gray-400">Category:</span> {currentImage.category}</div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-400">Camera:</span> {currentImage.camera}</div>
              <div><span className="text-gray-400">Lens:</span> {currentImage.lens}</div>
              <div><span className="text-gray-400">Settings:</span> {currentImage.settings}</div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} of {images.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const observerRef = useRef<IntersectionObserver>();

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/images/29.jpg',
      alt: 'Professional portrait photography showcasing natural lighting',
      category: 'Portrait',
      title: 'Natural Light Portrait',
      description: 'A stunning portrait captured during golden hour, showcasing the beauty of natural lighting.',
      date: 'March 15, 2024',
      location: 'Central Park, NYC',
      camera: 'Canon EOS R5',
      lens: '85mm f/1.4',
      settings: 'f/2.8, 1/200s, ISO 400',
      likes: 245,
      views: 1250
    },
    {
      id: 2,
      src: '/images/28.jpg',
      alt: 'Elegant wedding ceremony captured in golden hour',
      category: 'Wedding',
      title: 'Golden Hour Wedding',
      description: 'An intimate wedding moment captured during the magical golden hour.',
      date: 'February 28, 2024',
      location: 'Napa Valley, CA',
      camera: 'Sony A7R IV',
      lens: '24-70mm f/2.8',
      settings: 'f/4, 1/250s, ISO 200',
      likes: 389,
      views: 2100
    },
    {
      id: 3,
      src: '/images/27.jpg',
      alt: 'High fashion editorial photography with dramatic lighting',
      category: 'Fashion',
      title: 'Editorial Fashion',
      description: 'High-fashion editorial shoot with dramatic studio lighting and creative composition.',
      date: 'March 10, 2024',
      location: 'Studio NYC',
      camera: 'Nikon D850',
      lens: '70-200mm f/2.8',
      settings: 'f/5.6, 1/160s, ISO 100',
      likes: 156,
      views: 890
    },
    {
      id: 4,
      src: '/images/26.JPG',
      alt: 'Commercial product photography with professional setup',
      category: 'Commercial',
      title: 'Product Excellence',
      description: 'Professional commercial photography showcasing product details and quality.',
      date: 'March 5, 2024',
      location: 'Commercial Studio',
      camera: 'Canon EOS R6',
      lens: '100mm f/2.8 Macro',
      settings: 'f/8, 1/125s, ISO 100',
      likes: 98,
      views: 567
    },
    {
      id: 5,
      src: '/images/25.jpg',
      alt: 'Corporate event photography capturing key moments',
      category: 'Event',
      title: 'Corporate Gathering',
      description: 'Dynamic event photography capturing the energy and important moments of corporate gatherings.',
      date: 'February 20, 2024',
      location: 'Manhattan Conference Center',
      camera: 'Sony A7 III',
      lens: '24-105mm f/4',
      settings: 'f/4, 1/200s, ISO 800',
      likes: 134,
      views: 756
    },
    {
      id: 6,
      src: '/images/24.jpg',
      alt: 'Fine art photography with creative composition',
      category: 'Art',
      title: 'Creative Vision',
      description: 'Fine art photography exploring creative composition and artistic expression.',
      date: 'March 1, 2024',
      location: 'Brooklyn Bridge',
      camera: 'Fujifilm X-T4',
      lens: '16-55mm f/2.8',
      settings: 'f/11, 1/60s, ISO 200',
      likes: 278,
      views: 1456
    },
    {
      id: 7,
      src: '/images/18.jpg',
      alt: 'Stunning landscape photography at sunrise',
      category: 'Landscape',
      title: 'Morning Glory',
      description: 'Breathtaking landscape captured during the serene morning hours.',
      date: 'February 15, 2024',
      location: 'Yosemite National Park',
      camera: 'Canon EOS R5',
      lens: '16-35mm f/2.8',
      settings: 'f/8, 1/30s, ISO 100',
      likes: 445,
      views: 2890
    },
    {
      id: 8,
      src: '/images/23.jpg',
      alt: 'Urban street photography capturing city life',
      category: 'Street',
      title: 'City Stories',
      description: 'Street photography capturing the authentic moments and stories of urban life.',
      date: 'February 25, 2024',
      location: 'Times Square, NYC',
      camera: 'Leica Q2',
      lens: '28mm f/1.7',
      settings: 'f/2.8, 1/250s, ISO 400',
      likes: 189,
      views: 1123
    },
    {
      id: 9,
      src: '/images/22.JPG',
      alt: 'Intimate portrait session with emotional depth',
      category: 'Portrait',
      title: 'Emotional Depth',
      description: 'An intimate portrait session capturing genuine emotions and personal connections.',
      date: 'March 8, 2024',
      location: 'Home Studio',
      camera: 'Sony A7R V',
      lens: '50mm f/1.4',
      settings: 'f/2, 1/160s, ISO 320',
      likes: 312,
      views: 1678
    },
    {
      id: 10,
      src: '/iamges/9.jpg ',
      alt: 'Romantic wedding photography in natural setting',
      category: 'Wedding',
      title: 'Natural Romance',
      description: 'Romantic wedding photography in a beautiful natural outdoor setting.',
      date: 'February 14, 2024',
      location: 'Botanical Gardens',
      camera: 'Canon EOS R6 Mark II',
      lens: '35mm f/1.4',
      settings: 'f/2.8, 1/200s, ISO 250',
      likes: 567,
      views: 3245
    },
    {
      id: 11,
      src: '/images/26.JPG',
      alt: 'Professional business portrait with modern styling',
      category: 'Commercial',
      title: 'Business Professional',
      description: 'Modern business portrait photography for corporate and professional use.',
      date: 'March 12, 2024',
      location: 'Corporate Office',
      camera: 'Nikon Z9',
      lens: '85mm f/1.8',
      settings: 'f/4, 1/200s, ISO 200',
      likes: 145,
      views: 823
    },
    {
      id: 12,
      src: '/images/17.jpg',
      alt: 'Artistic black and white photography composition',
      category: 'Art',
      title: 'Monochrome Art',
      description: 'Artistic black and white photography exploring contrast and composition.',
      date: 'February 18, 2024',
      location: 'Art District',
      camera: 'Fujifilm X-Pro3',
      lens: '23mm f/2',
      settings: 'f/5.6, 1/125s, ISO 160',
      likes: 234,
      views: 1345
    }
  ];

  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];

  // Filter images based on category and search
  const filteredImages = galleryImages.filter(img => {
    const matchesCategory = selectedCategory === 'All' || img.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <div className="min-h-screen bg-black">
      {/* Hero Section - Reduced top padding */}
      <section className="relative pt-16 sm:pt-18 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255,0.1)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                Photography <span className="text-blue-500" style={{ color: '#00BFFF' }}>Gallery</span>
              </h1>
              <Grid className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
            </div>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#00BFFF' }}></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive collection of professional photography spanning multiple genres. 
              Each image represents our commitment to artistic excellence and technical precision.
            </p>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 lg:mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gallery..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300 text-sm sm:text-base"
                style={{ '--focus-border': '#00BFFF' } as React.CSSProperties}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                style={viewMode === 'grid' ? { backgroundColor: '#00BFFF' } : {}}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
                  viewMode === 'masonry' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                style={viewMode === 'masonry' ? { backgroundColor: '#00BFFF' } : {}}
                aria-label="Masonry view"
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center mt-6">
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
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                ref={index === filteredImages.length - 1 ? lastImageElementRef : null}
                data-image-id={image.id}
                className="group relative cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent p-1 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300" style={{ borderColor: 'rgba(0, 191, 255, 0.2)', '--hover-border': 'rgba(0, 191, 255, 0.4)' } as React.CSSProperties}>
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    {visibleImages.has(image.id) || index < 12 ? (
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`w-full object-cover transition-all duration-500 group-hover:scale-110 ${
                          viewMode === 'grid' 
                            ? 'h-48 sm:h-56 lg:h-64 xl:h-72' 
                            : 'h-auto'
                        }`}
                        style={viewMode === 'masonry' ? { aspectRatio: `${1 + Math.random() * 0.5}` } : {}}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 sm:h-56 lg:h-64 xl:h-72 bg-gray-900 flex items-center justify-center">
                        <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                      <div className="p-3 sm:p-4 w-full">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
                          <span className="text-blue-400 text-xs sm:text-sm font-medium" style={{ color: '#00BFFF' }}>{image.category}</span>
                        </div>
                        <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">{image.title}</h3>
                        <p className="text-gray-300 text-xs sm:text-sm line-clamp-2">{image.description}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{image.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{image.likes}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-gray-300">
                            <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs">View</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium" style={{ backgroundColor: 'rgba(0, 191, 255, 0.9)' }}>
                  {image.category}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <Camera className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-400 mb-2">No Images Found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          )}

          {/* Gallery Stats */}
          <div className="mt-12 sm:mt-16 text-center">
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
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </div>
  );
};

export default GalleryPage;