import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Camera, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
        
        <div className="relative z-10">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="relative inline-block">
              <Camera className="w-24 h-24 sm:w-32 sm:h-32 text-blue-500 mx-auto mb-4" style={{ color: '#00BFFF' }} />
              <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/20 rounded-full blur-2xl mx-auto" style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)' }}></div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-white mb-4">
              4<span className="text-blue-500" style={{ color: '#00BFFF' }}>0</span>4
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-lg mx-auto">
              Oops! The page you're looking for seems to have disappeared like a perfect shot in low light. 
              Let's get you back to capturing amazing moments.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
            <Link
              to="/"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25 w-full sm:w-auto justify-center"
              style={{ backgroundColor: '#00BFFF', boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)' }}
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto justify-center"
              style={{ borderColor: '#00BFFF', color: '#00BFFF' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 sm:p-8" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Search className="w-5 h-5 text-blue-400" style={{ color: '#00BFFF' }} />
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <Link
                to="/about"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base text-center py-2 px-3 rounded-lg hover:bg-gray-800/50"
                style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}
              >
                About Us
              </Link>
              <Link
                to="/gallery"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base text-center py-2 px-3 rounded-lg hover:bg-gray-800/50"
                style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}
              >
                Gallery
              </Link>
              <Link
                to="/blog"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base text-center py-2 px-3 rounded-lg hover:bg-gray-800/50"
                style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base text-center py-2 px-3 rounded-lg hover:bg-gray-800/50"
                style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Fun Message */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              "Every great photographer knows that sometimes the best shots come from unexpected places. 
              This just wasn't one of them." 📸
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;