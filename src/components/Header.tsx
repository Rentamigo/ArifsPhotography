import React, { useState, useEffect } from 'react';
import { Camera, Menu, X, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-300' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-400' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
        ? 'bg-black/95 backdrop-blur-md border-b border-gray-800/50 shadow-lg'
        : 'bg-black/90 backdrop-blur-md border-b border-gray-800/30'
      }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-1.5 sm:py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
  <div className="relative">
    <Camera className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-red-500" />
    <div className="absolute inset-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-red-500/20 rounded-full blur-md"></div>
  </div>
  <div>
    <img
      src="/images/logo.png"
      alt="ARIF PHOTOGRAPHY"
      className="h-6 sm:h-8 lg:h-10 xl:h-12 object-contain"
    />
  </div>
</div>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a href="#" className="text-white hover:text-red-400 transition-colors duration-300 font-medium text-sm xl:text-base">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium text-sm xl:text-base">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium text-sm xl:text-base">
              Gallery
            </a>
            <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium text-sm xl:text-base">
              Blogs
            </a>
            <div className="relative group">
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium flex items-center gap-1 text-sm xl:text-base">
                Utility Pages
                <svg className="w-3 h-3 xl:w-4 xl:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </nav>

          {/* Social Icons & Contact Button - Desktop */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {/* Social Media Icons */}
            <div className="flex items-center gap-1 xl:gap-2 mr-2 xl:mr-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-1 xl:p-1.5 text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 rounded-full hover:bg-gray-800/50`}
                >
                  <social.icon className="w-3 h-3 xl:w-4 xl:h-4" />
                </a>
              ))}
            </div>

            {/* Contact Button */}
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/25 text-xs xl:text-sm">
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-1.5 text-white hover:text-red-400 transition-colors duration-300 flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 pb-2 border-t border-gray-800/50">
            <nav className="flex flex-col gap-2 mt-2">
              <a href="#" className="text-white hover:text-red-400 transition-colors duration-300 font-medium py-1.5 text-sm">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium py-1.5 text-sm">
                About
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium py-1.5 text-sm">
                Gallery
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium py-1.5 text-sm">
                Blogs
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium py-1.5 text-sm">
                Utility Pages
              </a>

              {/* Mobile Social Icons */}
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-800/50">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`p-1.5 text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 rounded-full hover:bg-gray-800/50`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Mobile Contact Button */}
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 mt-2 w-full text-sm">
                Contact Us
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;