import React, { useEffect, useRef, useState } from 'react';
import { Camera, Heart, Briefcase, Palette, Calendar, Users } from 'lucide-react';

interface StatisticItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  delay?: number;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ 
  icon, 
  label, 
  value, 
  suffix, 
  delay = 0 
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      let step = 0;

      const counter = setInterval(() => {
        step++;
        current = Math.min(Math.ceil(increment * step), value);
        setCurrentValue(current);

        if (current >= value) {
          clearInterval(counter);
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center text-center transition-all duration-300 ease-in-out cursor-pointer flex-1 min-w-0 px-2 sm:px-4"
      style={{ 
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blue Icon */}
      <div 
        className="flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300"
        style={{ 
          width: '48px', 
          height: '48px',
          color: '#00BFFF',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        {React.cloneElement(icon as React.ReactElement, { 
          size: window.innerWidth < 640 ? 24 : 32, 
          strokeWidth: 1.5 
        })}
      </div>

      {/* White Number */}
      <div 
        className="font-bold mb-2 sm:mb-3 transition-all duration-300"
        style={{
          color: '#FFFFFF',
          fontSize: window.innerWidth < 640 ? '24px' : window.innerWidth < 1024 ? '28px' : '36px',
          lineHeight: '1',
          textShadow: isHovered ? '0 0 15px rgba(0, 191, 255, 0.3)' : 'none'
        }}
      >
        {currentValue > 0 && (
          <>
            {currentValue.toLocaleString()}
            {suffix}
          </>
        )}
      </div>

      {/* White Descriptive Text */}
      <div 
        className="font-sans leading-tight transition-all duration-300 uppercase tracking-wide text-center"
        style={{
          color: '#FFFFFF',
          fontSize: window.innerWidth < 640 ? '11px' : '14px',
          fontWeight: '600',
          opacity: isHovered ? 0.9 : 0.7
        }}
      >
        {label}
      </div>
    </div>
  );
};

const StatisticsSection: React.FC = () => {
  const statistics = [
    {
      icon: <Camera />,
      label: "Portrait Sessions",
      value: 150,
      suffix: "+",
      delay: 0
    },
    {
      icon: <Heart />,
      label: "Wedding Photography",
      value: 200,
      suffix: "+",
      delay: 200
    },
    {
      icon: <Briefcase />,
      label: "Commercial Projects",
      value: 300,
      suffix: "+",
      delay: 400
    },
    {
      icon: <Palette />,
      label: "Fashion Editorials",
      value: 450,
      suffix: "+",
      delay: 600
    },
    {
      icon: <Calendar />,
      label: "Event Coverage",
      value: 600,
      suffix: "+",
      delay: 800
    },
    {
      icon: <Users />,
      label: "Happy Clients",
      value: 1000,
      suffix: "+",
      delay: 1000
    }
  ];

  return (
    <section 
      className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 
            className="font-bold mb-3 sm:mb-4 lg:mb-6"
            style={{
              color: '#FFFFFF',
              fontSize: window.innerWidth < 640 ? '28px' : window.innerWidth < 1024 ? '36px' : '42px',
              lineHeight: '1.2'
            }}
          >
            Portfolio 
            <span style={{ color: '#00BFFF' }}> Metrics</span>
          </h2>
          <p 
            className="max-w-3xl mx-auto px-4"
            style={{
              color: '#FFFFFF',
              fontSize: window.innerWidth < 640 ? '16px' : '18px',
              lineHeight: '1.6',
              opacity: 0.8
            }}
          >
            Years of dedication captured in numbers. Each statistic represents countless moments
            of creativity, passion, and the trust our clients place in our vision.
          </p>
        </div>

        {/* Statistics Grid - Responsive Layout */}
        <div className="w-full">
          {/* Mobile: 2x3 Grid */}
          <div className="grid grid-cols-2 gap-6 sm:hidden">
            {statistics.map((stat, index) => (
              <StatisticItem
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                delay={stat.delay}
              />
            ))}
          </div>

          {/* Tablet: 3x2 Grid */}
          <div className="hidden sm:grid lg:hidden grid-cols-3 gap-8">
            {statistics.map((stat, index) => (
              <StatisticItem
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                delay={stat.delay}
              />
            ))}
          </div>

          {/* Desktop: Single Row */}
          <div className="hidden lg:flex items-center justify-between relative">
            {statistics.map((stat, index) => (
              <div key={index} className="relative flex-1">
                <StatisticItem
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  delay={stat.delay}
                />
                {/* Minimalistic vertical separator line between items */}
                {index < statistics.length - 1 && (
                  <div 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-16"
                    style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;