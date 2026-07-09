/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, MessageSquare, Compass, Sliders, ChevronDown } from 'lucide-react';
import { QuoteItem } from '../types';
import Logo from './Logo';

interface NavbarProps {
  cart: QuoteItem[];
  onOpenCart: () => void;
  onOpenAdvisor: () => void;
  onOpenCategory: (cat: string) => void;
  onGoHome: () => void;
}

export default function Navbar({ cart, onOpenCart, onOpenAdvisor, onOpenCategory, onGoHome }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Total items count in the Quote Cart
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background blur/color after scrolling a bit
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryNav = (cat: string) => {
    setMobileMenuOpen(false);
    onOpenCategory(cat);
  };

  const handleChildNav = (categoryKey: string, childName: string) => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('selectShowroomCategory', {
      detail: { category: categoryKey, item: childName }
    }));
  };

  const handleScrollToTop = () => {
    setMobileMenuOpen(false);
    onGoHome();
  };

  const categoriesWithChildren = [
    {
      key: 'bedroom',
      label: 'Bedroom',
      children: ['Bed', 'Bedroom Chairs', 'Dressing', 'Almirah', 'Sofa & Deewan']
    },
    {
      key: 'dining',
      label: 'Dining',
      children: ['Dining Table Set', 'Sofa & Chairs', 'Almirah', 'Trolley']
    },
    {
      key: 'lounge',
      label: 'Lounge',
      children: ['Console, Tables & Chester', 'Sofa, Chair & Deewan', 'Swing & Wooden Jhula']
    },
    {
      key: 'outdoor',
      label: 'Outdoor',
      children: ['Chair & Tables', 'Picnic Set', 'Ring Swing & Wooden Jhula']
    },
    {
      key: 'sets',
      label: 'Sets',
      children: ['Bridal Sets', 'Sofa Set', 'Table & Chair Sets', 'Net Set']
    },
    {
      key: 'interior',
      label: 'Interior Services',
      children: ['Wood & Fiber Doors', 'Wall Art & TV Units', 'Curtains', 'Kitchen Cabinets & Wardrobes']
    }
  ];

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 border-b border-line transition-all duration-300 ${
          hideHeader ? '-translate-y-full' : 'translate-y-0'
        } ${isScrolled ? 'bg-charcoal/95 backdrop-blur-md py-4' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo with text underneath, matching image 1 layout */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToTop();
            }}
            className="flex flex-col items-center justify-center text-center group py-1"
          >
            <Logo variant="navbar" iconSize={68} showText={true} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-7">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToTop();
                  }}
                  className="font-sans text-[13px] 2xl:text-[14px] font-bold uppercase tracking-wider text-ivory-dim hover:text-oak transition-colors duration-200"
                >
                  Home
                </a>
              </li>

              {categoriesWithChildren.map((cat) => (
                <li key={cat.key} className="relative group py-2">
                  <button
                    onClick={() => {
                      if (cat.key === 'interior') {
                        scrollToSection('interior-services');
                      } else {
                        handleCategoryNav(cat.key === 'lounge' ? 'living-room' : cat.key);
                      }
                    }}
                    className="font-sans text-[13px] 2xl:text-[14px] font-bold uppercase tracking-wider text-ivory-dim group-hover:text-oak hover:text-oak transition-colors duration-200 cursor-pointer flex items-center gap-1"
                  >
                    {cat.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-all group-hover:rotate-180 duration-300" />
                  </button>

                  {/* High Fidelity Dropdown Overlay */}
                  <div className="absolute top-full left-0 mt-1 w-64 bg-stone-900/98 backdrop-blur-xl border border-stone-800 rounded-2xl shadow-2xl p-5 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500/70 block mb-2.5 pb-1 border-b border-stone-800/80">
                      Explore Catalog
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {cat.children.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleChildNav(cat.key, item)}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-stone-300 hover:text-white hover:bg-amber-800/25 border border-transparent hover:border-amber-700/20 rounded-xl transition-all"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </li>
              ))}

              <li>
                <a
                  href="#virtual-showroom"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('virtual-showroom');
                  }}
                  className="font-sans text-[13px] 2xl:text-[14px] font-bold uppercase tracking-wider text-ivory-dim hover:text-oak transition-colors duration-200"
                >
                  Showrooms
                </a>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* AI Advisor Button */}
            <button
              onClick={onOpenAdvisor}
              className="p-2.5 rounded-full border border-line text-ivory hover:text-oak hover:border-oak transition-all duration-300 relative group"
              title="Chat with Kabir, AI wood advisor"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-charcoal border border-line text-[10px] uppercase tracking-wider text-ivory py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                AI Wood Advisor
              </span>
            </button>

            {/* Quote Cart Button */}
            <button
              onClick={onOpenCart}
              className="px-4 py-2 border border-oak text-oak hover:bg-oak hover:text-charcoal font-sans text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 relative"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quote Basket</span>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-oak text-charcoal text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-ivory hover:text-oak transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 right-0 h-full w-[310px] bg-stone-950 border-l border-line z-50 p-6 flex flex-col justify-between transition-transform duration-400 lg:hidden overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Logo variant="drawer" iconSize={60} showText={true} className="items-start text-left" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-ivory-dim hover:text-oak transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ul className="flex flex-col gap-6">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToTop();
                }}
                className="font-display text-lg text-ivory-dim hover:text-oak transition-colors duration-200 block"
              >
                Home
              </a>
            </li>

            {categoriesWithChildren.map((cat) => (
              <li key={cat.key} className="space-y-2">
                <button
                  onClick={() => {
                    if (cat.key === 'interior') {
                      scrollToSection('interior-services');
                    } else {
                      handleCategoryNav(cat.key === 'lounge' ? 'living-room' : cat.key);
                    }
                  }}
                  className="font-display text-lg font-bold text-stone-100 hover:text-oak transition-colors duration-200 block text-left w-full"
                >
                  {cat.label}
                </button>
                <div className="flex flex-col gap-1.5 ml-4 border-l border-amber-800/30 pl-3">
                  {cat.children.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleChildNav(cat.key, item)}
                      className="text-stone-400 hover:text-oak text-xs text-left font-sans py-1"
                    >
                      • {item}
                    </button>
                  ))}
                </div>
              </li>
            ))}

            <li>
              <a
                href="#virtual-showroom"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('virtual-showroom');
                }}
                className="font-display text-lg text-ivory-dim hover:text-oak transition-colors duration-200 block font-bold"
              >
                Virtual Showrooms
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile footer links */}
        <div className="border-t border-line pt-6 mt-8">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdvisor();
            }}
            className="w-full py-3 mb-3 border border-line text-ivory hover:text-oak hover:border-oak flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest transition-all duration-200"
          >
            <MessageSquare className="w-4 h-4 text-oak" /> Chat Wood Advisor
          </button>
          <div className="text-center text-[10px] text-ivory-dim tracking-wider uppercase">
            EST. 2011 — SOLID TIMBER ATELIER
          </div>
        </div>
      </div>
    </>
  );
}
