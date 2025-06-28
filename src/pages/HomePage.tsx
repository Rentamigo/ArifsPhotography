import React from 'react';
import DarkHero from '../components/DarkHero';
import StatisticsSection from '../components/StatisticsSection';
import ProfileSection from '../components/ProfileSection';
import TopPicksSection from '../components/TopPicksSection';
import GallerySection from '../components/GallerySection';
import BlogsSection from '../components/BlogsSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQSection from '../components/FAQSection';
import NewsletterSubscription from '../components/NewsletterSubscription';
import MinimalisticDivider from '../components/MinimalisticDivider';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-theme duration-300">
      {/* Reduced top padding to minimize gap between header and hero */}
      <div className="pt-12 sm:pt-14 lg:pt-16">
        <DarkHero />
        
        <MinimalisticDivider withDot />
        
        <StatisticsSection />
        
        <MinimalisticDivider />
        
        <ProfileSection />
        
        <MinimalisticDivider />
        
        <TopPicksSection />
        
        <MinimalisticDivider />
        
        <GallerySection />
        
        <MinimalisticDivider />
        
        <BlogsSection />
        
        <MinimalisticDivider />
        
        <TestimonialCarousel />
        
        <MinimalisticDivider />
        
        <FAQSection />
        
        <MinimalisticDivider />
        
        <NewsletterSubscription />
        
        <MinimalisticDivider withDot />
      </div>
    </div>
  );
};

export default HomePage;