'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Zap, 
  Moon, 
  Star, 
  Lightbulb, 
  LightbulbOff, 
  Menu, 
  Truck, 
  X
} from 'lucide-react';
import ParticleSystem from '@/components/ParticleSystem';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';

/**
 * VoxelLight - Next.js Landing Page
 * A pixel-perfect landing page for a Minecraft-inspired Fox Light.
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`min-h-screen text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden relative transition-colors duration-700 ${
        isLightOn ? 'bg-[#1a1a1a]' : 'bg-[#78A7FF]'
      }`}
    >
      <ParticleSystem />
      
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Box className="text-orange-500 w-8 h-8" />
            <span className="font-pixel text-3xl tracking-widest text-white select-none">
              VOXEL<span className="text-orange-500">LIGHT</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center font-medium text-sm text-gray-300">
            <a href="#features" className="hover:text-orange-400 transition-colors">FEATURES</a>
            <a href="#gallery" className="hover:text-orange-400 transition-colors">GALLERY</a>
            <a href="#specs" className="hover:text-orange-400 transition-colors">SPECS</a>
            <a
              href="/detail"
              className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 font-pixel text-xl mc-btn transition-transform active:scale-95"
            >
              BUY NOW
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0f0f13] border-t border-white/10 absolute w-full px-6 py-8 flex flex-col gap-6 animate-fade-in-down">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-xl hover:text-orange-400">FEATURES</a>
            <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-xl hover:text-orange-400">GALLERY</a>
            <a href="#specs" onClick={() => setIsMobileMenuOpen(false)} className="text-xl hover:text-orange-400">SPECS</a>
            <a
              href="/detail"
              className="bg-orange-500 text-black w-full py-4 font-pixel text-2xl mc-btn text-center"
            >
              BUY NOW
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl md:text-8xl leading-none font-pixel text-white">
              SLEEPING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                FOX LIGHT
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              Illuminate your biome with the coziest mob in the game. Crafted for gamers, dreamers, and pixel artists.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => window.location.href = '/detail'}
                className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 font-pixel text-2xl mc-btn flex items-center justify-center gap-3 transition-transform active:scale-95"
              >
                BUY NOW
              </button>
              <button 
                onClick={() => setIsLightOn(!isLightOn)}
                className={`
                  px-8 py-4 font-pixel text-2xl mc-btn flex items-center justify-center gap-3 transition-all duration-300
                  ${isLightOn 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10'}
                `}
              >
                {isLightOn ? <LightbulbOff className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
                {isLightOn ? 'TURN OFF' : 'TURN ON'}
              </button>
            </div>
          </div>

          {/* Product Visualization */}
          <div className="relative flex justify-center items-center h-[500px]">
            {/* The Fox Image */}
            <div 
              className={`relative z-10 transition-all duration-700 animate-float cursor-pointer group`}
              onClick={() => setIsLightOn(!isLightOn)}
            >
              <img 
                src={isLightOn ? "/Foxlight_light.png" : "/Foxlight_dark.png"}
                alt="Minecraft Fox Light" 
                className={`
                  w-96 md:w-[500px] object-contain relative z-20 transition-all duration-700
                  ${isLightOn ? 'filter drop-shadow-[0_0_30px_#ff8e25]' : ''}
                `}
              />
              
              {/* Tap Me Text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="font-pixel text-3xl text-white bg-black/70 px-6 py-3 border-4 border-white" style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.5)' }}>
                  [TAP ME]
                </span>
              </div>
              
              {/* Floor Reflection Glow */}
              <div 
                className={`
                  absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-orange-500/20 blur-xl rounded-full transition-all duration-700
                  ${isLightOn ? 'opacity-100' : 'opacity-30'}
                `}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap justify-between gap-8 text-center md:text-left">
          <StatItem value="100%" label="Official Merch" />
          <StatItem value="3x AA" label="Battery Powered" />
          <StatItem value="LED" label="Soft Glow" />
          <StatItem value="16cm" label="Width" />
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-pixel mb-4 text-white">CRAFTED FOR COMFORT</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8" />}
              color="orange"
              title="Wireless Power"
              description="Place it anywhere in your room. No redstone wiring required. Powered by standard batteries for untethered illumination."
            />
            <FeatureCard 
              icon={<Moon className="w-8 h-8" />}
              color="blue"
              title="Night Mode"
              description="Emits a soft, warm orange glow perfect for late-night gaming sessions or keeping creepers at bay while you sleep."
            />
            <FeatureCard 
              icon={<Box className="w-8 h-8" />}
              color="green"
              title="Authentic Detail"
              description="Modeled exactly after the in-game fox texture. Every pixel is accounted for in this 1:1 scale replica."
            />
          </div>
        </div>
      </section>

      {/* Parallax / Aesthetic Break */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black relative overflow-hidden">
         <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
            <span className="font-pixel text-[20vw] text-white">MINECRAFT</span>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <h2 className="text-3xl md:text-5xl font-pixel mb-8 text-white">&quot;THE CUTEST MOB IN YOUR INVENTORY&quot;</h2>
          <div className="flex justify-center gap-4 text-orange-500 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-current w-6 h-6" />
            ))}
          </div>
          <p className="text-gray-400 italic font-light">- Verified Buyer, Steve</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-pixel mb-8 text-white">READY TO LIGHT UP?</h2>
          <p className="text-xl text-gray-300 mb-10 font-light">Limited stock available. Don&apos;t let this little guy despawn.</p>
          
          <div 
            className="bg-[#2a2a2a] border-4 border-[#1a1a1a] p-8 shadow-2xl hover:translate-y-[-2px] transition-transform duration-200"
            style={{
              boxShadow: 'inset -6px -6px 0px 0px rgba(0,0,0,0.6), inset 6px 6px 0px 0px rgba(255,255,255,0.1), 0 8px 0 0 #000'
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <div className="text-sm text-gray-400 mb-1 font-pixel">Total</div>
                <div className="text-4xl font-pixel text-white">$29.99</div>
              </div>
              <div className="h-12 w-[2px] bg-black hidden md:block"></div>
              <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-black px-12 py-4 font-pixel text-2xl mc-btn transition-transform active:scale-95 border-4 border-orange-700">
                ADD TO CART
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 justify-center md:justify-start font-pixel">
              <Truck className="w-4 h-4" /> Free shipping on orders over $50
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// --- Subcomponents ---

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex-1 min-w-[120px]">
    <h4 className="text-orange-500 font-pixel text-3xl">{value}</h4>
    <p className="text-gray-500 text-sm uppercase tracking-wider">{label}</p>
  </div>
);
