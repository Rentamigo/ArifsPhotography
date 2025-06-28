import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, Clock, User, ArrowLeft, Share2, Heart, Eye, BookOpen, 
  Tag, Facebook, Twitter, Linkedin, Copy, Check, ChevronRight,
  Camera, Award, MessageCircle, Send
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  authorBio: string;
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

interface Comment {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  date: string;
  likes: number;
}

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Art of Natural Light Photography: Mastering Golden Hour Techniques",
      excerpt: "Discover the secrets behind capturing stunning portraits during the golden hour. Learn about positioning, camera settings, and post-processing techniques that will elevate your photography to professional levels.",
      content: `
        <p>Natural light photography is one of the most rewarding and challenging aspects of professional photography. The golden hour, that magical time just after sunrise or before sunset, offers photographers a unique opportunity to capture images with warm, soft, and incredibly flattering light.</p>

        <h2>Understanding Golden Hour</h2>
        <p>The golden hour occurs when the sun is low on the horizon, typically within the first hour after sunrise or the last hour before sunset. During this time, the light is:</p>
        <ul>
          <li>Warm and golden in color temperature</li>
          <li>Soft and diffused</li>
          <li>Directional but not harsh</li>
          <li>Perfect for creating mood and atmosphere</li>
        </ul>

        <h2>Camera Settings for Golden Hour</h2>
        <p>To make the most of golden hour lighting, consider these camera settings:</p>
        <ul>
          <li><strong>Aperture:</strong> f/2.8 to f/5.6 for portraits, f/8 to f/11 for landscapes</li>
          <li><strong>ISO:</strong> Keep as low as possible (100-400) to maintain image quality</li>
          <li><strong>Shutter Speed:</strong> Adjust based on your aperture and ISO settings</li>
          <li><strong>White Balance:</strong> Daylight or slightly warmer for enhanced golden tones</li>
        </ul>

        <h2>Positioning and Composition</h2>
        <p>The key to successful golden hour photography lies in understanding how to position your subject relative to the light source:</p>

        <h3>Backlighting</h3>
        <p>Position your subject between you and the sun to create a beautiful rim light effect. This technique can produce stunning silhouettes or dreamy, ethereal portraits when you expose for the subject's face.</p>

        <h3>Side Lighting</h3>
        <p>Place the sun to one side of your subject for dramatic shadows and depth. This creates dimension and can be particularly effective for portrait photography.</p>

        <h3>Front Lighting</h3>
        <p>While less dramatic, front lighting during golden hour provides even, warm illumination that's perfect for traditional portraits.</p>

        <h2>Post-Processing Tips</h2>
        <p>Golden hour images often benefit from subtle post-processing enhancements:</p>
        <ul>
          <li>Enhance the warm tones without overdoing it</li>
          <li>Adjust highlights and shadows to balance exposure</li>
          <li>Add a subtle vignette to draw focus to your subject</li>
          <li>Consider graduated filters to balance sky and foreground</li>
        </ul>

        <h2>Common Challenges and Solutions</h2>
        <p>Golden hour photography isn't without its challenges. Here are some common issues and how to overcome them:</p>

        <h3>Changing Light Conditions</h3>
        <p>Light changes rapidly during golden hour. Be prepared to adjust your settings frequently and work quickly to capture the perfect moment.</p>

        <h3>Exposure Difficulties</h3>
        <p>The contrast between bright sky and darker subjects can be challenging. Use exposure compensation, graduated neutral density filters, or HDR techniques to manage extreme contrasts.</p>

        <h3>Color Temperature Variations</h3>
        <p>As the sun moves, color temperature changes. Shoot in RAW format to have maximum flexibility in post-processing.</p>

        <h2>Conclusion</h2>
        <p>Mastering golden hour photography takes practice, patience, and understanding of light. The results, however, are worth the effort. The warm, magical quality of golden hour light can transform ordinary scenes into extraordinary photographs that capture the viewer's imagination and emotion.</p>

        <p>Remember, the best camera settings and techniques mean nothing without practice. Get out there during golden hour, experiment with different approaches, and develop your own style. Every sunset and sunrise offers new opportunities to create something beautiful.</p>
      `,
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      authorBio: "Award-winning photographer with over 6 years of experience in portrait, wedding, and commercial photography. Recognized by Times of India as Best Entrepreneur in Creative Industry.",
      publishDate: "March 20, 2024",
      readTime: "8 min read",
      category: "Techniques",
      tags: ["Golden Hour", "Portrait", "Natural Light", "Photography Tips", "Camera Settings"],
      image: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1200",
      views: 2450,
      likes: 189,
      featured: true,
      slug: "natural-light-photography-golden-hour"
    },
    {
      id: 2,
      title: "Behind the Scenes: Award-Winning Wedding Photography Session",
      excerpt: "Take an exclusive look behind the scenes of our Times of India award-winning wedding photography session.",
      content: "<p>Wedding photography content...</p>",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      authorBio: "Award-winning photographer specializing in wedding and portrait photography.",
      publishDate: "March 18, 2024",
      readTime: "12 min read",
      category: "Behind the Scenes",
      tags: ["Wedding", "Award Winning", "Behind the Scenes"],
      image: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1200",
      views: 3200,
      likes: 245,
      featured: false,
      slug: "award-winning-wedding-photography-behind-scenes"
    },
    {
      id: 3,
      title: "Commercial Photography: Creating Compelling Brand Stories",
      excerpt: "Learn how to create powerful visual narratives for brands through commercial photography.",
      content: "<p>Commercial photography content...</p>",
      author: "Arif Photography",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      authorBio: "Professional commercial photographer with expertise in brand storytelling.",
      publishDate: "March 15, 2024",
      readTime: "10 min read",
      category: "Commercial",
      tags: ["Commercial", "Branding", "Business"],
      image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200",
      views: 1890,
      likes: 156,
      featured: false,
      slug: "commercial-photography-brand-stories"
    }
  ];

  // Mock comments data
  const mockComments: Comment[] = [
    {
      id: 1,
      author: "Sarah Johnson",
      authorImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "This is incredibly helpful! I've been struggling with golden hour photography and your tips about positioning really made a difference. Thank you for sharing your expertise!",
      date: "March 21, 2024",
      likes: 12
    },
    {
      id: 2,
      author: "Michael Chen",
      authorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "The section on camera settings was exactly what I needed. I tried these settings during yesterday's sunset shoot and the results were amazing!",
      date: "March 20, 2024",
      likes: 8
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      authorImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "As a beginner photographer, this article gave me the confidence to try golden hour photography. The post-processing tips were particularly valuable.",
      date: "March 20, 2024",
      likes: 15
    }
  ];

  // Find the current post and related posts
  useEffect(() => {
    const currentPost = blogPosts.find(p => p.slug === slug);
    if (currentPost) {
      setPost(currentPost);
      setLikes(currentPost.likes);
      setViews(currentPost.views);
      setComments(mockComments);
      
      // Get related posts (same category, excluding current post)
      const related = blogPosts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [slug]);

  // Handle like functionality
  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
  };

  // Handle sharing
  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL');
        }
        break;
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commentAuthor.trim()) return;

    setIsSubmittingComment(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const comment: Comment = {
      id: comments.length + 1,
      author: commentAuthor,
      authorImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: newComment,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      likes: 0
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    setCommentAuthor('');
    setIsSubmittingComment(false);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Camera className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Post Not Found</h2>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors duration-300 mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back to Blog</span>
          </button>

          {/* Article Header */}
          <div className="mb-8 sm:mb-12">
            {/* Category and Featured Badge */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{likes} likes</span>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-red-500/30"
              />
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base">{post.author}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{post.authorBio}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isLiked
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{likes}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsSharing(!isSharing)}
                  className="flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>

                {/* Share Dropdown */}
                {isSharing && (
                  <div className="absolute top-full left-0 mt-2 bg-gray-900 border border-red-500/20 rounded-lg p-3 z-50 min-w-[200px]">
                    <div className="space-y-2">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-300"
                      >
                        <Facebook className="w-4 h-4" />
                        <span className="text-sm">Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-300"
                      >
                        <Twitter className="w-4 h-4" />
                        <span className="text-sm">Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-300"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span className="text-sm">LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-300"
                      >
                        {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="text-sm">{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article 
                ref={contentRef}
                className="prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  '--tw-prose-body': '#d1d5db',
                  '--tw-prose-headings': '#ffffff',
                  '--tw-prose-links': '#ef4444',
                  '--tw-prose-bold': '#ffffff',
                  '--tw-prose-counters': '#ef4444',
                  '--tw-prose-bullets': '#ef4444',
                  '--tw-prose-hr': '#374151',
                  '--tw-prose-quotes': '#d1d5db',
                  '--tw-prose-quote-borders': '#ef4444',
                  '--tw-prose-captions': '#9ca3af',
                  '--tw-prose-code': '#ef4444',
                  '--tw-prose-pre-code': '#d1d5db',
                  '--tw-prose-pre-bg': '#1f2937',
                  '--tw-prose-th-borders': '#374151',
                  '--tw-prose-td-borders': '#374151',
                } as React.CSSProperties}
              />

              {/* Tags */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm hover:bg-red-500/30 transition-colors duration-300 cursor-pointer"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6 sm:space-y-8">
                {/* Table of Contents */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-red-400" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    <a href="#understanding-golden-hour" className="block text-sm text-gray-300 hover:text-red-400 transition-colors duration-300">
                      Understanding Golden Hour
                    </a>
                    <a href="#camera-settings" className="block text-sm text-gray-300 hover:text-red-400 transition-colors duration-300">
                      Camera Settings
                    </a>
                    <a href="#positioning" className="block text-sm text-gray-300 hover:text-red-400 transition-colors duration-300">
                      Positioning & Composition
                    </a>
                    <a href="#post-processing" className="block text-sm text-gray-300 hover:text-red-400 transition-colors duration-300">
                      Post-Processing Tips
                    </a>
                    <a href="#challenges" className="block text-sm text-gray-300 hover:text-red-400 transition-colors duration-300">
                      Common Challenges
                    </a>
                  </nav>
                </div>

                {/* Author Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 sm:p-6">
                  <div className="text-center">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-red-500/30 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-white mb-2">{post.author}</h3>
                    <p className="text-sm text-gray-400 mb-4">{post.authorBio}</p>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300">
                      Follow
                    </button>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
                  <p className="text-sm text-gray-300 mb-4">Get the latest photography tips and tutorials.</p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300 text-sm"
                    />
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-red-400" />
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8 sm:mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Your name"
                  className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                  required
                />
                <div></div>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none mb-4"
                required
              />
              <button
                type="submit"
                disabled={isSubmittingComment}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingComment ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-700/50 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-4">
                    <img
                      src={comment.authorImage}
                      alt={comment.author}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-red-500/30 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-white text-sm sm:text-base">{comment.author}</h4>
                        <span className="text-xs sm:text-sm text-gray-400">{comment.date}</span>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors duration-300">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">{comment.likes}</span>
                        </button>
                        <button className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-xs sm:text-sm">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">
              Related <span className="text-red-500">Articles</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl overflow-hidden hover:border-red-500/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-red-600/90 text-white px-2 py-1 rounded-md text-xs font-medium">
                      {relatedPost.category}
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                      <span>{relatedPost.publishDate}</span>
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={relatedPost.authorImage}
                          alt={relatedPost.author}
                          className="w-6 h-6 rounded-full border border-red-500/30"
                        />
                        <span className="text-white font-medium text-sm">{relatedPost.author}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-red-400 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-sm">Read More</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetailPage;