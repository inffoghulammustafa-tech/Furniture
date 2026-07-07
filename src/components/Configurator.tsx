/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Hammer, Scale, Calendar, Sliders, Check, Move, Sparkles, AlertCircle } from 'lucide-react';
import { Product, CustomConfig } from '../types';
import { INITIAL_PRODUCTS, WOOD_PROPERTIES } from '../data';

interface ConfiguratorProps {
  initialSelectedProduct: Product | null;
  onAddCustomConfigToQuote: (config: CustomConfig) => void;
}

export default function Configurator({
  initialSelectedProduct,
  onAddCustomConfigToQuote
}: ConfiguratorProps) {
  // Available base products list for customization
  const customisableBases = useMemo(() => {
    return INITIAL_PRODUCTS.filter(p => p.id === 'kirana-dining' || p.id === 'marwa-bed' || p.id === 'chinar-console' || p.id === 'walnut-lounge');
  }, []);

  // Selected base product
  const [selectedBase, setSelectedBase] = useState<Product>(
    initialSelectedProduct && customisableBases.some(b => b.id === initialSelectedProduct.id)
      ? initialSelectedProduct
      : customisableBases[0]
  );

  // Sync state if initialSelectedProduct changes from parent catalog click
  useEffect(() => {
    if (initialSelectedProduct && customisableBases.some(b => b.id === initialSelectedProduct.id)) {
      setSelectedBase(initialSelectedProduct);
    }
  }, [initialSelectedProduct, customisableBases]);

  // Customizable inputs
  const [woodType, setWoodType] = useState<'Sheesham' | 'Walnut' | 'Oak'>(selectedBase.woodType as 'Sheesham' | 'Walnut' | 'Oak');
  const [widthCm, setWidthCm] = useState<number>(150);
  const [lengthCm, setLengthCm] = useState<number>(180);
  const [heightCm, setHeightCm] = useState<number>(75);
  const [finish, setFinish] = useState<'Natural Oil & Beeswax' | 'Matte Polyurethane' | 'Charcoal Stain'>('Natural Oil & Beeswax');
  const [brassInlay, setBrassInlay] = useState<boolean>(false);
  const [carvingLevel, setCarvingLevel] = useState<'None' | 'Minimal' | 'Traditional'>('None');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [isSuccessNotification, setIsSuccessNotification] = useState<boolean>(false);

  // Set default dimensions depending on the selected base product
  useEffect(() => {
    setWoodType(selectedBase.woodType as 'Sheesham' | 'Walnut' | 'Oak');
    if (selectedBase.id === 'kirana-dining') {
      setWidthCm(91);
      setLengthCm(182);
      setHeightCm(76);
    } else if (selectedBase.id === 'marwa-bed') {
      setWidthCm(195);
      setLengthCm(210);
      setHeightCm(115);
    } else if (selectedBase.id === 'chinar-console') {
      setWidthCm(38);
      setLengthCm(135);
      setHeightCm(78);
    } else if (selectedBase.id === 'walnut-lounge') {
      setWidthCm(82);
      setLengthCm(74);
      setHeightCm(78);
    }
  }, [selectedBase]);

  // Sizing limits depends on base product to avoid physical nonsense
  const sizingLimits = useMemo(() => {
    if (selectedBase.id === 'kirana-dining') {
      return {
        width: { min: 80, max: 130, label: 'Width (Width of table top)' },
        length: { min: 120, max: 280, label: 'Length (Seats up to 10)' },
        height: { min: 70, max: 80, label: 'Height (Standard clearance)' }
      };
    } else if (selectedBase.id === 'marwa-bed') {
      return {
        width: { min: 100, max: 220, label: 'Width (Mattress boundary)' },
        length: { min: 180, max: 230, label: 'Length (Pillow boundary)' },
        height: { min: 90, max: 140, label: 'Headboard Height' }
      };
    } else if (selectedBase.id === 'chinar-console') {
      return {
        width: { min: 30, max: 50, label: 'Depth (Distance from wall)' },
        length: { min: 90, max: 180, label: 'Length (Corridor boundary)' },
        height: { min: 70, max: 90, label: 'Height' }
      };
    } else { // walnut-lounge
      return {
        width: { min: 70, max: 110, label: 'Seating Width' },
        length: { min: 65, max: 95, label: 'Seating Depth' },
        height: { min: 70, max: 90, label: 'Backrest Height' }
      };
    }
  }, [selectedBase]);

  // Real-time Dynamic Math Calculator (timber weights + customized pricing)
  const stats = useMemo(() => {
    // 1. Wood multiplier coefficients
    const woodMultipliers = { Sheesham: 1.0, Oak: 1.12, Walnut: 1.28 };
    const multiplier = woodMultipliers[woodType];

    // 2. Base volume scale ratio
    let baseVolume = 1;
    if (selectedBase.id === 'kirana-dining') baseVolume = 91 * 182 * 76;
    else if (selectedBase.id === 'marwa-bed') baseVolume = 195 * 210 * 115;
    else if (selectedBase.id === 'chinar-console') baseVolume = 38 * 135 * 78;
    else if (selectedBase.id === 'walnut-lounge') baseVolume = 82 * 74 * 78;

    const currentVolume = widthCm * lengthCm * heightCm;
    const volumeRatio = currentVolume / baseVolume;

    // 3. Price build-up
    let finalPrice = selectedBase.price * volumeRatio * multiplier;

    // Add finishing cost
    if (finish === 'Matte Polyurethane') finalPrice += 8000;
    if (finish === 'Charcoal Stain') finalPrice += 12000;

    // Add carving details
    if (brassInlay) finalPrice += 15000;
    if (carvingLevel === 'Minimal') finalPrice += 18000;
    if (carvingLevel === 'Traditional') finalPrice += 32000;

    // Cap minimum floor price to baseline
    finalPrice = Math.max(selectedBase.price * 0.7, finalPrice);

    // 4. Weight Calculation (Solid timber coefficients)
    // Wood density in g/cm3: Sheesham 0.82, Oak 0.74, Walnut 0.65
    // Scale density metric to structural volume
    const woodDensities = { Sheesham: 0.00042, Oak: 0.00038, Walnut: 0.00034 };
    const structuralVolumeWeight = (widthCm * lengthCm * heightCm) * woodDensities[woodType];
    
    // Scale structural density relative to base design weight
    let defaultWeight = 50;
    if (selectedBase.id === 'kirana-dining') defaultWeight = 72;
    else if (selectedBase.id === 'marwa-bed') defaultWeight = 94;
    else if (selectedBase.id === 'chinar-console') defaultWeight = 38;
    else if (selectedBase.id === 'walnut-lounge') defaultWeight = 16;

    const calculatedWeight = Math.round(defaultWeight * (structuralVolumeWeight / (baseVolume * woodDensities[selectedBase.woodType as 'Sheesham' | 'Walnut' | 'Oak'])));

    // 5. Estimated Lead Time depending on details
    let leadWeeks = 5;
    if (selectedBase.id === 'marwa-bed') leadWeeks = 8;
    if (selectedBase.id === 'kirana-dining') leadWeeks = 6;
    if (carvingLevel === 'Traditional') leadWeeks += 3;
    if (carvingLevel === 'Minimal') leadWeeks += 1;
    if (finish !== 'Natural Oil & Beeswax') leadWeeks += 1;

    return {
      price: Math.round(finalPrice),
      weight: Math.max(10, calculatedWeight),
      weeks: leadWeeks
    };
  }, [selectedBase, woodType, widthCm, lengthCm, heightCm, finish, brassInlay, carvingLevel]);

  // Submission handler to add to Quote Basket
  const handleAddToBasket = () => {
    const config: CustomConfig = {
      id: `custom-${Date.now()}`,
      baseProductId: selectedBase.id,
      baseProductName: selectedBase.name,
      woodType,
      widthCm,
      lengthCm,
      heightCm,
      finish,
      brassInlay,
      carvingLevel,
      specialNotes: specialNotes.trim() || undefined,
      calculatedPrice: stats.price,
      calculatedWeightKg: stats.weight,
      estimatedWeeks: stats.weeks
    };

    onAddCustomConfigToQuote(config);
    setIsSuccessNotification(true);
    setSpecialNotes('');

    setTimeout(() => {
      setIsSuccessNotification(false);
    }, 4000);
  };

  // Wood colors for preview mockup representation
  const woodColorTheme = {
    Sheesham: {
      bg: 'bg-[#5c3c26]',
      border: 'border-[#7d5234]',
      hex: '#5c3c26',
      ambientGlow: 'rgba(125, 82, 52, 0.15)'
    },
    Walnut: {
      bg: 'bg-[#3b2a21]',
      border: 'border-[#513b2e]',
      hex: '#3b2a21',
      ambientGlow: 'rgba(81, 59, 46, 0.15)'
    },
    Oak: {
      bg: 'bg-[#8c7050]',
      border: 'border-[#ab8b65]',
      hex: '#8c7050',
      ambientGlow: 'rgba(171, 139, 101, 0.15)'
    }
  };

  return (
    <section id="configurator" className="py-24 border-b border-line bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block mb-3">Custom Atelier</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ivory">
              Design your bespoke heirloom
            </h2>
          </div>
          <p className="text-ivory-dim text-sm sm:text-base max-w-sm font-sans leading-relaxed">
            Specify timber dimensions, premium wood species, and artisanal finishing. Watch your price and lead-time update in real time.
          </p>
        </div>

        {/* Builder Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* LEFT PANEL: Live Interactive Visual Preview (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-charcoal/40 border border-line p-6 md:p-8 relative">
            {/* Elegant corner lines */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-oak/20" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-oak/20" />

            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-oak block mb-2">Bespoke Blueprint Preview</span>
              <h4 className="font-display text-lg font-medium text-ivory mb-6">
                Custom {selectedBase.name} — Spec: {woodType}
              </h4>

              {/* Dynamic SVG Drawing Representation */}
              <div
                className="w-full aspect-[4/3] rounded-sm flex flex-col items-center justify-center relative p-4 mb-6 border border-line/30 bg-black/40 transition-all duration-300"
                style={{ boxShadow: `inset 0 0 40px ${woodColorTheme[woodType].ambientGlow}` }}
              >
                {/* SVG Mockup elements */}
                <svg viewBox="0 0 300 200" className="w-full h-full max-h-[180px] overflow-visible">
                  {selectedBase.id === 'kirana-dining' && (
                    <g>
                      {/* Floor Line */}
                      <line x1="20" y1="170" x2="280" y2="170" stroke="rgba(240,235,225,0.15)" strokeWidth="1" />
                      
                      {/* Table Top (resizable width/length in proportions) */}
                      {/* Default table top length ratio */}
                      <rect
                        x={150 - (lengthCm * 0.45)}
                        y={170 - heightCm - 12}
                        width={lengthCm * 0.9}
                        height="12"
                        rx="2"
                        fill={woodColorTheme[woodType].hex}
                        stroke="#C89F6E"
                        strokeWidth={finish === 'Charcoal Stain' ? '1.5' : '1'}
                        opacity={finish === 'Charcoal Stain' ? '0.7' : '1'}
                        className="transition-all duration-300"
                      />

                      {/* Leg Left */}
                      <rect
                        x={150 - (lengthCm * 0.45) + 15}
                        y={170 - heightCm}
                        width="14"
                        height={heightCm}
                        fill={woodColorTheme[woodType].hex}
                        stroke="#C89F6E"
                        strokeWidth="1"
                        opacity="0.9"
                        className="transition-all duration-300"
                      />

                      {/* Leg Right */}
                      <rect
                        x={150 + (lengthCm * 0.45) - 29}
                        y={170 - heightCm}
                        width="14"
                        height={heightCm}
                        fill={woodColorTheme[woodType].hex}
                        stroke="#C89F6E"
                        strokeWidth="1"
                        opacity="0.9"
                        className="transition-all duration-300"
                      />

                      {/* Carving level visual strip if selected */}
                      {carvingLevel !== 'None' && (
                        <rect
                          x={150 - (lengthCm * 0.45) + 2}
                          y={170 - heightCm - 10}
                          width={lengthCm * 0.9 - 4}
                          height="4"
                          fill="none"
                          stroke={carvingLevel === 'Traditional' ? '#E5DDCC' : '#C89F6E'}
                          strokeDasharray="2,2"
                          strokeWidth="1"
                        />
                      )}

                      {/* Dimensions Annotation labels */}
                      <text x="150" y={170 - heightCm - 24} textAnchor="middle" fill="#C89F6E" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="0.5">
                        {lengthCm}cm (L) x {widthCm}cm (W)
                      </text>
                      <text x="20" y="100" textAnchor="middle" fill="#6B7654" fontSize="8" fontFamily="JetBrains Mono" transform="rotate(-90 20 100)">
                        Height: {heightCm}cm
                      </text>
                    </g>
                  )}

                  {selectedBase.id === 'marwa-bed' && (
                    <g>
                      {/* Floor Line */}
                      <line x1="20" y1="170" x2="280" y2="170" stroke="rgba(240,235,225,0.15)" strokeWidth="1" />

                      {/* Headboard */}
                      <rect
                        x="40"
                        y={170 - heightCm}
                        width="16"
                        height={heightCm}
                        rx="2"
                        fill={woodColorTheme[woodType].hex}
                        stroke="#C89F6E"
                        strokeWidth="1"
                        className="transition-all duration-300"
                      />

                      {/* Bed frame mattress base */}
                      <rect
                        x="56"
                        y="135"
                        width={lengthCm * 0.8}
                        height="20"
                        rx="1"
                        fill={woodColorTheme[woodType].hex}
                        stroke="#C89F6E"
                        strokeWidth="1"
                        className="transition-all duration-300"
                      />

                      {/* Mattress */}
                      <rect
                        x="62"
                        y="110"
                        width={lengthCm * 0.8 - 12}
                        height="25"
                        rx="2"
                        fill="#F0EBE1"
                        opacity="0.8"
                        className="transition-all duration-300"
                      />

                      {/* Bed Legs */}
                      <rect x="50" y="170" width="8" fill="#C89F6E" />
                      <rect x={56 + (lengthCm * 0.8) - 16} y="155" width="8" height="15" fill={woodColorTheme[woodType].hex} stroke="#C89F6E" />

                      {/* Carving details */}
                      {carvingLevel !== 'None' && (
                        <line x1="48" y1={170 - heightCm + 15} x2="48" y2="150" stroke="#C89F6E" strokeDasharray="2,2" strokeWidth="1" />
                      )}

                      {/* Annotations */}
                      <text x="150" y="90" textAnchor="middle" fill="#C89F6E" fontSize="9" fontFamily="JetBrains Mono">
                        L: {lengthCm}cm x W: {widthCm}cm
                      </text>
                      <text x="25" y="110" textAnchor="middle" fill="#6B7654" fontSize="8" fontFamily="JetBrains Mono" transform="rotate(-90 25 110)">
                        Headboard: {heightCm}cm
                      </text>
                    </g>
                  )}

                  {selectedBase.id === 'chinar-console' && (
                    <g>
                      {/* Floor Line */}
                      <line x1="20" y1="170" x2="280" y2="170" stroke="rgba(240,235,225,0.15)" strokeWidth="1" />

                      {/* Console Top Box */}
                      <rect
                        x={150 - (lengthCm * 0.75)}
                        y={170 - heightCm}
                        width={lengthCm * 1.5}
                        height="30"
                        rx="1"
                        fill={woodColorTheme[woodType].hex}
                        stroke="#C89F6E"
                        strokeWidth="1"
                        className="transition-all duration-300"
                      />

                      {/* Drawers lines */}
                      <line x1={150 - (lengthCm * 0.25)} y1={170 - heightCm} x2={150 - (lengthCm * 0.25)} y2={170 - heightCm + 30} stroke="rgba(240,235,225,0.2)" />
                      <line x1={150 + (lengthCm * 0.25)} y1={170 - heightCm} x2={150 + (lengthCm * 0.25)} y2={170 - heightCm + 30} stroke="rgba(240,235,225,0.2)" />

                      {/* Console legs */}
                      <line x1={150 - (lengthCm * 0.75) + 10} y1={170 - heightCm + 30} x2={150 - (lengthCm * 0.75) + 4} y2="170" stroke="#C89F6E" strokeWidth="2.5" />
                      <line x1={150 + (lengthCm * 0.75) - 10} y1={170 - heightCm + 30} x2={150 + (lengthCm * 0.75) - 4} y2="170" stroke="#C89F6E" strokeWidth="2.5" />

                      {/* Brass inlay */}
                      {brassInlay && (
                        <rect
                          x={150 - (lengthCm * 0.75) + 4}
                          y={170 - heightCm + 24}
                          width={lengthCm * 1.5 - 8}
                          height="2"
                          fill="#C89F6E"
                        />
                      )}

                      {/* Annotations */}
                      <text x="150" y={170 - heightCm - 15} textAnchor="middle" fill="#C89F6E" fontSize="9" fontFamily="JetBrains Mono">
                        L: {lengthCm}cm x Depth: {widthCm}cm
                      </text>
                      <text x="35" y="120" textAnchor="middle" fill="#6B7654" fontSize="8" fontFamily="JetBrains Mono" transform="rotate(-90 35 120)">
                        H: {heightCm}cm
                      </text>
                    </g>
                  )}

                  {selectedBase.id === 'walnut-lounge' && (
                    <g>
                      {/* Floor Line */}
                      <line x1="20" y1="170" x2="280" y2="170" stroke="rgba(240,235,225,0.15)" strokeWidth="1" />

                      {/* Angled backrest leg frame */}
                      <line x1="100" y1="170" x2="140" y2={170 - heightCm} stroke={woodColorTheme[woodType].hex} strokeWidth="6" strokeLinecap="round" className="transition-all duration-300" />
                      <line x1="100" y1="170" x2="140" y2={170 - heightCm} stroke="#C89F6E" strokeWidth="1" strokeLinecap="round" />

                      {/* Front legs support */}
                      <line x1="160" y1="170" x2="150" y2="120" stroke={woodColorTheme[woodType].hex} strokeWidth="6" strokeLinecap="round" className="transition-all duration-300" />
                      <line x1="160" y1="170" x2="150" y2="120" stroke="#C89F6E" strokeWidth="1" strokeLinecap="round" />

                      {/* Seat base (width affects it) */}
                      <line x1="105" y1="130" x2="185" y2="122" stroke={woodColorTheme[woodType].hex} strokeWidth="8" strokeLinecap="round" className="transition-all duration-300" />
                      <line x1="105" y1="130" x2="185" y2="122" stroke="#C89F6E" strokeWidth="1.5" strokeLinecap="round" />

                      {/* Cushion / Webbing representation */}
                      <line x1="112" y1="129" x2="178" y2="121" stroke="#F0EBE1" strokeWidth="5" strokeLinecap="round" opacity="0.8" />

                      {/* Annotations */}
                      <text x="150" y="80" textAnchor="middle" fill="#C89F6E" fontSize="9" fontFamily="JetBrains Mono">
                        Seat Depth: {lengthCm}cm x Seat Width: {widthCm}cm
                      </text>
                      <text x="45" y="110" textAnchor="middle" fill="#6B7654" fontSize="8" fontFamily="JetBrains Mono" transform="rotate(-90 45 110)">
                        Backrest H: {heightCm}cm
                      </text>
                    </g>
                  )}
                </svg>

                {/* Wood color sample swatch dot */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full ${woodColorTheme[woodType].bg} border border-oak/40`} />
                  <span className="text-[10px] font-mono text-ivory-dim">{woodType} Heartwood</span>
                </div>
              </div>
            </div>

            {/* Calculations specs dashboard */}
            <div className="border-t border-line/70 pt-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2.5 items-center">
                  <div className="bg-line p-2 rounded-sm text-oak">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-ivory-dim/60 block font-sans">Est. Mass Weight</span>
                    <span className="text-sm font-semibold font-mono text-ivory">~ {stats.weight} kg</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center">
                  <div className="bg-line p-2 rounded-sm text-oak">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-ivory-dim/60 block font-sans">Artisan Build Time</span>
                    <span className="text-sm font-semibold font-mono text-ivory">{stats.weeks} Weeks</span>
                  </div>
                </div>
              </div>

              {/* Price Indicator */}
              <div className="bg-line/40 p-4 border border-line flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-sage font-mono block">Estimated Custom Quote</span>
                  <span className="text-2xl font-bold font-mono text-oak mt-1 block">
                    Rs. {stats.price.toLocaleString()}
                  </span>
                </div>
                <div className="text-right text-[10px] text-ivory-dim/60 font-mono">
                  <span>Excludes Delivery</span>
                  <span className="block">100% Solid Solid Wood</span>
                </div>
              </div>

              {/* Add to Cart Quote Button */}
              <button
                onClick={handleAddToBasket}
                className="w-full py-4 bg-oak hover:bg-ivory text-charcoal font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Hammer className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform" />
                Add Customized Design to Quote Basket
              </button>

              {/* Success Notification message */}
              {isSuccessNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-sage/20 border border-sage text-sage p-3 text-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Successfully saved custom configuration into your Quote Basket.</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Sizing Inputs & Options (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-charcoal/30 border border-line p-6 md:p-8">
            <div>
              {/* Base Design selection */}
              <div className="mb-8">
                <label className="block text-[11px] uppercase tracking-widest text-sage font-mono mb-3">
                  1. Select Base Woodwork Template
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {customisableBases.map((base) => (
                    <button
                      key={base.id}
                      onClick={() => setSelectedBase(base)}
                      className={`p-3 border text-left flex flex-col justify-between transition-all duration-300 h-24 ${
                        selectedBase.id === base.id
                          ? 'border-oak bg-line/20'
                          : 'border-line hover:border-ivory-dim/40 bg-transparent'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-sage uppercase">{base.category.replace('-', ' ')}</span>
                      <span className="text-xs font-semibold text-ivory font-display line-clamp-2 leading-tight">
                        {base.name.replace(' Table', '').replace(' Frame', '').replace(' Table', '')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timber selections */}
              <div className="mb-8">
                <label className="block text-[11px] uppercase tracking-widest text-sage font-mono mb-3">
                  2. Timber Wood Species Choice
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Sheesham', 'Walnut', 'Oak'] as const).map((timber) => {
                    const selectedTimberInfo = WOOD_PROPERTIES[timber];
                    return (
                      <button
                        key={timber}
                        onClick={() => setWoodType(timber)}
                        className={`p-4 border text-left transition-all duration-300 relative ${
                          woodType === timber ? 'border-oak bg-line/20' : 'border-line hover:border-ivory-dim/40'
                        }`}
                      >
                        {woodType === timber && (
                          <span className="absolute top-3 right-3 bg-oak text-charcoal p-0.5 rounded-full">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                        <span className="block text-xs font-semibold text-ivory">{timber}</span>
                        <span className="block text-[9px] font-mono text-oak mt-1 uppercase">{selectedTimberInfo.hardness.split(' ')[0]}</span>
                        <p className="text-[10px] text-ivory-dim/70 mt-2 line-clamp-2 font-sans">
                          {selectedTimberInfo.colorRange}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Dimensions sliders */}
              <div className="mb-8 border-t border-line/50 pt-6">
                <label className="block text-[11px] uppercase tracking-widest text-sage font-mono mb-5 flex justify-between">
                  <span>3. Fine-Tune Dimensions (Custom cm Sizing)</span>
                  <span className="text-xs text-oak font-normal flex items-center gap-1">
                    <Sliders className="w-3 h-3" /> Bespoke measurements
                  </span>
                </label>

                <div className="space-y-6">
                  {/* Length Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="text-ivory-dim font-sans">{sizingLimits.length.label}</span>
                      <span className="font-mono text-oak font-semibold">{lengthCm} cm</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-ivory-dim/40">{sizingLimits.length.min}cm</span>
                      <input
                        type="range"
                        min={sizingLimits.length.min}
                        max={sizingLimits.length.max}
                        value={lengthCm}
                        onChange={(e) => setLengthCm(Number(e.target.value))}
                        className="flex-1 accent-oak h-1 bg-line rounded-lg cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-ivory-dim/40">{sizingLimits.length.max}cm</span>
                    </div>
                  </div>

                  {/* Width Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="text-ivory-dim font-sans">{sizingLimits.width.label}</span>
                      <span className="font-mono text-oak font-semibold">{widthCm} cm</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-ivory-dim/40">{sizingLimits.width.min}cm</span>
                      <input
                        type="range"
                        min={sizingLimits.width.min}
                        max={sizingLimits.width.max}
                        value={widthCm}
                        onChange={(e) => setWidthCm(Number(e.target.value))}
                        className="flex-1 accent-oak h-1 bg-line rounded-lg cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-ivory-dim/40">{sizingLimits.width.max}cm</span>
                    </div>
                  </div>

                  {/* Height Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="text-ivory-dim font-sans">{sizingLimits.height.label}</span>
                      <span className="font-mono text-oak font-semibold">{heightCm} cm</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-ivory-dim/40">{sizingLimits.height.min}cm</span>
                      <input
                        type="range"
                        min={sizingLimits.height.min}
                        max={sizingLimits.height.max}
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="flex-1 accent-oak h-1 bg-line rounded-lg cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-ivory-dim/40">{sizingLimits.height.max}cm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Finishing choice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 border-t border-line/50 pt-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-sage font-mono mb-3">
                    4. Polish & Wax Finishing
                  </label>
                  <select
                    value={finish}
                    onChange={(e) => setFinish(e.target.value as any)}
                    className="w-full bg-charcoal border border-line py-2.5 px-4 text-sm text-ivory focus:outline-none focus:border-oak"
                  >
                    <option value="Natural Oil & Beeswax">Natural Oil & Beeswax (+Rs. 0)</option>
                    <option value="Matte Polyurethane">Matte Protective Polyurethane (+Rs. 8,000)</option>
                    <option value="Charcoal Stain">Dark Aged Charcoal Stain (+Rs. 12,000)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-sage font-mono mb-3">
                    5. Handcarving & Embellishments
                  </label>
                  <select
                    value={carvingLevel}
                    onChange={(e) => setCarvingLevel(e.target.value as any)}
                    className="w-full bg-charcoal border border-line py-2.5 px-4 text-sm text-ivory focus:outline-none focus:border-oak"
                  >
                    <option value="None">None (Pure Raw Timber lines) (+Rs. 0)</option>
                    <option value="Minimal">Minimal geometric handcarvings (+Rs. 18,000)</option>
                    <option value="Traditional">Traditional full floral carvings (+Rs. 32,000)</option>
                  </select>
                </div>
              </div>

              {/* Additional options checkboses */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
                  <input
                    type="checkbox"
                    checked={brassInlay}
                    onChange={(e) => setBrassInlay(e.target.checked)}
                    className="mt-0.5 accent-oak w-4 h-4"
                  />
                  <div>
                    <span className="text-ivory font-medium flex items-center gap-1.5">
                      Add artisanal raw brass inlay wire strips (+Rs. 15,000)
                      <Sparkles className="w-3.5 h-3.5 text-oak" />
                    </span>
                    <p className="text-ivory-dim/60 mt-0.5 font-sans text-[11px]">
                      Authentic solid brass wire borders melted and embedded flush into the timber grain before sanding.
                    </p>
                  </div>
                </label>
              </div>

              {/* Special notes request form */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-sage font-mono mb-2">
                  6. Special Workshop Instructions (Optional notes)
                </label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Please select planks with matching continuous straight grains, or adjust seat height slightly..."
                  className="w-full bg-charcoal/50 border border-line p-3 text-xs text-ivory placeholder-ivory-dim/40 h-20 focus:outline-none focus:border-oak transition-colors font-sans resize-none"
                  maxLength={400}
                />
              </div>
            </div>

            {/* Note about bespoke structural physics limitations */}
            <div className="border-t border-line/30 pt-4 flex gap-2 items-start text-[10px] text-sage font-mono leading-relaxed mt-4">
              <AlertCircle className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
              <span>
                NOTICE: Our ustad karigars maintain physical structural integrity bounds. Sizing sliders are restricted within scientifically validated safe load-bearing limits. For extreme customization, speak to the workshop directly via our AI wood advisor.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
