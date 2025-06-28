import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Camera, Menu, X, Instagram, Facebook, Twitter, Youtube, Home, User, Image, BookOpen, MessageCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'about', label: 'About', icon: User, path: '/about' },
    { id: 'gallery', label: 'Gallery', icon: Image, path: '/gallery' },
    { id: 'blog', label: 'Blog', icon: BookOpen, path: '/blog' },
    { id: 'contact', label: 'Contact', icon: MessageCircle, path: '/contact' }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-300' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-blue-400' }
  ];

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
        ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg'
        : 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-800/30'
      }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-1.5 sm:py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">

            <div>
<img
  src="/images/logo.PNG"
  alt="ARIF PHOTOGRAPHY"
  className="h-10 sm:h-14 lg:h-20 xl:h-24 w-auto max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px]"
/>

            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm xl:text-base transition-all duration-300 ${isActivePage(item.path)
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                style={isActivePage(item.path) ? {
                  color: '#38bdf8',
                  backgroundColor: 'rgba(0, 191, 255, 0.1)'
                } : {}}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Social Media Icons */}
            <div className="flex items-center gap-1 xl:gap-2 mr-2 xl:mr-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-1 xl:p-1.5 text-gray-500 dark:text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50`}
                >
                  <social.icon className="w-3 h-3 xl:w-4 xl:h-4" />
                </a>
              ))}
            </div>

            {/* Contact Button */}
            <button
              onClick={() => handleNavigation('/contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25 text-xs xl:text-sm"
              style={{
                backgroundColor: '#00BFFF',
                boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)'
              }}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-1.5 text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-300 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 pb-2 border-t border-gray-200 dark:border-gray-800/50">
            <nav className="flex flex-col gap-2 mt-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 w-full text-left ${isActivePage(item.path)
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }`}
                  style={isActivePage(item.path) ? {
                    color: '#38bdf8',
                    backgroundColor: 'rgba(0, 191, 255, 0.1)'
                  } : {}}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}

              {/* Mobile Social Icons */}
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-800/50">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`p-1.5 text-gray-500 dark:text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Mobile Contact Button */}
              <button
                onClick={() => handleNavigation('/contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 mt-2 w-full text-sm"
                style={{ backgroundColor: '#00BFFF' }}
              >
                Contact Us
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;