/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export default function ServiceFeatures() {
  return (
    <section id="service-features" className="py-16 border-b border-line bg-[#161411]">
      {/* Styles for vector icon micro-interactions */}
      <style dangerouslySetInnerHTML={{ __html: `
        .feature-card:hover .truck-icon {
          animation: truckDrive 0.6s ease-in-out infinite alternate;
        }

        .feature-card:hover .headset-icon {
          animation: headsetPulse 1s ease-in-out infinite;
        }

        .feature-card:hover .bed-icon {
          animation: bedBounce 0.8s ease-in-out infinite alternate;
        }

        @keyframes truckDrive {
          0% { transform: translateX(0); }
          50% { transform: translateX(-3px); }
          100% { transform: translateX(4px); }
        }

        @keyframes headsetPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @keyframes bedBounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Service Grid matching the exact layout of image_5b7c1b.png but with premium Holzcraft branding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Card 1: After Sale Services */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="feature-card flex items-start space-x-4 p-5 rounded-xl box-gradient transition-all duration-300 group cursor-pointer"
            id="feature-after-sale"
          >
            <div className="flex-shrink-0 mt-1">
              {/* Custom Vector Truck Icon Matching Image Outline Style */}
              <svg 
                className="truck-icon w-12 h-12 text-oak group-hover:text-oak/90 transition-all duration-300" 
                viewBox="0 0 64 64" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Cargo Area */}
                <rect x="8" y="16" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Cabin */}
                <path d="M40 22H48L56 30V40H40V22Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Windshield line details */}
                <path d="M48 22L53 29.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                {/* Back Lines (Motion lines) */}
                <line x1="4" y1="20" x2="6" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="2" y1="26" x2="5" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                {/* Wheel 1 */}
                <circle cx="20" cy="44" r="5" fill="#1C1A17" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="20" cy="44" r="1.5" fill="currentColor" />
                {/* Wheel 2 */}
                <circle cx="46" cy="44" r="5" fill="#1C1A17" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="46" cy="44" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex-grow">
              <h3 className="font-display text-[15px] font-semibold text-ivory tracking-wide mb-1 transition-colors group-hover:text-oak">
                After Sale Services
              </h3>
              <p className="font-sans text-[13px] text-ivory-dim/75 font-normal leading-relaxed max-w-[240px]">
                Workshop based repair & maintenance services
              </p>
            </div>
          </motion.div>

          {/* Card 2: Free Interior Consultancy */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="feature-card flex items-start space-x-4 p-5 rounded-xl box-gradient transition-all duration-300 group cursor-pointer"
            id="feature-consultancy"
          >
            <div className="flex-shrink-0 mt-1">
              {/* Custom Vector Headset Icon Matching Image Outline Style */}
              <svg 
                className="headset-icon w-12 h-12 text-oak group-hover:text-oak/90 transition-all duration-300" 
                viewBox="0 0 64 64" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Headband */}
                <path d="M12 32C12 19.85 20.95 10 32 10C43.05 10 52 19.85 52 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                {/* Left Ear Cup */}
                <rect x="8" y="28" width="6" height="12" rx="3" fill="#1C1A17" stroke="currentColor" strokeWidth="2.5" />
                {/* Right Ear Cup */}
                <rect x="50" y="28" width="6" height="12" rx="3" fill="#1C1A17" stroke="currentColor" strokeWidth="2.5" />
                {/* Inner details */}
                <path d="M14 34V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M50 34V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                {/* Microphone Arm */}
                <path d="M14 38C14 44 20 48 26 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                {/* Mic Tip */}
                <circle cx="28" cy="48" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex-grow">
              <h3 className="font-display text-[15px] font-semibold text-ivory tracking-wide mb-1 transition-colors group-hover:text-oak">
                Free Interior Consultancy
              </h3>
              <p className="font-sans text-[13px] text-ivory-dim/75 font-normal leading-relaxed max-w-[240px]">
                24/7 Online support
              </p>
            </div>
          </motion.div>

          {/* Card 3: Custom Made Options */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="feature-card flex items-start space-x-4 p-5 rounded-xl box-gradient transition-all duration-300 group cursor-pointer"
            id="feature-custom-options"
          >
            <div className="flex-shrink-0 mt-1">
              {/* Custom Vector Bed Icon Matching Image Outline Style */}
              <svg 
                className="bed-icon w-12 h-12 text-oak group-hover:text-oak/90 transition-all duration-300" 
                viewBox="0 0 64 64" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Frame Backrest/Pillows outline */}
                <path d="M10 24H54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                {/* Bed main frame */}
                <rect x="8" y="32" width="48" height="10" rx="1" fill="#1C1A17" stroke="currentColor" strokeWidth="2.5" />
                {/* Pillow 1 */}
                <rect x="14" y="20" width="15" height="8" rx="2" fill="#1C1A17" stroke="currentColor" strokeWidth="2.5" />
                {/* Pillow 2 */}
                <rect x="35" y="20" width="15" height="8" rx="2" fill="#1C1A17" stroke="currentColor" strokeWidth="2.5" />
                {/* Legs */}
                <path d="M12 42V48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M52 42V48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-grow">
              <h3 className="font-display text-[15px] font-semibold text-ivory tracking-wide mb-1 transition-colors group-hover:text-oak">
                Custom Made Options
              </h3>
              <p className="font-sans text-[13px] text-ivory-dim/75 font-normal leading-relaxed max-w-[240px]">
                Personalised interior & furniture customisation.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
