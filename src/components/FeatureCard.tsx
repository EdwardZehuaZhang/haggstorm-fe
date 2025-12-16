'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: 'orange' | 'blue' | 'green';
}

/**
 * FeatureCard Component
 * Displays a feature with an icon, title, and description.
 * Includes scroll-triggered fade-in animation using IntersectionObserver.
 */
const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const colorClasses = {
    orange: 'bg-orange-500/10 text-orange-500 group-hover:bg-orange-500',
    blue: 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500',
    green: 'bg-green-500/10 text-green-500 group-hover:bg-green-500',
  };

  return (
    <div 
      ref={ref}
      className={`
        bg-[#2a2a2a] border-4 border-[#1a1a1a] p-8 mc-btn relative
        hover:bg-[#333333] transition-all duration-200 group hover:-translate-y-1
        transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{
        boxShadow: 'inset -4px -4px 0px 0px rgba(0,0,0,0.5), inset 4px 4px 0px 0px rgba(255,255,255,0.1)'
      }}
    >
      <div className={`${colorClasses[color]} w-16 h-16 border-4 border-black/30 flex items-center justify-center mb-6 transition-colors duration-300`}>
        <span className="group-hover:text-black transition-colors duration-300">
          {icon}
        </span>
      </div>
      <h3 className="font-pixel text-2xl mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light">{description}</p>
    </div>
  );
};

export default FeatureCard;
