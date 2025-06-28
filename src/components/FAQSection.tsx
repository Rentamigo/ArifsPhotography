import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, HelpCircle, Search, MessageCircle, Phone, Mail } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FAQItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  isVisible: boolean;
}

const FAQItemComponent: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle, isVisible }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div 
      className={`bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 ${
        isVisible ? 'animate-fade-in opacity-100' : 'opacity-100'
      } ${isOpen ? 'shadow-lg shadow-blue-500/10' : ''}`}
      style={{ 
        borderColor: 'rgba(0, 191, 255, 0.2)',
        '--hover-border': 'rgba(0, 191, 255, 0.4)',
        '--shadow': isOpen ? '0 10px 15px -3px rgba(0, 191, 255, 0.1)' : 'none'
      } as React.CSSProperties}
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 sm:p-5 lg:p-6 text-left flex items-center justify-between group hover:bg-gray-800/30 transition-colors duration-300"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" style={{ backgroundColor: '#00BFFF' }}></div>
            <span className="text-blue-400 text-xs sm:text-sm font-medium" style={{ color: '#00BFFF' }}>{faq.category}</span>
          </div>
          <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg leading-relaxed group-hover:text-blue-400 transition-colors duration-300" style={{ '--hover-color': '#00BFFF' } as React.CSSProperties}>
            {faq.question}
          </h3>
        </div>
        <div className={`flex-shrink-0 p-1 sm:p-2 bg-blue-600/20 rounded-full transition-all duration-300 ${
          isOpen ? 'bg-blue-600 rotate-180' : 'group-hover:bg-blue-600/40'
        }`} style={isOpen ? { backgroundColor: '#00BFFF' } : { backgroundColor: 'rgba(0, 191, 255, 0.2)' }}>
          {isOpen ? (
            <Minus className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
          ) : (
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400" style={{ color: '#00BFFF' }} />
          )}
        </div>
      </button>

      {/* Answer Content */}
      <div
        id={`faq-answer-${faq.id}`}
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef} className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
          <div className="border-t border-gray-700/50 pt-3 sm:pt-4 lg:pt-5">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([1])); // First item open by default
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver>();

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What photography services do you offer?",
      answer: "We offer a comprehensive range of photography services including portrait sessions, wedding photography, commercial projects, fashion editorials, event coverage, and fine art photography. Each service is tailored to meet your specific needs and vision, ensuring exceptional results that exceed expectations.",
      category: "Services"
    },
    {
      id: 2,
      question: "How far in advance should I book a photography session?",
      answer: "We recommend booking at least 2-4 weeks in advance for portrait sessions and 3-6 months for weddings and major events. However, we understand that sometimes you need photography services on shorter notice, so please contact us to check our availability.",
      category: "Booking"
    },
    {
      id: 3,
      question: "What is included in your photography packages?",
      answer: "Our packages typically include the photography session, professional editing and retouching, high-resolution digital images, and an online gallery for easy sharing. Specific inclusions vary by package type. We also offer additional services like prints, albums, and extended coverage.",
      category: "Packages"
    },
    {
      id: 4,
      question: "Do you provide raw/unedited photos?",
      answer: "We provide professionally edited images as our standard delivery. Raw files are typically not included as they require specialized software and expertise to process properly. However, raw files can be purchased separately for an additional fee if needed for specific purposes.",
      category: "Delivery"
    },
    {
      id: 5,
      question: "How long does it take to receive the final photos?",
      answer: "Delivery times vary by service type. Portrait sessions are typically delivered within 1-2 weeks, while weddings and larger events may take 3-4 weeks due to the extensive editing process. Rush delivery options are available for an additional fee.",
      category: "Delivery"
    },
    {
      id: 6,
      question: "What are your pricing and payment options?",
      answer: "Our pricing varies based on the type of service, duration, and specific requirements. We offer competitive packages starting from $200 for portrait sessions. Payment can be made via bank transfer, credit card, or PayPal. A 50% deposit is required to secure your booking.",
      category: "Pricing"
    },
    {
      id: 7,
      question: "Do you travel for destination photography?",
      answer: "Yes! We love destination photography and are available for travel within the country and internationally. Travel fees may apply depending on the location and duration. We're experienced in planning and executing photography sessions in various locations and conditions.",
      category: "Travel"
    },
    {
      id: 8,
      question: "What happens if weather affects an outdoor shoot?",
      answer: "We always have backup plans for outdoor sessions. This may include covered outdoor locations, indoor alternatives, or rescheduling if necessary. We monitor weather conditions closely and will communicate with you in advance if changes are needed.",
      category: "Logistics"
    },
    {
      id: 9,
      question: "Can I request specific editing styles or looks?",
      answer: "Absolutely! We encourage clients to share their vision and preferences. You can provide reference images or describe the style you're looking for. Our editing process is collaborative, and we offer revision rounds to ensure you're completely satisfied with the final results.",
      category: "Editing"
    },
    {
      id: 10,
      question: "Do you offer photography workshops or mentoring?",
      answer: "Yes, as a Times of India award-winning photographer, I offer workshops and one-on-one mentoring sessions for aspiring photographers. These cover technical skills, business aspects, and creative development. Contact us for current workshop schedules and mentoring availability.",
      category: "Education"
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqData.map(faq => faq.category)))];

  // Filter FAQs based on category and search
  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Lazy loading implementation
  const lastFAQElementRef = React.useCallback((node: HTMLDivElement) => {
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const faqId = parseInt(entry.target.getAttribute('data-faq-id') || '0');
          setVisibleItems(prev => new Set([...prev, faqId]));
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    if (node) observerRef.current.observe(node);
  }, []);

  const toggleItem = (id: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Initialize visible items on mount
  useEffect(() => {
    // Make first few items visible immediately
    setVisibleItems(new Set([1, 2, 3]));
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)' }}></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center">
              Frequently Asked <span className="text-blue-500" style={{ color: '#00BFFF' }}>Questions</span>
            </h2>
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-500" style={{ color: '#00BFFF' }} />
          </div>
          <div className="w-12 sm:w-16 lg:w-24 h-1 bg-blue-500 rounded-full mx-auto mb-3 sm:mb-4 lg:mb-6" style={{ backgroundColor: '#00BFFF' }}></div>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Find answers to common questions about our photography services, booking process, and more. 
            Can't find what you're looking for? Feel free to contact us directly.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-6 sm:mb-8 lg:mb-12 space-y-4 sm:space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search FAQs..."
              className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300 text-sm sm:text-base"
              style={{ '--focus-border': '#00BFFF' } as React.CSSProperties}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 p-1 sm:p-2 rounded-xl border border-blue-500/20 overflow-x-auto scrollbar-hide max-w-full" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400 ml-1 sm:ml-2 flex-shrink-0" style={{ color: '#00BFFF' }} />
              <div className="flex gap-1 sm:gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    style={selectedCategory === category ? {
                      backgroundColor: '#00BFFF',
                      boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)'
                    } : {}}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6 mb-8 sm:mb-12 lg:mb-16">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                ref={index === filteredFAQs.length - 1 ? lastFAQElementRef : null}
                data-faq-id={faq.id}
              >
                <FAQItemComponent
                  faq={faq}
                  isOpen={openItems.has(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                  isVisible={visibleItems.has(faq.id) || index < 3}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-8 sm:py-12">
              <HelpCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">No FAQs Found</h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Stats */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-8 bg-gray-900/30 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl border border-blue-500/20" style={{ borderColor: 'rgba(0, 191, 255, 0.2)' }}>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{faqData.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Total FAQs</div>
            </div>
            <div className="hidden sm:block w-px h-6 lg:h-8 bg-blue-500/30" style={{ backgroundColor: 'rgba(0, 191, 255, 0.3)' }}></div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{categories.length - 1}</div>
              <div className="text-xs sm:text-sm text-gray-400">Categories</div>
            </div>
            <div className="hidden sm:block w-px h-6 lg:h-8 bg-blue-500/30" style={{ backgroundColor: 'rgba(0, 191, 255, 0.3)' }}></div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{filteredFAQs.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Showing</div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 p-4 sm:p-6 lg:p-8 rounded-2xl" style={{ background: 'linear-gradient(to right, rgba(0, 191, 255, 0.2), rgba(56, 189, 248, 0.2))', borderColor: 'rgba(0, 191, 255, 0.3)' }}>
          <div className="text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              Still Have <span className="text-blue-500" style={{ color: '#00BFFF' }}>Questions?</span>
            </h3>
            <p className="text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-relaxed text-xs sm:text-sm lg:text-base">
              Can't find the answer you're looking for? Our team is here to help you with any questions 
              about our photography services, booking process, or anything else you need to know.
            </p>
            
            {/* Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 sm:gap-3 bg-green-600/20 hover:bg-green-600 border border-green-500/30 hover:border-green-500 text-green-400 hover:text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base"
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                WhatsApp
              </a>
              
              <a
                href="tel:+15551234567"
                className="flex items-center justify-center gap-2 sm:gap-3 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base"
                style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', borderColor: 'rgba(0, 191, 255, 0.3)', color: '#00BFFF' }}
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                Call Now
              </a>
              
              <a
                href="mailto:hello@arifphotography.com"
                className="flex items-center justify-center gap-2 sm:gap-3 bg-blue-600/20 hover:bg-blue-500 border border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base"
                style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', borderColor: 'rgba(0, 191, 255, 0.3)', color: '#00BFFF' }}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                Email Us
              </a>
            </div>

            {/* Main CTA Button */}
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25 text-sm sm:text-base lg:text-lg" style={{ backgroundColor: '#00BFFF', boxShadow: '0 10px 15px -3px rgba(0, 191, 255, 0.25), 0 4px 6px -2px rgba(0, 191, 255, 0.05)' }}>
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;