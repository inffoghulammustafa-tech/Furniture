/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceFeatures from './components/ServiceFeatures';
import Collections from './components/Collections';
import Catalog from './components/Catalog';
import Configurator from './components/Configurator';
import CategoryPage from './components/CategoryPage';
import Craftsmanship from './components/Craftsmanship';
import Showrooms from './components/Showrooms';
import VirtualShowroom from './components/VirtualShowroom';
import InteriorServices from './components/InteriorServices';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import AiAdvisor from './components/AiAdvisor';
import QuoteBasket from './components/QuoteBasket';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import { Product, CustomConfig, QuoteItem } from './types';
import { ChevronUp, Check, Info } from 'lucide-react';

export default function App() {
  // Global States
  const [cart, setCart] = useState<QuoteItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedConfigProduct, setSelectedConfigProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  // Custom Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('holzcraft_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  const saveCart = (newCart: QuoteItem[]) => {
    setCart(newCart);
    localStorage.setItem('holzcraft_cart', JSON.stringify(newCart));
  };

  // Scroll to Top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Show a quick, elegant status toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Scroll to helper
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // header height buffer
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

  // Cart Operations
  const handleAddProductToQuote = (product: Product) => {
    const existingIndex = cart.findIndex(item => item.product?.id === product.id && !item.customConfig);
    
    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: `prod-${product.id}-${Date.now()}`,
        product,
        quantity: 1
      });
    }

    saveCart(updatedCart);
    triggerToast(`Added ${product.name} to Quote Basket`);
  };

  const handleAddCustomConfigToQuote = (config: CustomConfig) => {
    // Each custom piece is treated as a unique, independent line item
    const newItem: QuoteItem = {
      id: config.id,
      customConfig: config,
      quantity: 1
    };

    const updatedCart = [...cart, newItem];
    saveCart(updatedCart);
    triggerToast(`Added customized ${config.baseProductName} to Quote Basket`);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    saveCart(updatedCart);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleSelectCategoryFromCollections = (category: string) => {
    setSelectedCategory(category);
    scrollToId('catalog');
  };

  const handleConfigureProductFromCatalog = (product: Product) => {
    setSelectedConfigProduct(product);
    scrollToId('configurator');
  };

  const handleGoHome = () => {
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory relative selection:bg-oak selection:text-charcoal flex flex-col justify-between">
      
      {/* Site Header */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenCategory={setActiveCategory}
        onGoHome={handleGoHome}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {activeCategory ? (
          <CategoryPage
            category={activeCategory}
            onAddProductToQuote={handleAddProductToQuote}
            onConfigureProduct={handleConfigureProductFromCatalog}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onExploreCatalog={() => scrollToId('catalog')}
              onOpenCustomizer={() => scrollToId('configurator')}
            />

            {/* Service Features Row */}
            <ServiceFeatures />

            {/* Collections Room Directory */}
            <Collections
              onSelectCollection={(cat) => {
                setActiveCategory(cat);
              }}
              onOpenPrivacy={() => setIsPrivacyOpen(true)}
            />

            {/* Product Catalog Display and inspection detail modals */}
            <Catalog
              selectedCategory={selectedCategory}
              onSetCategory={setSelectedCategory}
              onAddProductToQuote={handleAddProductToQuote}
              onConfigureProduct={handleConfigureProductFromCatalog}
              cart={cart}
            />

            {/* Bespoke Furniture Customizer Configurator Studio */}
            <Configurator
              initialSelectedProduct={selectedConfigProduct}
              onAddCustomConfigToQuote={handleAddCustomConfigToQuote}
            />

            {/* Process and Handcrafted Philosophy Section */}
            <Craftsmanship />

            {/* Showrooms Section */}
            <VirtualShowroom onAddMessageToast={triggerToast} />

            {/* Interior Services Section */}
            <InteriorServices />

            {/* Client audits reviews list and rating feedback */}
            <Reviews />
          </>
        )}
      </main>

      {/* Footer Block */}
      <Footer onSetCategory={setSelectedCategory} onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Slide-out Sidebar: Kabir, AI Wood Advisor Chat */}
      <AiAdvisor
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />

      {/* Slide-out Sidebar: Custom Quote cart Workspace */}
      <QuoteBasket
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Global Status Toast Notification */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <PrivacyPolicyModal
            isOpen={isPrivacyOpen}
            onClose={() => setIsPrivacyOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1e1c18] border border-oak p-4 shadow-xl text-xs z-50 flex items-center gap-3 font-sans rounded-sm min-w-[280px]"
          >
            <div className="w-5 h-5 rounded-full bg-sage/20 text-sage flex items-center justify-center border border-sage/50">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-ivory font-medium flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top floating scroll indicator button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-oak text-charcoal flex items-center justify-center transition-all duration-300 z-40 shadow-lg hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll back to top of page"
      >
        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
      </button>

    </div>
  );
}
