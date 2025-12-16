'use client';

import { useEffect, useRef } from 'react';

/**
 * ParticleSystem Component
 * Creates floating particles that rise from the bottom of the screen
 * for an ambient background effect.
 */
const ParticleSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 2;
      const duration = Math.random() * 3 + 4; // Slower rise for chill vibes
      const startLeft = Math.random() * 100;
      
      const colors = ['#ff8e25', '#ffb347', '#ffffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        left: ${startLeft}vw;
        bottom: -20px;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: particle-rise ${duration}s linear forwards;
      `;

      container.appendChild(particle);

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, duration * 1000);
    };

    const intervalId = setInterval(createParticle, 400);
    return () => clearInterval(intervalId);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
};

export default ParticleSystem;
