/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onSetCategory?: (cat: string) => void;
  onOpenPrivacy?: () => void;
}

export default function Footer({ onSetCategory, onOpenPrivacy }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: string) => {
    if (onSetCategory) {
      onSetCategory(cat);
      const element = document.getElementById('catalog');
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#14120E] border-t border-line pt-20 pb-8 text-xs font-sans text-ivory-dim">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Logo Brand Profile (Col span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
              className="flex flex-col items-start gap-1 inline-flex group text-left"
            >
              <Logo variant="footer" iconSize={84} showText={true} className="items-start text-left" />
            </a>
            <p className="text-ivory-dim/80 max-w-sm leading-relaxed">
              Handcrafted solid wood furniture, made in Lahore and delivered across Pakistan since 2011. Every join is custom-cut, seasoned, and finalized by our ustad karigars in-house.
            </p>
            <div className="flex gap-3">
              <a href="#ig" className="w-9 h-9 border border-line hover:border-oak hover:text-oak flex items-center justify-center transition-all duration-300">
                IG
              </a>
              <a href="#fb" className="w-9 h-9 border border-line hover:border-oak hover:text-oak flex items-center justify-center transition-all duration-300">
                FB
              </a>
              <a href="#pn" className="w-9 h-9 border border-line hover:border-oak hover:text-oak flex items-center justify-center transition-all duration-300">
                PN
              </a>
            </div>
          </div>

          {/* Column 2: Room Links (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h6 className="font-mono text-[10px] uppercase text-sage tracking-widest font-semibold">Collections</h6>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => handleCategoryClick('bedroom')}
                  className="hover:text-oak transition-colors text-left font-sans cursor-pointer"
                >
                  Bedroom Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('dining')}
                  className="hover:text-oak transition-colors text-left font-sans cursor-pointer"
                >
                  Dining Area
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('living-room')}
                  className="hover:text-oak transition-colors text-left font-sans cursor-pointer"
                >
                  Lounge Parlor
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('outdoor')}
                  className="hover:text-oak transition-colors text-left font-sans cursor-pointer"
                >
                  Outdoor Veranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('sets')}
                  className="hover:text-oak transition-colors text-left font-sans cursor-pointer text-oak font-medium"
                >
                  Furniture Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h6 className="font-mono text-[10px] uppercase text-sage tracking-widest font-semibold">Our Studio</h6>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#showrooms"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection('showrooms');
                  }}
                  className="hover:text-oak transition-colors font-sans block"
                >
                  Design Showrooms
                </a>
              </li>
              <li>
                <a
                  href="#interior-services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection('interior-services');
                  }}
                  className="hover:text-oak transition-colors font-sans block"
                >
                  Interior Architecture
                </a>
              </li>
              <li>
                <a
                  href="#craftsmanship"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection('craftsmanship');
                  }}
                  className="hover:text-oak transition-colors font-sans block"
                >
                  Process & Seasoning
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection('reviews');
                  }}
                  className="hover:text-oak transition-colors font-sans block"
                >
                  Client Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h6 className="font-mono text-[10px] uppercase text-sage tracking-widest font-semibold">Location Contact</h6>
            <ul className="space-y-2.5 text-ivory-dim/90">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                <span>Sector XX, Phase 3, DHA, Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-oak shrink-0" />
                <span>+92 (42) 3574-8891</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-oak shrink-0" />
                <span>info@holzcraft.com.pk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-line pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-ivory-dim/60">
          <p>&copy; {currentYear} Holzcraft Timber Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onOpenPrivacy) {
                  onOpenPrivacy();
                }
              }}
              className="hover:text-oak transition-colors text-ivory-dim/60 cursor-pointer bg-transparent border-none p-0 text-xs"
            >
              Privacy Policy
            </button>
            <a href="#terms" className="hover:text-oak transition-colors">
              Terms of Service
            </a>
            <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-sage">
              <ShieldCheck className="w-3.5 h-3.5" /> Handcrafted Solid Wood Guarantee
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
