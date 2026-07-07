/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Trees, Compass, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenCustomizer: () => void;
}

const sliderSlides = [
  {
    title: "Wall Art & Tailored Curtains",
    sub: "Design-Driven Wall Decor & Curtains",
    desc: "Add personality and purpose to your living space with our stunning wall arts, curtains and modern TV units.",
    image: "https://i.pinimg.com/1200x/70/fd/79/70fd7913c1cb6947e677859f18af41e6.jpg",
    inquiryTag: "Wall Art & Tailored Curtains (Premium Custom Package)"
  },
  {
    title: "Minimal Modern Kitchens",
    sub: "Cozy Light White-Wood Corner Layout",
    desc: "Premium modular layouts featuring white upper lacquer cabinets and warm light-oak frames for an bright and inviting cooking area.",
    image: "https://i.pinimg.com/736x/23/9d/c8/239dc8f2a6b5fb220a1c04172a70b35b.jpg",
    inquiryTag: "Cozy Light White-Wood Kitchen Layout"
  },
  {
    title: "Luxury Solid Wood Doors",
    sub: "High-Gloss Lacquered Entrance Masterpieces",
    desc: "Grand hand-polished double entry doors featuring durable security glass grids, beautiful casing details and solid core structure.",
    image: "https://i.pinimg.com/736x/c7/3f/5c/c73f5c7a5f123abf05e8b52c09f7a363.jpg",
    inquiryTag: "Luxury High-Gloss Front Main Door"
  },
  {
    title: "Galaxy Blue Master Bed",
    sub: "Royal Blue Tufted Velvet Panel Suite",
    desc: "Bespoke royal blue tufted king bed layout complete with a velvet headboard accent wall and an illuminated starry galaxy drop ceiling.",
    image: "https://i.pinimg.com/736x/ec/51/40/ec51406e212aded03a0c2b45ba4aa322.jpg",
    inquiryTag: "Galaxy Starry Ceiling Blue Master Bed"
  }
];

export default function Hero({ onExploreCatalog, onOpenCustomizer }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItemName, setModalItemName] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [woodSelection, setWoodSelection] = useState("Pure Sheesham Wood (Tali)");
  const [customSpecs, setCustomSpecs] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto Slider Timer: Resets whenever currentSlideIndex changes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % sliderSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % sliderSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + sliderSlides.length) % sliderSlides.length);
  };

  const setSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    
    // Reset fields
    setClientName("");
    setClientPhone("");
    setCustomSpecs("");

    // Show success toast
    setToastMessage("Shukriya! Custom quotation request received. Our team will contact you via WhatsApp shortly.");
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <section id="home" className="relative pt-24 pb-8 overflow-hidden bg-grain min-h-[550px] sm:min-h-[650px] lg:min-h-[720px] flex items-center justify-center">
      {/* Immersive Full-Width Slider Container matching user's visual reference */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full z-10">
        <motion.div
          key={currentSlideIndex}
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1917] to-[#0c0a09] text-white min-h-[500px] sm:min-h-[580px] lg:min-h-[600px] flex flex-col justify-between p-6 sm:p-10 md:p-12 shadow-2xl border border-stone-800 transition-all duration-700 animate-fade-in"
        >
          {/* Parallax Fixed Background Image Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-25 pointer-events-none transition-all duration-700 z-0"
            style={{ backgroundImage: `url('${sliderSlides[currentSlideIndex].image}')` }}
          />

          {/* Top Badge Row */}
          <div className="relative z-10 flex justify-between items-center w-full">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span> Flagship Showcase
            </span>
            {/* Image Count has been removed per user request */}
          </div>

          {/* Central content - Grid layout for perfect split screen view & image visibility */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full my-auto py-4">
            {/* Left column: Text info */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] font-bold tracking-tight drop-shadow-lg text-white">
                {sliderSlides[currentSlideIndex].title}
              </h2>
              
              {/* Split layout translucent card */}
              <div className="flex bg-stone-900/90 backdrop-blur-md rounded-2xl border border-white/10 max-w-lg w-full overflow-hidden shadow-2xl text-left">
                {/* Left text portion */}
                <div className="p-5 sm:p-6 flex-1 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest">
                    {sliderSlides[currentSlideIndex].sub}
                  </h4>
                  <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                    {sliderSlides[currentSlideIndex].desc}
                  </p>
                  <button
                    onClick={() => {
                      setModalItemName(sliderSlides[currentSlideIndex].inquiryTag);
                      setIsModalOpen(true);
                    }}
                    className="text-[10px] font-bold text-white uppercase tracking-wider border-b border-white hover:text-amber-400 hover:border-amber-400 transition-colors pb-0.5 inline-block cursor-pointer"
                  >
                    VIEW MORE
                  </button>
                </div>
                
                {/* Right control stripe with vertically stacked chevrons */}
                <div className="w-14 border-l border-white/10 flex flex-col">
                  {/* Next button on top */}
                  <button
                    onClick={nextSlide}
                    className="flex-1 flex items-center justify-center hover:bg-amber-600/20 text-white border-b border-white/10 transition-colors cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  {/* Prev button on bottom */}
                  <button
                    onClick={prevSlide}
                    className="flex-1 flex items-center justify-center hover:bg-amber-600/20 text-white transition-colors cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right column: Image is displayed completely and beautifully with a larger size */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] aspect-[4/5] bg-stone-900/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center p-2 sm:p-3">
                <img
                  src={sliderSlides[currentSlideIndex].image}
                  alt={sliderSlides[currentSlideIndex].title}
                  className="max-w-full max-h-full object-contain rounded-2xl hover:scale-[1.03] transition-transform duration-500 shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Bottom row: elegant pagination dots */}
          <div className="relative z-10 flex justify-end items-center w-full">
            <div className="flex gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 shadow-lg">
              {sliderSlides.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setSlide(idx)}
                  className={`cursor-pointer transition-all rounded-full ${
                    idx === currentSlideIndex
                      ? 'w-6 h-2 bg-amber-500'
                      : 'w-2 h-2 bg-stone-600 hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
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
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              className="relative w-full max-w-lg bg-[#181613] rounded-3xl border border-stone-800 p-8 text-left shadow-2xl z-10 text-ivory font-sans"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Heading */}
              <div className="space-y-2 mb-6">
                <h3 className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">Consultation Setup</h3>
                <h2 className="text-2xl font-display font-semibold text-white">Inquire & Request Bespoke Quote</h2>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  Aap k selected variant, dimensions aur polish instructions ke mutabiq hamari team real-world quotation aur delivery timeline provide karegi.
                </p>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs text-stone-300">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">Selected Item Variant</label>
                  <input
                    type="text"
                    value={modalItemName}
                    readOnly
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
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-400 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow font-bold cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1e1c18] border border-amber-600 p-4 shadow-2xl text-xs z-50 flex items-center gap-3 font-sans rounded-md min-w-[280px]"
          >
            <div className="w-5 h-5 rounded-full bg-amber-600/20 text-amber-500 flex items-center justify-center border border-amber-600/50">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-white font-medium flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grain wave divider line */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg className="relative block w-full h-[40px]" viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path className="fill-none stroke-oak/30 stroke-[1]" d="M0,20 Q150,5 300,20 T600,20 T900,20 T1200,20" />
        </svg>
      </div>
    </section>
  );
}
