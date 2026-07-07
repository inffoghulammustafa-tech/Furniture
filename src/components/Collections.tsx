/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sofa, 
  Bed, 
  Utensils, 
  Trees, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Phone, 
  Check, 
  ShieldCheck, 
  Compass,
  Sparkles
} from 'lucide-react';

interface CollectionsProps {
  onSelectCollection: (category: string) => void;
}

const NEW_ARRIVALS = [
  // Page 1 (Exactly as in the user's image)
  {
    id: 'arr-1',
    name: 'High Living Sissoo Crafted Wood 8 Chair Fancy Dining Table Set',
    tag: 'Luxury Dining',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=600',
    status: 'Available'
  },
  {
    id: 'arr-2',
    name: 'Carving Shisham Wood High Back Bedroom Chair Set',
    tag: 'Sold Out',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600',
    status: 'Sold Out'
  },
  {
    id: 'arr-3',
    name: 'Pigeon Foot Carved Sissoo Wood Console',
    tag: 'Elegant Console',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600',
    status: 'Available'
  },
  {
    id: 'arr-4',
    name: 'Black & Golden 8 Chairs Solid Acacia Wood Fancy Dining Table Set',
    tag: 'Black & Gold',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=600',
    status: 'Available'
  },
  {
    id: 'arr-5',
    name: 'Shisham Wood Chase Ship Bedroom Chair',
    tag: 'Chaise Lounge',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600',
    status: 'Available'
  },
  {
    id: 'arr-6',
    name: 'Bergere Sissoo Wood Inlay Work Bedroom Chair Set',
    tag: 'Inlay Craft',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=600',
    status: 'Available'
  },
  {
    id: 'arr-7',
    name: 'Sheesham Wood High Back Prince Red Velvet Bedroom Chair',
    tag: 'Prince Luxury',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&q=80&w=600',
    status: 'Available'
  },
  {
    id: 'arr-8',
    name: 'Tri-Angular Solid Acacia Wood Table With 6 Carved Chairs',
    tag: 'Sold Out',
    image: 'https://images.unsplash.com/photo-1530018607912-eff2df114f12?auto=format&fit=crop&q=80&w=600',
    status: 'Sold Out'
  },
  // Page 2 (Premium Additional masterpieces)
  {
    id: 'arr-9',
    name: 'High Living L Shape 7 Seater Velvet Full Gauge Solid Wood Sofa',
    tag: 'L-Shape',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/8-Seater-Sofa-Set-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-10',
    name: 'Shisham Wood Chinioti Swing / Jhula with Brass Chains',
    tag: 'Traditional Swing',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Chinioti-Shisham-Wood-Jhola-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-11',
    name: 'Versace Inlay Crafted Sissoo Wood 3 Table Nest Set',
    tag: 'Inlay Premium',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Versace-Shisham-Wood-3-Table-Net-Set-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-12',
    name: 'Chinioti Crafted Silver Deco Moora Chair Set',
    tag: 'Chinioti Crafted',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Chinioti-Moora-Chair-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-13',
    name: 'Mughal Heritage Handcarved Solid Teak Console Mirror',
    tag: 'Royal Teak',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Console-Shisham-Carved-Wood-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-14',
    name: 'Royal Sovereign Double Cushion Sheesham Rocking Chair',
    tag: 'Rocking Chair',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Chase-Lounge-Bedroom-Sofa-Chair-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-15',
    name: 'Kalyar Geometric Lattice Carved Partition Screen',
    tag: 'Lattice Screen',
    image: 'https://i.pinimg.com/1200x/8c/1d/64/8c1d6412275f03784cca7824e7f0c317.jpg',
    status: 'Available'
  },
  {
    id: 'arr-16',
    name: 'Presidential Hand-Sculptured Walnut Dressing Table',
    tag: 'Bespoke Walnut',
    image: 'https://i.pinimg.com/1200x/b3/2c/13/b32c136f377ff5adbb10b7fb3c5d1f38.jpg',
    status: 'Available'
  }
];

