'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Zap, 
  Moon, 
  Star, 
  ShoppingCart, 
  Lightbulb, 
  LightbulbOff, 
  Menu, 
  Truck, 
  Heart,
  X
} from 'lucide-react';
import ParticleSystem from '@/components/ParticleSystem';
import FeatureCard from '@/components/FeatureCard';

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
    <div className="min-h-screen bg-[#0f0f13] text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden relative">
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
            <button className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 font-pixel text-xl mc-btn transition-transform active:scale-95">
              BUY NOW
            </button>
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
            <button className="bg-orange-500 text-black w-full py-4 font-pixel text-2xl mc-btn">
              BUY NOW
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-900/20 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0f0f13] to-transparent pointer-events-none z-10"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs tracking-wider font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Best Seller
            </div>
            
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
              <button className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 font-pixel text-2xl mc-btn flex items-center justify-center gap-3 transition-transform active:scale-95">
                <ShoppingCart className="w-5 h-5" />
                $29.99
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
            {/* Decorative Rings */}
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-orange-500/20 animate-spin-slow"></div>
            <div className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full border border-white/10 animate-spin-reverse"></div>
            
            {/* The Fox Image */}
            <div 
              className={`relative z-10 transition-all duration-700 animate-float cursor-pointer`}
              onClick={() => setIsLightOn(!isLightOn)}
            >
              <img 
                src="https://images.unsplash.com/photo-1627464096076-2d11979b9e59?q=80&w=800&auto=format&fit=crop" 
                alt="Minecraft Fox Light" 
                className={`
                  w-80 md:w-96 object-contain relative z-20 rounded-xl transition-all duration-700
                  ${isLightOn ? 'filter drop-shadow-[0_0_30px_#ff8e25] brightness-110' : 'filter brightness-75'}
                `}
                style={{ 
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
                }}
              />
              
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
          
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <div className="text-sm text-gray-400 mb-1">Total</div>
                <div className="text-4xl font-pixel text-white">$29.99</div>
              </div>
              <div className="h-12 w-[1px] bg-gray-700 hidden md:block"></div>
              <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-black px-12 py-4 font-pixel text-2xl mc-btn rounded-lg transition-transform active:scale-95">
                ADD TO CART
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 justify-center md:justify-start">
              <Truck className="w-4 h-4" /> Free shipping on orders over $50
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0c] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Box className="text-orange-500 w-6 h-6" />
                <span className="font-pixel text-2xl text-white">VOXEL<span className="text-orange-500">LIGHT</span></span>
              </div>
              <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                Bringing the blocky world into your reality, one pixel at a time. Not affiliated with Mojang or Microsoft.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Shop</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-xs">
            &copy; 2024 VoxelLight. Designed with <Heart className="inline w-3 h-3 text-red-500 mx-1" /> for gamers.
          </div>
        </div>
      </footer>
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
