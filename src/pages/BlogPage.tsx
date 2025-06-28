import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, BookOpen, Tag, Eye, Heart, Search, Filter, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  featured: boolean;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
  isVisible: boolean;
  layout?: 'grid' | 'list';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, isVisible, layout = 'grid' }) => {
  const isListLayout = layout === 'list';

  return (
    <article 
      className={`group bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:scale-105 ${
        isVisible ? 'animate-fade-in' : 'opacity-100'
      } ${post.featured ? 'ring-2 ring-blue-500/30' : ''} ${
        isListLayout ? 'flex flex-col sm:flex-row' : ''
      }`}
      style={{ 
        borderColor: 'rgba(0, 191, 255, 0.2)',
        '--hover-border': 'rgba(0, 191, 255, 0.4)',
        '--hover-shadow': '0 25px 50px -12px rgba(0, 191, 255, 0.1)'
      } as React.CSSProperties}
    >
      {/* Featured Badge */}
      {post.featured && (
        <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#00BFFF' }}>
          Featured
        </div>
      )}

      {/* Blog Image */}
      <div className={`relative overflow-hidden ${
        isListLayout 
          ? 'w-full sm:w-64 h-48 sm:h-auto flex-shrink-0' 
          : 'h-48 sm:h-56 lg:h-64'
      }`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-blue-400 px-2 py-1 rounded-full text-xs font-medium" style={{ color: '#00BFFF' }}>
          {post.category}
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 text-white text-xs">
            <Eye className="w-3 h-3" />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center gap-1 text-white text-xs">
            <Heart className="w-3 h-3" />
            <span>{post.likes}</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className={`p-4 sm:p-5 lg:p-6 ${isListLayout ? 'flex-1' : ''}`}>
        {/* Meta Information */}
        <div className="flex items-center gap-3 mb-3 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{post.publishDate}</span>
          </div>
          <div className="w-1 h-1 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 ${
          isListLayout ? 'text-lg sm:text-xl lg:text-2xl' : 'text-lg sm:text-xl lg:text-2xl'
        }`} style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-gray-300 leading-relaxed mb-4 line-clamp-3 ${
          isListLayout ? 'text-sm sm:text-base' : 'text-sm sm:text-base'
        }`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs"
              style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', color: '#00BFFF' }}
            >
              <Tag className="w-2 h-2" />
              {tag}
            </span>
          ))}
        </div>

        {/* Author and Read More */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-blue-500/30"
              style={{ borderColor: 'rgba(0, 191, 255, 0.3)' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            <div>
              <p className="text-white font-medium text-xs sm:text-sm">{post.author}</p>
            </div>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-xs sm:text-sm transition-colors duration-300 group/btn"
            style={{ color: '#00BFFF', '--hover-color': '#38bdf8' } as React.CSSProperties}
          >
            Read More
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const observerRef = useRef<IntersectionObserver>();
  const postsPerPage = 6;

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Art of Natural Light Photography: Mastering Golden Hour Techniques",
      excerpt: "Discover the secrets behind capturing stunning portraits during the golden hour. Learn about positioning, camera settings, and post-processing techniques that will elevate your photography to professional levels.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 20, 2024",
      readTime: "8 min read",
      category: "Techniques",
      tags: ["Golden Hour", "Portrait", "Natural Light", "Photography Tips"],
      image: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 2450,
      likes: 189,
      featured: true,
      slug: "natural-light-photography-golden-hour"
    },
    {
      id: 2,
      title: "Behind the Scenes: Award-Winning Wedding Photography Session",
      excerpt: "Take an exclusive look behind the scenes of our Times of India award-winning wedding photography session. From planning to execution, discover what makes a wedding shoot truly exceptional.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 18, 2024",
      readTime: "12 min read",
      category: "Behind the Scenes",
      tags: ["Wedding", "Award Winning", "Behind the Scenes", "Professional"],
      image: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 3200,
      likes: 245,
      featured: false,
      slug: "award-winning-wedding-photography-behind-scenes"
    },
    {
      id: 3,
      title: "Commercial Photography: Creating Compelling Brand Stories",
      excerpt: "Learn how to create powerful visual narratives for brands through commercial photography. Explore lighting setups, composition techniques, and client collaboration strategies.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 15, 2024",
      readTime: "10 min read",
      category: "Commercial",
      tags: ["Commercial", "Branding", "Business", "Marketing"],
      image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 1890,
      likes: 156,
      featured: false,
      slug: "commercial-photography-brand-stories"
    },
    {
      id: 4,
      title: "Fashion Photography: Capturing Style and Emotion",
      excerpt: "Dive into the world of fashion photography where style meets storytelling. Learn about working with models, styling, and creating images that speak to your audience.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 12, 2024",
      readTime: "9 min read",
      category: "Fashion",
      tags: ["Fashion", "Style", "Editorial", "Creative"],
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 2100,
      likes: 178,
      featured: false,
      slug: "fashion-photography-style-emotion"
    },
    {
      id: 5,
      title: "Event Photography: Capturing Moments That Matter",
      excerpt: "Master the art of event photography with tips on anticipating moments, working in challenging lighting conditions, and delivering memorable images that tell the complete story.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 10, 2024",
      readTime: "7 min read",
      category: "Events",
      tags: ["Events", "Documentary", "Moments", "Storytelling"],
      image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 1650,
      likes: 134,
      featured: false,
      slug: "event-photography-capturing-moments"
    },
    {
      id: 6,
      title: "The Journey to Times of India Recognition: Lessons Learned",
      excerpt: "A personal reflection on the journey that led to receiving the Times of India Best Entrepreneur Award. Discover the challenges, breakthroughs, and lessons that shaped our success.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 8, 2024",
      readTime: "15 min read",
      category: "Personal",
      tags: ["Award", "Journey", "Entrepreneurship", "Success"],
      image: "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 4100,
      likes: 312,
      featured: true,
      slug: "times-of-india-recognition-journey"
    },
    {
      id: 7,
      title: "Portrait Photography: Connecting with Your Subject",
      excerpt: "Learn the art of creating compelling portraits that capture not just appearance, but personality and emotion. Discover techniques for building rapport and directing subjects.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 5, 2024",
      readTime: "11 min read",
      category: "Portrait",
      tags: ["Portrait", "Connection", "Emotion", "Direction"],
      image: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 1780,
      likes: 142,
      featured: false,
      slug: "portrait-photography-connecting-subjects"
    },
    {
      id: 8,
      title: "Street Photography: Finding Stories in Urban Life",
      excerpt: "Explore the dynamic world of street photography. Learn how to capture authentic moments, navigate urban environments, and tell compelling stories through candid imagery.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 2, 2024",
      readTime: "9 min read",
      category: "Street",
      tags: ["Street", "Urban", "Candid", "Documentary"],
      image: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 1920,
      likes: 167,
      featured: false,
      slug: "street-photography-urban-stories"
    }
  ];

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Lazy loading implementation
  const lastPostElementRef = React.useCallback((node: HTMLDivElement) => {
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const postId = parseInt(entry.target.getAttribute('data-post-id') || '0');
          setVisiblePosts(prev => new Set([...prev, postId]));
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    if (node) observerRef.current.observe(node);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Initialize visible posts
  useEffect(() => {
    setVisiblePosts(new Set(blogPosts.map(post => post.id)));
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Reduced top padding */}
      <section className="relative pt-16 sm:pt-18 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                Photography <span className="text-blue-500" style={{ color: '#00BFFF' }}>Blog</span>
              </h1>
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
            </div>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#00BFFF' }}></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our latest insights, tutorials, and behind-the-scenes stories from the world of professional photography. 
              Learn from our award-winning experiences and industry expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 lg:mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 mb-6">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300 text-sm sm:text-base"
                style={{ '--focus-border': '#00BFFF' } as React.CSSProperties}
              />
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLayout('grid')}
                className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
                  layout === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                style={layout === 'grid' ? { backgroundColor: '#00BFFF' } : {}}
                aria-label="Grid layout"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
                  layout === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                style={layout === 'list' ? { backgroundColor: '#00BFFF' } : {}}
                aria-label="List layout"
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 p-1 sm:p-2 rounded-xl border border-blue-500/20 overflow-x-auto scrollbar-hide max-w-full" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400 ml-1 sm:ml-2 flex-shrink-0" style={{ color: '#00BFFF' }} />
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

      {/* Featured Posts Section */}
      {selectedCategory === 'All' && currentPage === 1 && (
        <section className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              Featured <span className="text-blue-500" style={{ color: '#00BFFF' }}>Articles</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {blogPosts.filter(post => post.featured).map((post, index) => (
                <div
                  key={post.id}
                  ref={index === 0 ? lastPostElementRef : null}
                  data-post-id={post.id}
                >
                  <BlogCard
                    post={post}
                    isVisible={visiblePosts.has(post.id) || index < 2}
                    layout="grid"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid/List */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <>
              <div className={`grid gap-6 sm:gap-8 ${
                layout === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {paginatedPosts.map((post, index) => (
                  <div
                    key={post.id}
                    ref={index === paginatedPosts.length - 1 ? lastPostElementRef : null}
                    data-post-id={post.id}
                  >
                    <BlogCard
                      post={post}
                      isVisible={visiblePosts.has(post.id) || index < 6}
                      layout={layout}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-12 gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
                    style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-white hover:bg-blue-600'
                      }`}
                      style={currentPage === page ? { backgroundColor: '#00BFFF' } : { '--hover-bg': '#00BFFF' } as React.CSSProperties}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
                    style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-400 mb-2">No Articles Found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Stats */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-8 bg-gray-900/30 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{blogPosts.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Total Articles</div>
            </div>
            <div className="hidden sm:block w-px h-6 lg:h-8 bg-blue-500/30" style={{ backgroundColor: 'rgba(0, 191, 255, 0.3)' }}></div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{categories.length - 1}</div>
              <div className="text-xs sm:text-sm text-gray-400">Categories</div>
            </div>
            <div className="hidden sm:block w-px h-6 lg:h-8 bg-blue-500/30" style={{ backgroundColor: 'rgba(0, 191, 255, 0.3)' }}></div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                {blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Total Views</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 p-6 sm:p-8 lg:p-12 rounded-2xl text-center" style={{ background: 'linear-gradient(to right, rgba(0, 191, 255, 0.2), rgba(56, 189, 248, 0.2))', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Never Miss Our Latest <span className="text-blue-500" style={{ color: '#00BFFF' }}>Insights</span>
            </h2>
            <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest photography tips, tutorials, and behind-the-scenes content 
              delivered directly to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25" style={{ backgroundColor: '#00BFFF', boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)' }}>
                Subscribe Now
              </button>
              <button className="w-full sm:w-auto border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300" style={{ borderColor: '#00BFFF', color: '#00BFFF' }}>
                Browse Archive
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;