const SHOWROOM_CATEGORIES = [
  {
    id: 'bedroom',
    title: 'BEDROOM',
    subtitle: 'Bedroom Series',
    desc: 'Complete master suites including hand-crafted beds, vanity mirrors, and luxury wardrobes.',
    tags: ['Beds', 'Chairs', 'Dressing', 'Almirahs'],
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'bedroom'
  },
  {
    id: 'dining',
    title: 'DINING',
    subtitle: 'Dining Concept',
    desc: 'Ergonomic triangular & circular configurations layout with polished heat-resistant lacquer.',
    tags: ['Dining Sets', 'Sofa Chairs', 'Crockery Units', 'Trolleys'],
    image: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'dining'
  },
  {
    id: 'lounge',
    title: 'LOUNGE',
    subtitle: 'Lounge Suite',
    desc: 'Deep tufted Chesterfield luxury velvet sofas, beautiful central consoles, and solid-wood Jhulas.',
    tags: ['Consoles', 'Sofas', 'Traditional Swings'],
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'living-room'
  },
  {
    id: 'outdoor',
    title: 'OUTDOOR',
    subtitle: 'Garden Design',
    desc: 'Treated weatherproof garden picnic structures, ring swings, and high-quality seasoned wood chairs.',
    tags: ['Garden Sets', 'Picnic Tables', 'Ring Swings'],
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'outdoor'
  },
  {
    id: 'sets',
    title: 'SETS',
    subtitle: 'Home Collections',
    desc: 'Curated bride sets, complete matching living rooms and traditional geometric net layout integrations.',
    tags: ['Bridal Packages', 'Coordinated Sets', 'Lattice Net Designs'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'sets'
  },
  {
    id: 'interior',
    title: 'INTERIOR SERVICES',
    subtitle: 'Interior Fitting',
    desc: 'Heavy premium solid-wood door frames, customized high-end acoustic TV consoles, drapery & kitchen panels.',
    tags: ['Doors', 'Wall Art TV Units', 'Kitchen Cabinetry'],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'interior-services'
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.98
  })
};

