import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Always show the button
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '15551234567'; // Replace with actual WhatsApp number (without + sign)
    const message = encodeURIComponent('Hi! I\'m interested in your photography services. Can we discuss?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+15551234567';
    setIsOpen(false);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@arifphotography.com?subject=Photography Inquiry';
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.whatsapp-widget')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="whatsapp-widget fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[99999]">
      {/* Contact Options Menu */}
      {isOpen && (
        <div className="absolute bottom-16 sm:bottom-20 right-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 min-w-[260px] sm:min-w-[280px] animate-fade-in z-[100000]">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00BFFF' }}>
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Get in Touch</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">We're here to help!</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
              aria-label="Close contact menu"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Contact Options */}
          <div className="space-y-1 sm:space-y-2">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">WhatsApp Chat</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Quick response guaranteed</div>
              </div>
            </button>

            {/* Phone Call */}
            <button
              onClick={handleCallClick}
              className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: '#00BFFF' }}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Call Now</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">+1 (555) 123-4567</div>
              </div>
            </button>

            {/* Email */}
            <button
              onClick={handleEmailClick}
              className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: '#0284c7' }}>
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Send Email</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">hello@arifphotography.com</div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Available 24/7 for your photography needs
            </p>
          </div>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={toggleChat}
        className={`w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-[100000] ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Pulse Animation Ring */}
      {!isOpen && (
        <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 bg-green-500/30 rounded-full animate-ping z-[99999]"></div>
      )}

      {/* Online Status Indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full z-[100001]">
        <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default WhatsAppButton;