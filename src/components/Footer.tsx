import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setEmail('');
  };

  const instagramImages = [
    'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=300'
  ];

  return (
    <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          
          {/* Brand Section with Newsletter */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="relative">
                <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" style={{ color: '#00BFFF' }} />
                <div className="absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full blur-md" style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)' }}></div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wider">
                  ARIF
                </h3>
                <p className="text-blue-500 text-xs sm:text-sm font-semibold tracking-widest" style={{ color: '#00BFFF' }}>
                  PHOTOGRAPHY
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Subscribe to our newsletter for weekly updates, pricing, and special offers.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 sm:space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300 text-sm sm:text-base"
                  style={{ '--focus-border': '#00BFFF' } as React.CSSProperties}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                style={{ backgroundColor: '#00BFFF' }}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Menu Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Menu</h4>
            <nav className="space-y-2 sm:space-y-3">
              {[
                { name: 'Home', href: '#' },
                { name: 'About Us', href: '#' },
                { name: 'Gallery', href: '#' },
                { name: 'Blogs', href: '#' },
                { name: 'Contact Us', href: '#' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform text-sm sm:text-base"
                  style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Company Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Company</h4>
            <nav className="space-y-2 sm:space-y-3">
              {[
                { name: 'Single Photo', href: '#' },
                { name: 'Photographer', href: '#' },
                { name: 'Style Guide', href: '#' },
                { name: 'Change Log', href: '#' },
                { name: 'Licensing', href: '#' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform text-sm sm:text-base"
                  style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Follow on Instagram Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Follow on Instagram</h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {instagramImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={image}
                    alt={`Instagram post ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=300';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-sm sm:text-base">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" style={{ color: '#00BFFF' }} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-sm sm:text-base">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" style={{ color: '#00BFFF' }} />
                <span>hello@arifphotography.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-sm sm:text-base">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" style={{ color: '#00BFFF' }} />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              Copyright © 2024 ARIF Photography - Powered by{' '}
              <span className="text-blue-400" style={{ color: '#00BFFF' }}>Webflow.com</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110"
                  style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;