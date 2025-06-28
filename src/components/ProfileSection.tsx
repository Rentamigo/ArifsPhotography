import React from 'react';
import { Award, Trophy, Star, Calendar, Quote } from 'lucide-react';

const ProfileSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center">
              Entrepreneurial <span className="text-blue-500" style={{ color: '#00BFFF' }}>Excellence</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-blue-400 font-semibold text-xs sm:text-sm lg:text-base" style={{ color: '#00BFFF' }}>
            <Award className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            <span className="text-center">Times of India - Best Entrepreneur Award Winner</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          {/* Professional Photo */}
          <div className="flex-shrink-0 w-full sm:w-80 lg:w-96 max-w-sm mx-auto lg:mx-0">
            <div className="relative group">
              {/* Single Award badge overlay */}
              <div className="absolute -top-1 sm:-top-2 lg:-top-4 -right-1 sm:-right-2 lg:-right-4 z-20 bg-blue-600 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300" style={{ backgroundColor: '#00BFFF' }}>
                <div className="flex items-center gap-1">
                  <Star className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 fill-current" />
                  <span>Award Winner</span>
                </div>
              </div>
              
              {/* Photo container with blue border effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" style={{ background: 'linear-gradient(to bottom right, #00BFFF, #0284c7)' }}></div>
                <div className="relative bg-black p-1 rounded-2xl border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                  <img
                    src="/images/23.jpg"
                    alt="Arif - Award-Winning Entrepreneur"
                    className="w-full h-48 sm:h-64 lg:h-80 xl:h-96 object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/23.jpg';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-white">
            {/* Times of India Quote */}
            <div className="bg-gray-900/50 border-l-2 border-blue-500 p-3 sm:p-4 lg:p-6 rounded-r-lg mb-4 sm:mb-6 lg:mb-8 relative" style={{ borderLeftColor: '#00BFFF' }}>
              <Quote className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500/30" style={{ color: 'rgba(0, 191, 255, 0.3)' }} />
              <p className="text-sm sm:text-base lg:text-lg italic text-gray-300 leading-relaxed mb-3 sm:mb-4">
                "Arif's innovative approach to photography and business acumen has revolutionized the creative industry. 
                His ability to blend artistic vision with entrepreneurial excellence makes him a standout leader in today's competitive landscape."
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-5 sm:w-10 sm:h-6 lg:w-12 lg:h-8 bg-blue-600 flex items-center justify-center text-white font-bold text-xs rounded" style={{ backgroundColor: '#00BFFF' }}>
                  TOI
                </div>
                <div>
                  <p className="font-semibold text-blue-400 text-xs sm:text-sm lg:text-base" style={{ color: '#00BFFF' }}>Times of India</p>
                  <p className="text-xs sm:text-sm text-gray-400">Business Excellence Awards 2024</p>
                </div>
              </div>
            </div>

            {/* Success Story */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-white">
                From Vision to <span className="text-blue-500" style={{ color: '#00BFFF' }}>Recognition</span>
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4 lg:mb-6">
                Arif's journey began with a simple camera and an extraordinary vision. Through innovative techniques, 
                client-centric approaches, and relentless pursuit of excellence, he transformed his passion into a 
                thriving enterprise. His groundbreaking work in commercial photography and creative direction caught 
                the attention of industry leaders, culminating in the prestigious Times of India recognition.
              </p>
            </div>

            {/* Key Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="bg-gray-900/30 p-2 sm:p-3 lg:p-4 rounded-lg border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
                  <h4 className="font-semibold text-blue-400 text-xs sm:text-sm lg:text-base" style={{ color: '#00BFFF' }}>Innovation Leader</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-300">Pioneered new photography techniques adopted industry-wide</p>
              </div>
              
              <div className="bg-gray-900/30 p-2 sm:p-3 lg:p-4 rounded-lg border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
                  <h4 className="font-semibold text-blue-400 text-xs sm:text-sm lg:text-base" style={{ color: '#00BFFF' }}>Business Growth</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-300">Scaled operations to serve 1000+ satisfied clients globally</p>
              </div>
              
              <div className="bg-gray-900/30 p-2 sm:p-3 lg:p-4 rounded-lg border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
                  <h4 className="font-semibold text-blue-400 text-xs sm:text-sm lg:text-base" style={{ color: '#00BFFF' }}>Industry Impact</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-300">Mentored emerging photographers and creative professionals</p>
              </div>
              
              <div className="bg-gray-900/30 p-2 sm:p-3 lg:p-4 rounded-lg border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
                  <h4 className="font-semibold text-blue-400 text-xs sm:text-sm lg:text-base" style={{ color: '#00BFFF' }}>Award Recognition</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-300">Times of India Best Entrepreneur Award recipient</p>
              </div>
            </div>

            {/* Award Details */}
            {/* <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 p-3 sm:p-4 lg:p-6 rounded-lg" style={{ background: 'linear-gradient(to right, rgba(0, 191, 255, 0.2), rgba(56, 189, 248, 0.2))', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400" style={{ color: '#00BFFF' }} />
                <h4 className="font-bold text-white text-xs sm:text-sm lg:text-base">Award Ceremony Details</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-400">Event:</span>
                  <span className="text-white ml-2">Times of India Business Excellence Awards</span>
                </div>
                <div>
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white ml-2">March 15, 2024</span>
                </div>
                <div>
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white ml-2">Best Entrepreneur - Creative Industry</span>
                </div>
                <div>
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white ml-2">Mumbai, India</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;