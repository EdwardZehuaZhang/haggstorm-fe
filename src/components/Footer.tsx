'use client';

import React from 'react';
import { Box, Heart } from 'lucide-react';

export default function Footer() {
  return (
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
  );
}
