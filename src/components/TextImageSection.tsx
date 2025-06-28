import React from 'react';
import { Camera, Award, Users, Zap } from 'lucide-react';

interface TextImageItemProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  reverse?: boolean;
}

const TextImageItem: React.FC<TextImageItemProps> = ({ 
  title, 
  description, 
  image, 
  icon, 
  reverse = false 
}) => {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12 mb-20`}>
      {/* Text Content */}
      <div className="flex-1 lg:max-w-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white shadow-lg">
            {icon}
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {title}
          </h3>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          {description}
        </p>
        <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Learn More
          <Zap className="w-4 h-4" />
        </button>
      </div>

      {/* Image Content */}
      <div className="flex-shrink-0 w-full lg:w-96">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
          <img
            src={image}
            alt={title}
            className="relative w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800';
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TextImageSection: React.FC = () => {
  const sections = [
    {
      title: "Professional Excellence",
      description: "Our commitment to excellence drives every shot we take. With years of experience and cutting-edge equipment, we deliver stunning visuals that exceed expectations. From concept to final delivery, we ensure every detail is perfect, creating images that tell compelling stories and capture the essence of every moment.",
      image: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <Award className="w-6 h-6" />,
      reverse: false
    },
    {
      title: "Creative Vision",
      description: "We believe that great photography goes beyond technical skill—it requires artistic vision and creative storytelling. Our team combines technical expertise with innovative approaches to create unique, memorable images. Whether it's capturing candid moments or crafting elaborate compositions, we bring creativity to every project.",
      image: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <Camera className="w-6 h-6" />,
      reverse: true
    },
    {
      title: "Client-Centered Approach",
      description: "Your vision is our priority. We work closely with each client to understand their unique needs, preferences, and goals. Our collaborative process ensures that the final results not only meet but exceed your expectations. From initial consultation to final delivery, we're committed to providing exceptional service and building lasting relationships.",
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <Users className="w-6 h-6" />,
      reverse: false
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Why Choose Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Photography</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover what sets us apart in the world of professional photography. 
            Our dedication to quality, creativity, and client satisfaction makes every project exceptional.
          </p>
        </div>

        {/* Text-Image Items */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <TextImageItem
              key={index}
              title={section.title}
              description={section.description}
              image={section.image}
              icon={section.icon}
              reverse={section.reverse}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TextImageSection;