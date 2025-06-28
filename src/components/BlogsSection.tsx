import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, BookOpen, Tag, Eye, Heart } from 'lucide-react';

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
}

const BlogCard: React.FC<BlogCardProps> = ({ post, isVisible }) => {
  return (
    <article 
      className={`group bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 transform hover:scale-105 ${
        isVisible ? 'animate-fade-in' : 'opacity-100'
      }`}
      style={{ 
        borderColor: 'rgba(0, 191, 255, 0.2)',
        '--hover-border': 'rgba(0, 191, 255, 0.4)',
        '--hover-shadow': '0 25px 50px -12px rgba(0, 191, 255, 0.1)'
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 191, 255, 0.4)';
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 191, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 191, 255, 0.2)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Blog Image */}
      <div className="relative overflow-hidden h-40 sm:h-48">
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
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-blue-400 px-2 py-1 rounded-full text-xs font-medium" style={{ color: '#00BFFF' }}>
          {post.category}
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-2 left-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      <div className="p-4 sm:p-5">
        {/* Meta Information */}
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{post.publishDate}</span>
          </div>
          <div className="w-1 h-1 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2" 
            style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00BFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 2).map((tag, index) => (
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
        <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-6 h-6 rounded-full border border-blue-500/30"
              style={{ borderColor: 'rgba(0, 191, 255, 0.3)' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            <p className="text-white font-medium text-xs">{post.author}</p>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors duration-300 group/btn"
            style={{ color: '#00BFFF', '--hover-color': '#38bdf8' } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#00BFFF'}
          >
            Read More
            <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const BlogsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visiblePosts, setVisiblePosts] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver>();

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Art of Natural Light Photography: Mastering Golden Hour Techniques",
      excerpt: "Discover the secrets behind capturing stunning portraits during the golden hour. Learn about positioning, camera settings, and post-processing techniques.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 20, 2024",
      readTime: "8 min read",
      category: "Techniques",
      tags: ["Golden Hour", "Portrait", "Natural Light"],
      image: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 2450,
      likes: 189,
      featured: true,
      slug: "natural-light-photography-golden-hour"
    },
    {
      id: 2,
      title: "Behind the Scenes: Award-Winning Wedding Photography Session",
      excerpt: "Take an exclusive look behind the scenes of our Times of India award-winning wedding photography session.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 18, 2024",
      readTime: "12 min read",
      category: "Behind the Scenes",
      tags: ["Wedding", "Award Winning", "Behind the Scenes"],
      image: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 3200,
      likes: 245,
      featured: false,
      slug: "award-winning-wedding-photography-behind-scenes"
    },
    {
      id: 3,
      title: "Commercial Photography: Creating Compelling Brand Stories",
      excerpt: "Learn how to create powerful visual narratives for brands through commercial photography.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 15, 2024",
      readTime: "10 min read",
      category: "Commercial",
      tags: ["Commercial", "Branding", "Business"],
      image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 1890,
      likes: 156,
      featured: false,
      slug: "commercial-photography-brand-stories"
    },
    {
      id: 4,
      title: "Fashion Photography: Capturing Style and Emotion",
      excerpt: "Dive into the world of fashion photography where style meets storytelling.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 12, 2024",
      readTime: "9 min read",
      category: "Fashion",
      tags: ["Fashion", "Style", "Editorial"],
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 2100,
      likes: 178,
      featured: false,
      slug: "fashion-photography-style-emotion"
    },
    {
      id: 5,
      title: "Event Photography: Capturing Moments That Matter",
      excerpt: "Master the art of event photography with tips on anticipating moments and working in challenging conditions.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 10, 2024",
      readTime: "7 min read",
      category: "Events",
      tags: ["Events", "Documentary", "Moments"],
      image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 1650,
      likes: 134,
      featured: false,
      slug: "event-photography-capturing-moments"
    },
    {
      id: 6,
      title: "The Journey to Times of India Recognition: Lessons Learned",
      excerpt: "A personal reflection on the journey that led to receiving the Times of India Best Entrepreneur Award.",
      content: "Full blog content would go here...",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "March 8, 2024",
      readTime: "15 min read",
      category: "Personal",
      tags: ["Award", "Journey", "Entrepreneurship"],
      image: "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 4100,
      likes: 312,
      featured: false,
      slug: "times-of-india-recognition-journey"
    }
  ];

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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

  // Initialize visible posts
  useEffect(() => {
    setVisiblePosts(new Set(blogPosts.map(post => post.id)));
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 bg-black dark:bg-black relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white dark:text-white text-center">
              Photography <span className="text-blue-500" style={{ color: '#00BFFF' }}>Blogs</span>
            </h2>
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
          </div>
          <div className="w-12 sm:w-16 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto mb-3 sm:mb-4 lg:mb-6" style={{ backgroundColor: '#00BFFF' }}></div>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Explore our latest insights, tutorials, and behind-the-scenes stories from the world of professional photography. 
            Learn from our award-winning experiences and industry expertise.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 lg:mb-12 px-4">
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

        {/* All Posts Grid - Uniform Small Cards */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                ref={index === filteredPosts.length - 1 ? lastPostElementRef : null}
                data-post-id={post.id}
              >
                <BlogCard
                  post={post}
                  isVisible={visiblePosts.has(post.id) || index < 8}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Blog Stats */}
        <div className="text-center">
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
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{filteredPosts.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Showing</div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 p-4 sm:p-6 lg:p-8 rounded-2xl max-w-2xl mx-auto" style={{ background: 'linear-gradient(to right, rgba(0, 191, 255, 0.2), rgba(56, 189, 248, 0.2))', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              Never Miss Our Latest <span className="text-blue-500" style={{ color: '#00BFFF' }}>Insights</span>
            </h3>
            <p className="text-gray-300 mb-3 sm:mb-4 lg:mb-6 leading-relaxed text-xs sm:text-sm lg:text-base">
              Subscribe to our newsletter and get the latest photography tips, tutorials, and behind-the-scenes content 
              delivered directly to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25 text-xs sm:text-sm lg:text-base" style={{ backgroundColor: '#00BFFF', boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)' }}>
                Subscribe Now
              </button>
              <button className="w-full sm:w-auto border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base" style={{ borderColor: '#00BFFF', color: '#00BFFF' }}>
                Browse Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;