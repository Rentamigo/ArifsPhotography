import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, Check, AlertCircle } from 'lucide-react';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      inputRef.current?.focus();
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      inputRef.current?.focus();
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  // Focus handlers
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Newsletter Container */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 relative group hover:border-blue-500/40 transition-all duration-500" style={{ borderColor: 'rgba(0, 191, 255, 0.2)', '--hover-border': 'rgba(0, 191, 255, 0.4)' } as React.CSSProperties}>
          {/* Decorative elements */}
          <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <Mail className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-blue-500" style={{ color: '#00BFFF' }} />
          </div>
          
          {/* Content */}
          <div className="text-center max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 lg:mb-4">
                <div className="p-1.5 sm:p-2 lg:p-3 bg-blue-600/20 rounded-xl border border-blue-500/30" style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
                  <Mail className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                  Stay <span className="text-blue-500" style={{ color: '#00BFFF' }}>Connected</span>
                </h2>
              </div>
              <div className="w-12 sm:w-16 lg:w-20 h-1 bg-blue-500 rounded-full mx-auto mb-3 sm:mb-4 lg:mb-6" style={{ backgroundColor: '#00BFFF' }}></div>
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed mb-2">
                Get exclusive behind-the-scenes content and photography tips delivered to your inbox.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400">
                Join our community of photography enthusiasts and never miss our latest work.
              </p>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="mb-4 sm:mb-6 lg:mb-8 p-2 sm:p-3 lg:p-4 bg-green-600/20 border border-green-500/30 rounded-xl flex items-center justify-center gap-2 sm:gap-3 animate-fade-in">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400" />
                <span className="text-green-400 font-medium text-xs sm:text-sm lg:text-base">
                  Thank you for subscribing! Check your email for confirmation.
                </span>
              </div>
            )}

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Email Input Container */}
              <div className="relative">
                <div className={`relative transition-all duration-300 ${
                  isFocused 
                    ? 'transform scale-105' 
                    : 'transform scale-100'
                }`}>
                  {/* Input field with enhanced focus effect */}
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter your email address"
                    className={`w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base lg:text-lg transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                      error 
                        ? 'border-blue-500 focus:border-blue-400' 
                        : isFocused
                        ? 'border-blue-500 focus:border-blue-400 shadow-lg shadow-blue-500/25'
                        : 'hover:border-gray-500'
                    }`}
                    style={{ 
                      '--focus-border': '#00BFFF',
                      '--focus-shadow': '0 10px 15px -3px rgba(0, 191, 255, 0.25)'
                    } as React.CSSProperties}
                    disabled={isSubmitting}
                    aria-label="Email address"
                    aria-describedby={error ? 'email-error' : undefined}
                  />
                  
                  {/* Focus glow effect */}
                  {isFocused && (
                    <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-xl -z-10 animate-pulse" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
                  )}
                </div>

                {/* Error message */}
                {error && (
                  <div id="email-error" className="mt-2 sm:mt-3 flex items-center gap-2 text-blue-400 text-xs sm:text-sm animate-fade-in" style={{ color: '#00BFFF' }}>
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              {/* Subscribe Button with Shimmer Effect */}
              <div className="relative">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`relative w-full py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden ${
                    isSuccess 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40'
                  }`}
                  style={!isSuccess ? {
                    background: 'linear-gradient(to right, #00BFFF, #0284c7)',
                    boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)'
                  } : {}}
                  aria-label={isSubmitting ? 'Subscribing...' : 'Subscribe to newsletter'}
                >
                  {/* Shimmer effect overlay */}
                  {!isSubmitting && !isSuccess && (
                    <div className="absolute inset-0 -top-px overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                    </div>
                  )}
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                        <span>Subscribe Now</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>

            {/* Privacy Notice */}
            <div className="mt-3 sm:mt-4 lg:mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                We respect your privacy. Unsubscribe at any time.{' '}
                <button className="text-blue-400 hover:text-blue-300 underline transition-colors duration-300" style={{ color: '#00BFFF', '--hover-color': '#38bdf8' } as React.CSSProperties}>
                  Privacy Policy
                </button>
              </p>
            </div>

            {/* Social Proof */}
            <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-8 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse" style={{ backgroundColor: '#00BFFF' }}></div>
                <span>5,000+ Subscribers</span>
              </div>
              <div className="hidden sm:block w-px h-3 sm:h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse" style={{ backgroundColor: '#00BFFF' }}></div>
                <span>Weekly Updates</span>
              </div>
              <div className="hidden sm:block w-px h-3 sm:h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse" style={{ backgroundColor: '#00BFFF' }}></div>
                <span>No Spam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;