export default function Collections({ onSelectCollection }: CollectionsProps) {
  const [currentPage, setCurrentPage] = useState(0); // 0 or 1
  const [slideDirection, setSlideDirection] = useState(1); // 1 or -1
  const [activeInquiryItem, setActiveInquiryItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [woodSelection, setWoodSelection] = useState('Pure Sheesham Wood (Tali)');
  const [specifications, setSpecifications] = useState('');

  const handleNextPage = () => {
    setSlideDirection(1);
    setCurrentPage((prev) => (prev === 0 ? 1 : 0));
    triggerNotification(`Showing ${currentPage === 0 ? 'second' : 'first'} batch of New Arrivals`);
  };

  const handlePrevPage = () => {
    setSlideDirection(-1);
    setCurrentPage((prev) => (prev === 1 ? 0 : 1));
    triggerNotification(`Showing ${currentPage === 1 ? 'first' : 'second'} batch of New Arrivals`);
  };

  const triggerNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleOpenInquiry = (itemName: string) => {
    setActiveInquiryItem(itemName);
  };

  const handleCloseInquiry = () => {
    setActiveInquiryItem(null);
    setClientName('');
    setClientPhone('');
    setSpecifications('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCloseInquiry();
    triggerNotification("Shukriya! Custom quotation request received. Our team will contact you via WhatsApp shortly.");
  };

  const handleCategoryAction = (cat: typeof SHOWROOM_CATEGORIES[0]) => {
    if (cat.categoryKey === 'interior-services') {
      const element = document.getElementById('interior-services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        triggerNotification("Navigated to Bespoke Interior Fitting Services");
      }
    } else {
      onSelectCollection(cat.categoryKey);
      triggerNotification(`Opening ${cat.title} Collection`);
    }
  };

  // 8 items per page (2 rows of 4)
  const visibleArrivals = currentPage === 0 ? NEW_ARRIVALS.slice(0, 8) : NEW_ARRIVALS.slice(8, 16);

  return (
    <section id="collections" className="py-24 border-b border-line bg-grain relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* ================= NEW ARRIVALS SECTION ================= */}
        <div id="new-arrivals-section" className="space-y-8">
          <div className="flex justify-between items-end border-b border-line/40 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block mb-1">Freshly Carved masterpieces</span>
              <h3 className="text-2xl md:text-4xl font-display font-semibold text-ivory uppercase tracking-tight">
                New Arrivals
              </h3>
              <p className="text-xs text-ivory-dim/70 mt-1 font-medium font-sans">
                Bespoke handmade pieces ready for booking
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevPage} 
                className="w-9 h-9 rounded-full border border-line hover:border-oak hover:bg-oak/10 text-ivory hover:text-oak flex items-center justify-center transition-all cursor-pointer bg-charcoal/40"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNextPage} 
                className="w-9 h-9 rounded-full border border-line hover:border-oak hover:bg-oak/10 text-ivory hover:text-oak flex items-center justify-center transition-all cursor-pointer bg-charcoal/40"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Products Grid with beautiful slide transition */}
          <div className="overflow-hidden relative p-1">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={currentPage}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              >
                {visibleArrivals.map((item) => (
                  <div
                    key={item.id}
                    className="group box-gradient rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between border border-line hover:border-oak/40"
                  >
                    <div className="relative aspect-video overflow-hidden bg-stone-950">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      {item.status === 'Sold Out' ? (
                        <span className="absolute top-3 right-3 bg-walnut text-[9px] text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-oak/30">
                          Sold Out
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 bg-[#151309]/80 backdrop-blur-md text-[9px] text-oak px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-line">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <h4 className="text-xs md:text-sm font-semibold text-ivory leading-snug group-hover:text-oak transition-colors min-h-[40px] font-sans">
                        {item.name}
                      </h4>
                      {item.status === 'Sold Out' ? (
                        <button 
                          onClick={() => handleOpenInquiry(`${item.name} (Backorder Request)`)} 
                          className="w-full py-2 border border-line text-ivory-dim/60 hover:text-white hover:border-oak hover:bg-oak/10 text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg cursor-pointer"
                        >
                          Backorder Query
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleOpenInquiry(item.name)} 
                          className="w-full py-2 border-2 border-oak hover:bg-oak hover:text-charcoal text-oak text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg cursor-pointer"
                        >
                          Call For Price
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================= SHOWROOM SEGMENTS SECTION ================= */}
        <div id="catalog-grid" className="space-y-8 scroll-mt-24 pt-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block">Shop by Room</span>
            <h3 className="text-3xl md:text-5xl font-display font-semibold text-ivory">
              Explore Showroom Segments
            </h3>
            <p className="text-ivory-dim/70 text-xs md:text-sm font-sans max-w-2xl mx-auto leading-relaxed">
              Aap k luxury visual reference k mutabiq har category ko real-world catalogs, item structures aur custom option grids k sath configure kia gya hai.
            </p>
          </div>

          {/* Custom Elegant Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOWROOM_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                onClick={() => handleCategoryAction(cat)}
                className="group cursor-pointer box-gradient rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-line"
              >
                <div className="relative h-64 overflow-hidden bg-stone-950">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-walnut text-ivory text-[10px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-oak/30">
                    {cat.subtitle}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-lg md:text-xl font-display font-semibold text-ivory tracking-wide group-hover:text-oak transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-ivory-dim/70 text-xs leading-relaxed font-sans min-h-[48px]">
                      {cat.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2.5 py-0.5 bg-charcoal/85 border border-line text-ivory-dim/65 rounded text-[9px] font-medium font-sans group-hover:border-oak/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button className="w-full py-3 bg-charcoal hover:bg-oak hover:text-charcoal border border-line text-ivory-dim group-hover:border-oak rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300">
                    {cat.categoryKey === 'interior-services' ? 'View Services' : 'View Full Collection'} &rarr;
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= TRUST BADGES SEGMENT ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-line/40">
          <div className="text-center p-4 space-y-2">
            <div className="text-oak font-display text-3xl font-semibold">100%</div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-ivory">Premium Hardwood</h5>
            <p className="text-ivory-dim/60 text-[11px] font-sans">Strictly use seasoned Sheesham & Golden Teak.</p>
          </div>
          <div className="text-center p-4 space-y-2">
            <div className="text-oak font-display text-3xl font-semibold">15 Year</div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-ivory">Termite Warranty</h5>
            <p className="text-ivory-dim/60 text-[11px] font-sans">Advanced pressure chemical kiln treatment.</p>
          </div>
          <div className="text-center p-4 space-y-2">
            <div className="text-oak font-display text-3xl font-semibold">Custom</div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-ivory">Made To Order</h5>
            <p className="text-ivory-dim/60 text-[11px] font-sans">Sizing & fabrics adjusted perfectly to your layout.</p>
          </div>
          <div className="text-center p-4 space-y-2">
            <div className="text-oak font-display text-3xl font-semibold">Safe</div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-ivory">Transit Padding</h5>
            <p className="text-ivory-dim/60 text-[11px] font-sans">Free delivery with absolute doorstep fitting.</p>
          </div>
        </div>

      </div>

      {/* ================= INQUIRY MODAL ================= */}
      <AnimatePresence>
        {activeInquiryItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseInquiry}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs"
            />

            {/* Modal Wrapper */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#151309] text-ivory shadow-2xl border border-oak/35 p-6 md:p-8 z-10 font-sans"
            >
              {/* Close Button */}
              <button 
                onClick={handleCloseInquiry} 
                className="absolute top-4 right-4 p-2 text-ivory-dim/50 hover:text-oak transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Heading */}
              <div className="space-y-2 mb-6 text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest text-oak uppercase">
                  Customization Inquiry
                </span>
                <h2 className="text-xl md:text-2xl font-display font-semibold text-ivory">
                  Inquire & Request Bespoke Quote
                </h2>
                <p className="text-xs text-ivory-dim/70 leading-relaxed">
                  Aap k selected variant, dimensions aur polish instructions ke mutabiq hamari team real-world quotation aur delivery timeline provide karegi.
                </p>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                    Selected Item Variant
                  </label>
                  <input 
                    type="text" 
                    value={activeInquiryItem} 
                    readOnly 
                    className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs font-semibold text-oak focus:outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ali Ahmed" 
                      className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs text-ivory focus:outline-none focus:border-oak transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                      WhatsApp / Phone *
                    </label>
                    <input 
                      type="tel" 
                      required 
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="03xx xxxxxxx" 
                      className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs text-ivory focus:outline-none focus:border-oak transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                    Primary Wood Selection
                  </label>
                  <select 
                    value={woodSelection}
                    onChange={(e) => setWoodSelection(e.target.value)}
                    className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs text-ivory focus:outline-none focus:border-oak transition-colors cursor-pointer"
                  >
                    <option>Pure Sheesham Wood (Tali)</option>
                    <option>Premium Golden Teak (Sagan)</option>
                    <option>Luxury Walnut / Ash Wood combo</option>
                    <option>Solid Pine / Deodar Wood</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                    Custom Polish & Dimensional Specifications
                  </label>
                  <textarea 
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    placeholder="Write dimensional requirements (e.g., 6ft x 6.5ft), fabric choice, or polish gloss requirements..." 
                    rows={3} 
                    className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs text-ivory focus:outline-none focus:border-oak resize-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={handleCloseInquiry} 
                    className="px-5 py-2.5 bg-charcoal border border-line hover:bg-stone-900 text-ivory-dim rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-oak hover:bg-white text-charcoal font-bold rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= TOAST STATUS BANNER ================= */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            className="fixed bottom-5 right-5 bg-[#151309] text-ivory px-5 py-4 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-3 z-50 border border-oak/30"
          >
            <div className="w-5 h-5 rounded-full bg-oak/20 text-oak flex items-center justify-center border border-oak/40 font-bold">✓</div>
            <span className="font-sans">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
