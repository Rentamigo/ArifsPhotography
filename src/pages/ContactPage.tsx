import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram, Facebook, Twitter, Youtube, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle focus events
  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      action: "tel:+15551234567"
    },
    {
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Email",
      details: ["hello@arifphotography.com", "booking@arifphotography.com"],
      action: "mailto:hello@arifphotography.com"
    },
    {
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Location",
      details: ["123 Photography Street", "New York, NY 10001"],
      action: "https://maps.google.com"
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
      action: null
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-300' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-blue-400' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Reduced top padding */}
      <section className="relative pt-16 sm:pt-18 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                Get In <span className="text-blue-500" style={{ color: '#00BFFF' }}>Touch</span>
              </h1>
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
            </div>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#00BFFF' }}></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to capture your special moments? Let's discuss your photography needs and create something amazing together. 
              We're here to help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 sm:p-8 lg:p-10" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                    Send us a <span className="text-blue-500" style={{ color: '#00BFFF' }}>Message</span>
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Fill out the form below and we'll get back to you within 24 hours. 
                    For urgent inquiries, please call us directly.
                  </p>
                </div>

                {/* Success Message */}
                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-xl flex items-center gap-3 animate-fade-in">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-400 font-medium">Message sent successfully!</p>
                      <p className="text-green-300 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2 text-sm sm:text-base">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-sm sm:text-base ${
                          errors.name 
                            ? 'border-blue-500 focus:border-blue-400' 
                            : focusedField === 'name'
                            ? 'border-blue-500 focus:border-blue-400 shadow-lg shadow-blue-500/25'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        style={{ 
                          '--focus-border': '#00BFFF',
                          '--focus-shadow': '0 10px 15px -3px rgba(0, 191, 255, 0.25)'
                        } as React.CSSProperties}
                        placeholder="Enter your full name"
                        disabled={isSubmitting}
                      />
                      {focusedField === 'name' && (
                        <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-xl -z-10 animate-pulse" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
                      )}
                    </div>
                    {errors.name && (
                      <div className="mt-2 flex items-center gap-2 text-blue-400 text-sm animate-fade-in" style={{ color: '#00BFFF' }}>
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2 text-sm sm:text-base">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-sm sm:text-base ${
                          errors.email 
                            ? 'border-blue-500 focus:border-blue-400' 
                            : focusedField === 'email'
                            ? 'border-blue-500 focus:border-blue-400 shadow-lg shadow-blue-500/25'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        style={{ 
                          '--focus-border': '#00BFFF',
                          '--focus-shadow': '0 10px 15px -3px rgba(0, 191, 255, 0.25)'
                        } as React.CSSProperties}
                        placeholder="Enter your email address"
                        disabled={isSubmitting}
                      />
                      {focusedField === 'email' && (
                        <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-xl -z-10 animate-pulse" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
                      )}
                    </div>
                    {errors.email && (
                      <div className="mt-2 flex items-center gap-2 text-blue-400 text-sm animate-fade-in" style={{ color: '#00BFFF' }}>
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2 text-sm sm:text-base">
                      Subject *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-sm sm:text-base ${
                          errors.subject 
                            ? 'border-blue-500 focus:border-blue-400' 
                            : focusedField === 'subject'
                            ? 'border-blue-500 focus:border-blue-400 shadow-lg shadow-blue-500/25'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        style={{ 
                          '--focus-border': '#00BFFF',
                          '--focus-shadow': '0 10px 15px -3px rgba(0, 191, 255, 0.25)'
                        } as React.CSSProperties}
                        placeholder="What's this about?"
                        disabled={isSubmitting}
                      />
                      {focusedField === 'subject' && (
                        <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-xl -z-10 animate-pulse" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
                      )}
                    </div>
                    {errors.subject && (
                      <div className="mt-2 flex items-center gap-2 text-blue-400 text-sm animate-fade-in" style={{ color: '#00BFFF' }}>
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.subject}</span>
                      </div>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2 text-sm sm:text-base">
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        rows={6}
                        className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base ${
                          errors.message 
                            ? 'border-blue-500 focus:border-blue-400' 
                            : focusedField === 'message'
                            ? 'border-blue-500 focus:border-blue-400 shadow-lg shadow-blue-500/25'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        style={{ 
                          '--focus-border': '#00BFFF',
                          '--focus-shadow': '0 10px 15px -3px rgba(0, 191, 255, 0.25)'
                        } as React.CSSProperties}
                        placeholder="Tell us about your photography needs, event details, or any questions you have..."
                        disabled={isSubmitting}
                      />
                      {focusedField === 'message' && (
                        <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-xl -z-10 animate-pulse" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)' }}></div>
                      )}
                    </div>
                    {errors.message && (
                      <div className="mt-2 flex items-center gap-2 text-blue-400 text-sm animate-fade-in" style={{ color: '#00BFFF' }}>
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="relative w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                    style={{
                      background: 'linear-gradient(to right, #00BFFF, #0284c7)',
                      boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)'
                    }}
                  >
                    {/* Shimmer effect */}
                    {!isSubmitting && !isSuccess && (
                      <div className="absolute inset-0 -top-px overflow-hidden rounded-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                      </div>
                    )}
                    
                    {/* Button content */}
                    <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Message Sent!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Form Footer */}
                  <div className="text-center pt-4">
                    <p className="text-xs sm:text-sm text-gray-500">
                      We respect your privacy. Your information will never be shared with third parties.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 sm:p-6 hover:border-blue-500/40 transition-all duration-300 group"
                    style={{ borderColor: 'rgba(0, 191, 255, 0.2)', '--hover-border': 'rgba(0, 191, 255, 0.4)' } as React.CSSProperties}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300" style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', color: '#00BFFF' }}>
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{info.title}</h3>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-300 text-xs sm:text-sm">
                              {info.action && detailIndex === 0 ? (
                                <a
                                  href={info.action}
                                  target={info.action.startsWith('http') ? '_blank' : undefined}
                                  rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  className="hover:text-blue-400 transition-colors duration-300"
                                  style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}
                                >
                                  {detail}
                                </a>
                              ) : (
                                detail
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 sm:p-6 hover:border-blue-500/40 transition-all duration-300" style={{ borderColor: 'rgba(0, 191, 255, 0.2)', '--hover-border': 'rgba(0, 191, 255, 0.4)' } as React.CSSProperties}>
                <h3 className="font-semibold text-white mb-4 text-base sm:text-lg">Find Us</h3>
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center group cursor-pointer hover:bg-gray-700 transition-colors duration-300">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" style={{ color: '#00BFFF' }} />
                    <p className="text-gray-300 text-sm sm:text-base">Click to view on Google Maps</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">123 Photography Street, NYC</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 sm:p-6 hover:border-blue-500/40 transition-all duration-300" style={{ borderColor: 'rgba(0, 191, 255, 0.2)', '--hover-border': 'rgba(0, 191, 255, 0.4)' } as React.CSSProperties}>
                <h3 className="font-semibold text-white mb-4 text-base sm:text-lg">Follow Us</h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`p-2 sm:p-3 bg-gray-800 hover:bg-blue-600 text-gray-400 ${social.color} hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110`}
                      style={{ '--hover-bg': '#00BFFF' } as React.CSSProperties}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFFF'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
                    >
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  ))}
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mt-3">
                  Follow us for daily photography inspiration and behind-the-scenes content.
                </p>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4 sm:p-6" style={{ background: 'linear-gradient(to right, rgba(0, 191, 255, 0.2), rgba(56, 189, 248, 0.2))', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" style={{ color: '#00BFFF' }} />
                  <h3 className="font-semibold text-white text-base sm:text-lg">Quick Response</h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We typically respond to all inquiries within 24 hours. For urgent bookings or questions, 
                  please call us directly for immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;