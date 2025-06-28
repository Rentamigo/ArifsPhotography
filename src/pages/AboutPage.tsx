import React, { useState, useEffect, useRef } from 'react';
import { Camera, Award, Star, Calendar, Users, Trophy, Target, Heart, ArrowRight, Quote } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const AboutPage: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver>();

  // Initialize visible sections immediately
  useEffect(() => {
    // Make all sections visible by default to prevent blank page
    setVisibleSections(new Set(['hero', 'story', 'timeline', 'achievements', 'values', 'cta']));
  }, []);

  // Intersection Observer for animations (optional enhancement)
  const sectionRef = React.useCallback((node: HTMLElement | null, sectionId: string) => {
    if (!node) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, sectionId]));
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    observerRef.current.observe(node);
  }, []);

  const timelineData: TimelineItem[] = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Started photography journey with a passion for capturing authentic moments and telling stories through the lens.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      year: "2020",
      title: "Professional Recognition",
      description: "Gained recognition in the industry with award-winning wedding and portrait photography work.",
      icon: <Star className="w-5 h-5" />
    },
    {
      year: "2022",
      title: "Business Expansion",
      description: "Expanded services to include commercial photography and established a strong client base across multiple industries.",
      icon: <Users className="w-5 h-5" />
    },
    {
      year: "2024",
      title: "Times of India Award",
      description: "Received the prestigious Times of India Best Entrepreneur Award for excellence in creative industry leadership.",
      icon: <Trophy className="w-5 h-5" />
    }
  ];

  const achievements: Achievement[] = [
    {
      title: "1000+ Happy Clients",
      description: "Successfully delivered exceptional photography services to over 1000 satisfied clients worldwide.",
      icon: <Heart className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Award-Winning Excellence",
      description: "Times of India Best Entrepreneur Award recipient, recognized for innovation and business excellence.",
      icon: <Award className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Creative Innovation",
      description: "Pioneered new photography techniques and approaches that have been adopted industry-wide.",
      icon: <Target className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Reduced top padding */}
      <section 
        ref={(node) => sectionRef(node, 'hero')}
        className="relative pt-16 sm:pt-18 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30 mb-4" style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
                  <Award className="w-4 h-4 text-blue-400" style={{ color: '#00BFFF' }} />
                  <span className="text-blue-400 text-sm font-medium" style={{ color: '#00BFFF' }}>Award-Winning Photographer</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  About <span className="text-blue-500" style={{ color: '#00BFFF' }}>Arif Photography</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Capturing life's most precious moments with artistic vision, technical excellence, 
                  and a passion for storytelling that has earned recognition from Times of India.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25" style={{ backgroundColor: '#00BFFF', boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)' }}>
                  View Portfolio
                </button>
                <button className="w-full sm:w-auto border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300" style={{ borderColor: '#00BFFF', color: '#00BFFF' }}>
                  Contact Me
                </button>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex-shrink-0 w-full sm:w-80 lg:w-96 max-w-sm mx-auto lg:mx-0">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" style={{ background: 'linear-gradient(to bottom right, #00BFFF, #0284c7)' }}></div>
                <div className="relative bg-black p-1 rounded-2xl border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Arif - Award-Winning Photographer"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                
                {/* Floating Award Badge */}
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-3 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300" style={{ backgroundColor: '#00BFFF' }}>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Award Winner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section 
        ref={(node) => sectionRef(node, 'story')}
        className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 opacity-100"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              My <span className="text-blue-500" style={{ color: '#00BFFF' }}>Story</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto" style={{ backgroundColor: '#00BFFF' }}></div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 sm:p-8 lg:p-12 relative" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
            <Quote className="absolute top-4 right-4 w-8 h-8 sm:w-12 sm:h-12 text-blue-500/20" style={{ color: 'rgba(0, 191, 255, 0.2)' }} />
            
            <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                My journey into photography began with a simple belief: every moment has a story worth telling. 
                What started as a passion for capturing candid moments has evolved into an award-winning career 
                that has touched the lives of thousands of clients worldwide.
              </p>
              
              <p>
                Through years of dedication, continuous learning, and an unwavering commitment to excellence, 
                I've had the privilege of documenting life's most precious moments - from intimate portraits 
                to grand celebrations, from commercial projects to artistic endeavors.
              </p>
              
              <p>
                The recognition from Times of India as Best Entrepreneur represents not just personal achievement, 
                but a testament to the power of combining artistic vision with business acumen. It's a reminder 
                that when passion meets purpose, extraordinary things happen.
              </p>
              
              <p>
                Today, I continue to push the boundaries of photography, mentoring emerging artists, and creating 
                images that don't just capture moments - they preserve emotions, tell stories, and create lasting legacies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        ref={(node) => sectionRef(node, 'timeline')}
        className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 opacity-100"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Journey <span className="text-blue-500" style={{ color: '#00BFFF' }}>Timeline</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto" style={{ backgroundColor: '#00BFFF' }}></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-blue-500/30" style={{ backgroundColor: 'rgba(0, 191, 255, 0.3)' }}></div>
            
            <div className="space-y-6 sm:space-y-8">
              {timelineData.map((item, index) => (
                <div key={index} className="relative flex items-start gap-4 sm:gap-8">
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-8 h-8 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-black relative z-10" style={{ backgroundColor: '#00BFFF' }}>
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 sm:p-6 lg:p-8 hover:border-blue-500/40 transition-colors duration-300" style={{ borderColor: 'rgba(0, 191, 255, 0.2)', '--hover-border': 'rgba(0, 191, 255, 0.4)' } as React.CSSProperties}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{item.title}</h3>
                      <span className="text-blue-400 font-semibold text-sm sm:text-base" style={{ color: '#00BFFF' }}>{item.year}</span>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section 
        ref={(node) => sectionRef(node, 'achievements')}
        className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 opacity-100"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Key <span className="text-blue-500" style={{ color: '#00BFFF' }}>Achievements</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto" style={{ backgroundColor: '#00BFFF' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 sm:p-8 hover:border-blue-500/40 transition-all duration-300 transform hover:scale-105 group"
                style={{ borderColor: 'rgba(0, 191, 255, 0.2)', '--hover-border': 'rgba(0, 191, 255, 0.4)' } as React.CSSProperties}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {achievement.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{achievement.title}</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={(node) => sectionRef(node, 'values')}
        className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 opacity-100"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Core <span className="text-blue-500" style={{ color: '#00BFFF' }}>Values</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto" style={{ backgroundColor: '#00BFFF' }}></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: "Authenticity",
                description: "Capturing genuine emotions and real moments that tell authentic stories.",
                icon: <Heart className="w-6 h-6" />
              },
              {
                title: "Excellence",
                description: "Delivering the highest quality work through technical skill and artistic vision.",
                icon: <Star className="w-6 h-6" />
              },
              {
                title: "Innovation",
                description: "Continuously pushing creative boundaries and exploring new techniques.",
                icon: <Target className="w-6 h-6" />
              },
              {
                title: "Client Focus",
                description: "Building lasting relationships through exceptional service and collaboration.",
                icon: <Users className="w-6 h-6" />
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 sm:p-8 hover:border-blue-500/40 transition-colors duration-300"
                style={{ borderColor: 'rgba(0, 191, 255, 0.2)', '--hover-border': 'rgba(0, 191, 255, 0.4)' } as React.CSSProperties}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400" style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', color: '#00BFFF' }}>
                    {value.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{value.title}</h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(node) => sectionRef(node, 'cta')}
        className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 opacity-100"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-2xl p-6 sm:p-8 lg:p-12 text-center" style={{ background: 'linear-gradient(to right, rgba(0, 191, 255, 0.2), rgba(56, 189, 248, 0.2))', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Create Something <span className="text-blue-500" style={{ color: '#00BFFF' }}>Amazing?</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let's work together to capture your special moments and create lasting memories. 
              Whether it's a portrait session, wedding, or commercial project, I'm here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2" style={{ backgroundColor: '#00BFFF', boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)' }}>
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300" style={{ borderColor: '#00BFFF', color: '#00BFFF' }}>
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;