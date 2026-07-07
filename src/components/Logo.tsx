/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  variant?: 'navbar' | 'footer' | 'drawer';
}

export default function Logo({ className = '', iconSize = 48, showText = true, variant = 'navbar' }: LogoProps) {
  // We define dynamic layout based on variant
  const isFooter = variant === 'footer';
  const isDrawer = variant === 'drawer';

  return (
    <div className={`flex flex-col items-center justify-center text-center group ${className}`}>
      {/* SVG Icon matching 1 img exactly */}
      <svg
        width={iconSize}
        height={iconSize * 0.75}
        viewBox="0 0 100 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:scale-110 group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
      >
        <defs>
          {/* Stunning yellow-orange gold gradient matching 1 img */}
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" /> {/* Yellow 300 */}
            <stop offset="50%" stopColor="#F59E0B" /> {/* Amber 500 */}
            <stop offset="100%" stopColor="#EA580C" /> {/* Orange 600 */}
          </linearGradient>
        </defs>

        {/* 1. Triangular Roof outline */}
        <path
          d="M 12 32 L 50 8 L 88 32"
          stroke="url(#logoGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 2. Standing Floor Lamp behind the sofa */}
        {/* Lampshade */}
        <path
          d="M 43 14 L 57 14 L 60 21 L 40 21 Z"
          fill="url(#logoGrad)"
        />
        {/* Lamp pole/stem */}
        <rect
          x="48.5"
          y="21"
          width="3"
          height="14"
          rx="1"
          fill="url(#logoGrad)"
        />

        {/* 3. Cozy Sofa with overlapping cushions */}
        {/* Back cushion */}
        <rect
          x="26"
          y="31"
          width="28"
          height="23"
          rx="5"
          fill="url(#logoGrad)"
          stroke="#14120E"
          strokeWidth="1.5"
        />
        {/* Seat cushion */}
        <rect
          x="26"
          y="43"
          width="28"
          height="11"
          rx="3.5"
          fill="url(#logoGrad)"
          stroke="#14120E"
          strokeWidth="1.5"
        />
        {/* Left armrest */}
        <rect
          x="20"
          y="38"
          width="7"
          height="16"
          rx="3.5"
          fill="url(#logoGrad)"
          stroke="#14120E"
          strokeWidth="1.5"
        />
        {/* Right armrest */}
        <rect
          x="53"
          y="38"
          width="7"
          height="16"
          rx="3.5"
          fill="url(#logoGrad)"
          stroke="#14120E"
          strokeWidth="1.5"
        />

        {/* 4. Side Table / Nightstand on the right */}
        {/* Cabinet body */}
        <rect
          x="63"
          y="41"
          width="17"
          height="13"
          rx="2"
          fill="url(#logoGrad)"
          stroke="#14120E"
          strokeWidth="1.2"
        />
        {/* Drawer divider line */}
        <line
          x1="63"
          y1="47.5"
          x2="80"
          y2="47.5"
          stroke="#14120E"
          strokeWidth="1.5"
        />
        {/* Small drawer handle dot */}
        <circle
          cx="71.5"
          y="47.5"
          r="1.2"
          fill="#FFFFFF"
        />
        {/* Left leg */}
        <line
          x1="66"
          y1="54"
          x2="66"
          y2="59"
          stroke="url(#logoGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Right leg */}
        <line
          x1="77"
          y1="54"
          x2="77"
          y2="59"
          stroke="url(#logoGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 5. Decorative Vase/Trophy on top of the cabinet */}
        {/* Vase base */}
        <path
          d="M 69 41 L 74 41 L 73 31 L 70 31 Z"
          fill="url(#logoGrad)"
        />
        {/* Sphere/Bead on top */}
        <circle
          cx="71.5"
          y="28"
          r="2.2"
          fill="url(#logoGrad)"
        />
      </svg>

      {/* Brand Text positioned DOWN below the logo */}
      {showText && (
        <div className={`mt-2 select-none transition-colors duration-300 ${
          isFooter 
            ? 'mt-3.5' 
            : isDrawer 
            ? 'mt-3' 
            : 'mt-2'
        }`}>
          <div className={`font-display font-extrabold tracking-[0.08em] leading-none uppercase text-amber-500 ${
            isFooter 
              ? 'text-2xl tracking-[0.12em]' 
              : isDrawer 
              ? 'text-xl tracking-[0.1em]' 
              : 'text-[17px] tracking-[0.09em]'
          }`}>
            Furniture
          </div>
          <div className={`font-sans font-bold tracking-[0.24em] leading-none uppercase text-amber-600 ${
            isFooter 
              ? 'text-xs mt-1.5' 
              : isDrawer 
              ? 'text-[11px] mt-1.5' 
              : 'text-[10px] mt-1'
          }`}>
            Holz
          </div>
        </div>
      )}
    </div>
  );
}
