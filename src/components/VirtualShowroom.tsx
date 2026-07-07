/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, ArrowLeft, ArrowRight, Sparkles, Send, Copy, FileText, Smartphone } from 'lucide-react';
import CountUp from './CountUp';

interface SubItem {
  name: string;
  price: string;
  desc: string;
}

interface CategoryData {
  title: string;
  desc: string;
  image: string;
  badge: string;
  items: SubItem[];
}

interface VirtualShowroomProps {
  onAddMessageToast?: (msg: string) => void;
}

export default function VirtualShowroom({ onAddMessageToast }: VirtualShowroomProps) {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<'home' | 'detail'>('home');
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>('bedroom');
  const [activeSubItem, setActiveSubItem] = useState<string>('Bed');

  // Customizer States
  const [woodPolish, setWoodPolish] = useState<string>('Standard Finish');
  const [woodColor, setWoodColor] = useState<string>('transparent');
  const [fabricOverlay, setFabricOverlay] = useState<string>('Standard Velvet');
  const [fabricColor, setFabricColor] = useState<string>('transparent');

  // Inquiry Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItemName, setModalItemName] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [woodSelection, setWoodSelection] = useState('Pure Sheesham Wood (Tali)');
  const [customSpecs, setCustomSpecs] = useState('');

  // Toast notifications state inside component as a fallback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    if (onAddMessageToast) {
      onAddMessageToast(msg);
    } else {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  // High fidelity database corresponding perfectly to user's requested specification
  const categoriesData: Record<string, CategoryData> = {
    bedroom: {
      title: "Bedroom Catalog",
      desc: "Pure carved hardwood masterpieces corresponding to image_5be139_2.png. Designed with customized bedside alignment, heavy carving, seasoned structure, and matching vanity layouts.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
      badge: "image_5be139_2.png",
      items: [
        { name: "Bed", price: "Premium Quote", desc: "Double/King configuration with symmetrical carved wooden headboards and premium cushion inserts." },
        { name: "Bedroom Chairs", price: "Custom Quote", desc: "Crafted lounge support chairs with matching sheesham contours and luxury fabric upholstery." },
        { name: "Dressing", price: "Premium Quote", desc: "High-end round mirror framing with solid multi-drawer chest setups." },
        { name: "Almirah", price: "On Request", desc: "Kiln-dried seasoned sliding wardrobe closets featuring brass locking assemblies." },
        { name: "Sofa & Deewan", price: "Custom Quote", desc: "Traditional low-floor deewan lounges complete with supportive side bolster cushions." }
      ]
    },
    dining: {
      title: "Dining Collections",
      desc: "Elegant structured dining sets corresponding to image_5be175_2.png. Custom triangular glass inserts, heat-proof wood coating, and comfort posture support chairs.",
      image: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=800",
      badge: "image_5be175_2.png",
      items: [
        { name: "Dining Table Set", price: "Premium Quote", desc: "Beautiful triangular solid structure setup featuring rounded glass corner profiles." },
        { name: "Sofa & Chairs", price: "Bespoke Price", desc: "Ergonomically constructed high-back chairs designed with seasoned teak framing." },
        { name: "Almirah", price: "On Request", desc: "Tempered glass showcase closets complete with integrated LED backlight grids." },
        { name: "Trolley", price: "Bespoke Price", desc: "Dual shelf functional wheeling trolley crafted with heavy polished brass handles." }
      ]
    },
    lounge: {
      title: "Luxury Lounge",
      desc: "Ultra luxury lounges matching image_5be426_2.png. High-density master foam Chesterfield sofas, handcrafted console trunks, and traditional brass-hanging Jhulas.",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
      badge: "image_5be426_2.png",
      items: [
        { name: "Console, Tables & Chester", price: "Premium Quote", desc: "Low profile drawing room television console units and central matching brass-inlay tables." },
        { name: "Sofa, Chair & Deewan", price: "Premium Quote", desc: "7-Seater royal Chesterfield tufted sofa set featuring gold-beaded velvet borders." },
        { name: "Swing & Wooden Jhula", price: "Bespoke Price", desc: "Heavy indoor ceiling/frame swinging assembly with supportive safety brackets." }
      ]
    },
    outdoor: {
      title: "All-Weather Outdoor",
      desc: "Seasoned outdoor options matching image_5be45d_2.png. Specially treated to handle humidity, water splashes, and UV light exposure without cracking.",
      image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=800",
      badge: "image_5be45d_2.png",
      items: [
        { name: "Chair & Tables", price: "Custom Quote", desc: "Minimalist garden seating configurations styled with natural weather-resistant oils." },
        { name: "Picnic Set", price: "Bespoke Price", desc: "Integrated bench picnic layouts designed for durability and outdoor events." },
        { name: "Ring Swing & Wooden Jhula", price: "Premium Quote", desc: "Elegant garden patio swings suspended on heavy kiln-seasoned wooden frames." }
      ]
    },
    sets: {
      title: "Bridal & Complete Coordinated Sets",
      desc: "Consolidated home setups matching image_5be47d_2.png. Coordinated themes, matching polish finishes, and intricate hand-carved lattice panel elements.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
      badge: "image_5be47d_2.png",
      items: [
        { name: "Bridal Sets", price: "Complete Package", desc: "Premium bedroom package including bed, custom mirror vanity, and multi-door wardrobe." },
        { name: "Sofa Set", price: "Bespoke Price", desc: "Fully matching lounge suites including side stools and coordinated coffee setups." },
        { name: "Table & Chair Sets", price: "Bespoke Price", desc: "Symmetrical layout of matching dining/accent chairs with unified wood colors." },
        { name: "Net Set", price: "On Request", desc: "Custom partitions and frames featuring beautiful wooden geometric lattice screens." }
      ]
    },
    interior: {
      title: "Bespoke Interior Fitting Services",
      desc: "Integrated interior construction matching image_5be4a1_2.png. Designed with premium solid-wood door frames, customized TV acoustic backdrops, and modular kitchen dividers.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
      badge: "image_5be4a1_2.png",
      items: [
        { name: "Wood & Fiber Doors", price: "Custom Estimate", desc: "Secure solid wood doors featuring anti-termite sealant treatments." },
        { name: "Wall Art & TV Units", price: "Bespoke Estimate", desc: "Bespoke vertical acoustic paneling with hidden cord pathways and backlighting." },
        { name: "Curtains", price: "Custom Estimate", desc: "Imported luxury velvet and linen drapery tailored precisely to window sizing." },
        { name: "Kitchen Cabinets & Wardrobes", price: "Bespoke Estimate", desc: "Luxury wood storage layouts featuring soft-close hinges and customized drawer grids." }
      ]
    }
  };

  // Custom Navigation Event Listener
  useEffect(() => {
    const handleSelectEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string; item?: string }>;
      if (customEvent.detail) {
        const { category, item } = customEvent.detail;
        if (categoriesData[category]) {
          setActiveCategoryKey(category);
          setCurrentPage('detail');
          if (item) {
            setActiveSubItem(item);
          } else {
            setActiveSubItem(categoriesData[category].items[0].name);
          }
          
          // Smooth scroll to virtual-showroom section
          setTimeout(() => {
            const el = document.getElementById('virtual-showroom');
            if (el) {
              const offset = 85;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elRect = el.getBoundingClientRect().top;
              const elPosition = elRect - bodyRect;
              window.scrollTo({
                top: elPosition - offset,
                behavior: 'smooth'
              });
            }
          }, 100);
        }
      }
    };

    window.addEventListener('selectShowroomCategory', handleSelectEvent);
    return () => window.removeEventListener('selectShowroomCategory', handleSelectEvent);
  }, []);

  const handleOpenCategoryDetail = (key: string) => {
    setActiveCategoryKey(key);
    const data = categoriesData[key];
    if (data && data.items.length > 0) {
      setActiveSubItem(data.items[0].name);
    }
    // Reset customizer styles
    setWoodPolish('Standard Finish');
    setWoodColor('transparent');
    setFabricOverlay('Standard Velvet');
    setFabricColor('transparent');
    setCurrentPage('detail');
  };

  const applyWoodPreset = (hexColor: string, name: string) => {
    setWoodColor(hexColor);
    setWoodPolish(name);
    triggerToast(`Applied wood finish: ${name}`);
  };

  const applyFabricPreset = (hexColor: string, name: string) => {
    setFabricColor(hexColor);
    setFabricOverlay(name);
    triggerToast(`Applied fabric: ${name}`);
  };

  const handleOpenInquiry = () => {
    const currentCat = categoriesData[activeCategoryKey];
    setModalItemName(`${currentCat.title} - ${activeSubItem}`);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    triggerToast("Shukriya! Custom quotation request received. Our team will contact you via WhatsApp shortly.");
    setClientName('');
    setClientPhone('');
    setCustomSpecs('');
  };

  const copyCodeSegment = () => {
    const code = `<!-- Premium Showroom Grid Segment Correlated to User's visual assets -->\n<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\n  <!-- Visual correlated layout matches image_5be139_2.png, image_5be175_2.png, etc. -->\n  <!-- Beautiful customized micro-animations included -->\n</div>`;
    navigator.clipboard.writeText(code).then(() => {
      triggerToast("HTML Code segment copied successfully!");
    }).catch(() => {
      triggerToast("Failed to copy code.");
    });
  };

  const activeCategory = categoriesData[activeCategoryKey] || categoriesData.bedroom;

  return (
    <section id="virtual-showroom" className="py-24 bg-[#110f0c] border-t border-b border-stone-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">

        {/* ================= PAGE 1: SHOWCASE OVERVIEW ================= */}
        {currentPage === 'home' && (
          <div className="space-y-16 animate-fade-in">
            {/* Header Content */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-full text-[11px] uppercase tracking-widest font-bold">
                <Sparkles className="w-3 h-3 text-amber-500" /> Virtual Showroom Experience
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-serif text-ivory tracking-tight">
                Masterfully Sculpted Solid Wood
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Aap k luxury visual reference k mutabiq har category ko real-world catalogs, item structures aur custom option grids k sath configure kia gya hai.
              </p>
            </div>

            {/* Showcase Presentation Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-stone-900/40 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 border border-stone-800/80 shadow-2xl">
              <div className="max-w-xl space-y-6">
                <span className="text-[11px] text-amber-500 uppercase tracking-widest font-bold block">
                  Raw Wood to Luxury Art
                </span>
                <h3 className="text-3xl md:text-5xl font-serif leading-tight text-white">
                  Bespoke Solid Wood Masterpieces
                </h3>
                <p className="text-stone-300 text-sm font-light leading-relaxed">
                  Handcrafted luxury furniture designed to elevate your living spaces. Experience kiln-dried, seasoned masterpieces built to last generations. Click on any category below to explore individual custom models.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a href="#catalog-grid-anchor" className="px-7 py-3.5 bg-amber-700 hover:bg-amber-800 text-stone-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-amber-900/35">
                    Browse Collection
                  </a>
                  <button 
                    onClick={() => handleOpenCategoryDetail('interior')}
                    className="px-7 py-3.5 border border-stone-500 hover:border-stone-300 text-stone-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 bg-white/5 backdrop-blur"
                  >
                    Consultation Services
                  </button>
                </div>
              </div>

              {/* Featured Dynamic Showcase Block */}
              <div className="w-full lg:w-1/2 max-w-lg h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl relative group border border-stone-800">
                <img 
                  src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800" 
                  alt="Royal Bed Setup" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-stone-950/85 backdrop-blur-md p-5 rounded-xl border border-white/10">
                  <span className="text-[9px] text-amber-400 uppercase tracking-widest font-bold">Featured Concept (image_5be139_2.png)</span>
                  <h4 className="text-base font-serif font-bold text-stone-100 mt-1">Royal Bedroom Master Suite</h4>
                  <p className="text-stone-400 text-xs mt-1 font-light">Custom carved Sheesham structures complete with high-gloss brass inlay lacquer finish.</p>
                </div>
              </div>
            </div>

            {/* Catalog Grid Section Anchor */}
            <div id="catalog-grid-anchor" className="space-y-8 scroll-mt-24 pt-4">
              {/* Category Grid list */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(categoriesData).map(([key, cat]) => (
                  <div 
                    key={key}
                    onClick={() => handleOpenCategoryDetail(key)}
                    className="group cursor-pointer box-gradient rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-64 overflow-hidden bg-stone-950">
                      <img 
                        src={cat.image} 
                        alt={cat.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-4 left-4 bg-amber-800 text-stone-100 text-[10px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
                        {cat.badge}
                      </span>
                    </div>

                    <div className="p-6 flex-grow">
                      <h4 className="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-500 transition-colors uppercase tracking-wide">
                        {key}
                      </h4>
                      <p className="text-stone-400 text-xs mt-2 line-clamp-3">
                        {cat.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {cat.items.slice(0, 3).map((item, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-stone-900 text-stone-300 rounded text-[10px] font-medium border border-stone-800">
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button className="w-full py-3 bg-stone-900 group-hover:bg-amber-700 hover:text-white text-stone-300 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border border-stone-800 group-hover:border-amber-700">
                        View Full Collection &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solid Wood Trust Badges Segment */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12 border-t border-b border-stone-800/80">
              <div className="text-center p-4 space-y-2">
                <div className="text-amber-500 font-serif text-3xl font-semibold">
                  <CountUp end={100} suffix="%" />
                </div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-100">Premium Hardwood</h5>
                <p className="text-stone-400 text-[11px]">Strictly use seasoned Sheesham & Golden Teak.</p>
              </div>
              <div className="text-center p-4 space-y-2">
                <div className="text-amber-500 font-serif text-3xl font-semibold">
                  <CountUp end={15} suffix=" Year" />
                </div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-100">Termite Warranty</h5>
                <p className="text-stone-400 text-[11px]">Advanced pressure chemical kiln treatment.</p>
              </div>
              <div className="text-center p-4 space-y-2">
                <div className="text-amber-500 font-serif text-3xl font-semibold">Custom</div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-100">Made To Order</h5>
                <p className="text-stone-400 text-[11px]">Sizing & fabrics adjusted perfectly to your layout.</p>
              </div>
              <div className="text-center p-4 space-y-2">
                <div className="text-amber-500 font-serif text-3xl font-semibold">Safe</div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-100">Transit Padding</h5>
                <p className="text-stone-400 text-[11px]">Free delivery with absolute doorstep fitting.</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 2: CHILD CATEGORY DETAIL PAGE ================= */}
        {currentPage === 'detail' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Navigation Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className="group flex items-center space-x-2.5 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-amber-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                <span>Back to Premium Showcase</span>
              </button>
              
              <span className="text-[10px] font-mono bg-amber-800/60 border border-amber-700/80 text-stone-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">
                Correlation: {activeCategory.badge}
              </span>
            </div>

            {/* Dynamic Category Detail Split Layout */}
            <div className="box-gradient rounded-3xl p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Column: Interactive Image Previewer & Visualizer */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-md">
                    {/* Visualizer Frame */}
                    <div className="w-full h-80 md:h-[420px] relative flex items-center justify-center overflow-hidden">
                      <img 
                        src={activeCategory.image} 
                        alt="Active Preview" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Interactive Polish Tint Overlay */}
                      <div 
                        className="absolute inset-0 mix-blend-multiply opacity-35 transition-all duration-500 pointer-events-none"
                        style={{ backgroundColor: woodColor }}
                      ></div>
                      
                      {/* Interactive Fabric Tint Overlay */}
                      <div 
                        className="absolute inset-0 mix-blend-color opacity-35 transition-all duration-500 pointer-events-none"
                        style={{ backgroundColor: fabricColor }}
                      ></div>

                      {/* Pure Wood Flag */}
                      <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md text-white text-[10px] px-3.5 py-2 rounded-xl border border-white/10 flex items-center space-x-2 z-10">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        <span className="font-bold tracking-widest uppercase">Premium Seasoned Core</span>
                      </div>
                    </div>
                  </div>

                  {/* Sandbox Wood and Fabric Customizer */}
                  <div className="p-6 box-gradient rounded-2xl space-y-5">
                    <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <h5 className="text-xs font-bold uppercase tracking-widest text-stone-300">Live Visual Sandbox Customizer</h5>
                      </div>
                      <span className="text-[9px] font-bold text-amber-400 uppercase bg-amber-950/80 border border-amber-900 px-2 py-0.5 rounded">Active Mock</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Wood Polish Selection */}
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">Premium Wood Finish</label>
                        <div className="flex items-center gap-2.5">
                          <button 
                            onClick={() => applyWoodPreset('#5c3e21', 'Dark Walnut Finish')}
                            className={`w-8 h-8 rounded-full bg-[#5c3e21] border-2 transition-all ${woodPolish === 'Dark Walnut Finish' ? 'border-amber-500 scale-110' : 'border-stone-900 hover:scale-105'}`}
                            title="Dark Walnut"
                          ></button>
                          <button 
                            onClick={() => applyWoodPreset('#b5835a', 'Golden Teak Finish')}
                            className={`w-8 h-8 rounded-full bg-[#b5835a] border-2 transition-all ${woodPolish === 'Golden Teak Finish' ? 'border-amber-500 scale-110' : 'border-stone-900 hover:scale-105'}`}
                            title="Golden Teak"
                          ></button>
                          <button 
                            onClick={() => applyWoodPreset('#8b5a2b', 'Natural Sheesham')}
                            className={`w-8 h-8 rounded-full bg-[#8b5a2b] border-2 transition-all ${woodPolish === 'Natural Sheesham' ? 'border-amber-500 scale-110' : 'border-stone-900 hover:scale-105'}`}
                            title="Natural Sheesham"
                          ></button>
                          <button 
                            onClick={() => applyWoodPreset('#faf6f0', 'Deco Painted White')}
                            className={`w-8 h-8 rounded-full bg-[#faf6f0] border-2 transition-all ${woodPolish === 'Deco Painted White' ? 'border-amber-500 scale-110' : 'border-stone-900 hover:scale-105'}`}
                            title="Deco Painted White"
                          ></button>
                        </div>
                        <span className="text-[10px] text-stone-400 italic block mt-1">Selected: {woodPolish}</span>
                      </div>

                      {/* Cushion Fabric Selection */}
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">Luxury Fabric Overlay</label>
                        <div className="flex items-center gap-2.5">
                          <button 
                            onClick={() => applyFabricPreset('#7f1d1d', 'Royal Velvet Red')}
                            className={`w-8 h-8 rounded-full bg-red-900 border-2 transition-all ${fabricOverlay === 'Royal Velvet Red' ? 'border-amber-500 scale-110' : 'border-stone-900 hover:scale-105'}`}
                            title="Royal Velvet Red"
                          ></button>
                          <button 
                            onClick={() => applyFabricPreset('#064e3b', 'Emerald Cushion')}
                            className={`w-8 h-8 rounded-full bg-emerald-900 border-2 transition-all ${fabricOverlay === 'Emerald Cushion' ? 'border-amber-500 scale-110' : 'border-stone-900 hover:scale-105'}`}
                            title="Emerald Cushion"
                          ></button>
                          <button 
                            onClick={() => applyFabricPreset('#d97706', 'Warm Mustard Cushion')}
                            className={`w-8 h-8 rounded-full bg-amber-600 border-2 transition-all ${fabricOverlay === 'Warm Mustard Cushion' ? 'border-amber-500 scale-110' : 'border-stone-900 hover:scale-105'}`}
                            title="Warm Mustard"
                          ></button>
                          <button 
                            onClick={() => applyFabricPreset('#f5f5f4', 'Classic Sand Beige')}
                            className={`w-8 h-8 rounded-full bg-stone-100 border-2 transition-all ${fabricOverlay === 'Classic Sand Beige' ? 'border-amber-500 scale-110' : 'border-stone-900 hover:scale-105'}`}
                            title="Sand Beige"
                          ></button>
                        </div>
                        <span className="text-[10px] text-stone-400 italic block mt-1">Selected: {fabricOverlay}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Dynamic Sub-items Catalog & Interactive Console */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase tracking-wide">
                      {activeCategory.title}
                    </h3>
                    <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
                      {activeCategory.desc}
                    </p>
                  </div>

                  {/* Sub-items list */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Available Sub-items Catalog</h4>
                      <span className="text-[9px] text-amber-500 uppercase font-bold italic">Click variant to select</span>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {activeCategory.items.map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            setActiveSubItem(item.name);
                            triggerToast(`Selected Variant: ${item.name}`);
                          }}
                          className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer group flex items-start justify-between gap-4 ${activeSubItem === item.name ? 'border-amber-600 bg-amber-950/20 shadow-md' : 'border-stone-800 bg-stone-900/20 hover:border-stone-700'}`}
                        >
                          <div className="space-y-1">
                            <h5 className={`text-sm font-bold transition-colors ${activeSubItem === item.name ? 'text-amber-400' : 'text-stone-200 group-hover:text-amber-500'}`}>
                              {item.name}
                            </h5>
                            <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-xs font-bold text-stone-200 block font-mono">
                              {item.price}
                            </span>
                            <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider block mt-1 group-hover:underline">
                              Customize &rarr;
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Console */}
                  <div className="p-6 border border-amber-600/20 bg-amber-950/15 rounded-2xl space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/25">
                        <Info className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-stone-200 uppercase tracking-wide">Custom Dimensions & Sizing Available</h5>
                        <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                          App apni marzi ke space ke mutabiq measurements adjust karwa sakte hain. Our master carpenter provides site analysis services.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button 
                        onClick={handleOpenInquiry}
                        className="flex-grow py-3.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md active:scale-[0.98]"
                      >
                        Request Bespoke Price Quote
                      </button>
                      <button 
                        onClick={() => triggerToast("Bespoke schematic blueprint downloaded to system mockup cache.")}
                        className="px-5 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-[0.98]"
                      >
                        Bespoke Blueprint
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Technical checklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-stone-900/20 rounded-2xl border border-stone-800/80 flex items-start space-x-3">
                <span className="text-amber-500 text-lg leading-none mt-0.5">✔</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-200 uppercase">Seasoned Hardwood Only</h4>
                  <p className="text-[11px] text-stone-400 leading-normal font-light">
                    Pure Sheesham (Tali) & Teak wood treated through direct furnace heating to eliminate moisture content.
                  </p>
                </div>
              </div>
              <div className="p-5 bg-stone-900/20 rounded-2xl border border-stone-800/80 flex items-start space-x-3">
                <span className="text-amber-500 text-lg leading-none mt-0.5">✔</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-200 uppercase">High Gloss & Deco Polishes</h4>
                  <p className="text-[11px] text-stone-400 leading-normal font-light">
                    Premium German wood polish application. Ensures water stain and hot pan heat protection.
                  </p>
                </div>
              </div>
              <div className="p-5 bg-stone-900/20 rounded-2xl border border-stone-800/80 flex items-start space-x-3">
                <span className="text-amber-500 text-lg leading-none mt-0.5">✔</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-200 uppercase">Master Foam & Springs</h4>
                  <p className="text-[11px] text-stone-400 leading-normal font-light">
                    Under-structure uses high-resilience pocketed springs to ensure zero sagging over decades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= DEVELOPER RAW CODE EXPORT ================= */}
        <div className="mt-20 bg-stone-950 p-8 md:p-12 border border-stone-800 rounded-3xl font-mono text-xs w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <div>
              <span className="text-amber-500 font-semibold tracking-wider uppercase text-[10px]">Developer Code Output</span>
              <h3 className="text-white font-serif text-lg mt-1 font-semibold">Ready-to-Use Component Code</h3>
              <p className="text-[11px] text-stone-500 font-sans mt-1">Copy this clean modular representation for embedding on your primary sites, React panels or web builders.</p>
            </div>
            <button 
              onClick={copyCodeSegment}
              className="flex items-center gap-2 bg-amber-700 hover:bg-amber-850 text-white font-sans px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow active:scale-95 shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Code Segment
            </button>
          </div>
          
          <div className="relative">
            <textarea 
              readOnly 
              value={`<!-- Premium Showroom Grid Segment Correlated to User's visual assets -->\n<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\n  <!-- Visual correlated layout matches image_5be139_2.png, image_5be175_2.png, etc. -->\n  <!-- Beautiful customized micro-animations included -->\n</div>`}
              className="w-full h-32 bg-stone-900 text-amber-200/90 p-4 rounded-xl border border-stone-800 focus:outline-none resize-none font-mono text-[11px] leading-relaxed"
            />
          </div>
        </div>

      </div>

      {/* ================= INQUIRY MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-lg bg-[#181613] rounded-3xl border border-stone-800 p-8 text-left shadow-2xl z-10"
            >
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase block">
                  Consultation for {activeCategoryKey.toUpperCase()}
                </span>
                <h2 className="text-2xl font-serif font-bold text-white">Inquire & Request Bespoke Quote</h2>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  Aap k selected variant, dimensions aur polish instructions ke mutabiq hamari team real-world quotation aur delivery timeline provide karegi.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Selected Item Variant</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={modalItemName}
                    className="w-full px-4 py-2.5 bg-stone-900 border border-stone-800 rounded-lg text-xs font-semibold text-amber-500 focus:outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ali Ahmed" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">WhatsApp / Phone *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="03xx xxxxxxx" 
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Primary Wood Selection</label>
                  <select 
                    value={woodSelection}
                    onChange={(e) => setWoodSelection(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option>Pure Sheesham Wood (Tali)</option>
                    <option>Premium Golden Teak (Sagan)</option>
                    <option>Luxury Walnut / Ash Wood combo</option>
                    <option>Solid Pine / Deodar Wood</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Custom Polish & Dimensional Specifications</label>
                  <textarea 
                    placeholder="Write dimensional requirements (e.g., 6ft x 6.5ft), fabric choice, or polish gloss requirements..." 
                    rows={3} 
                    value={customSpecs}
                    onChange={(e) => setCustomSpecs(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-400 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Internal success toast as fallback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1e1c18] border border-amber-600 p-4 shadow-2xl text-xs z-[200] flex items-center gap-3 font-sans rounded-md min-w-[280px]"
          >
            <div className="w-5 h-5 rounded-full bg-amber-600/20 text-amber-500 flex items-center justify-center border border-amber-600/50">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-white font-medium flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
