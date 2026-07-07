/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Flame, Hammer, Compass, Trees, Award, Info } from 'lucide-react';

interface Stage {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
  quote: string;
}

export default function Craftsmanship() {
  const stages: Stage[] = [
    {
      id: 'timber',
      num: '01',
      title: 'Timber Select & Air Seasoning',
      shortDesc: 'Each plank is graded by moisture contents and growth rings before reaching a saw.',
      longDesc: 'Our karigars select center-cut heartwood from older timbers. We strictly avoid fast-grown plantation timber, which has high sapwood ratios and low stability. Planks are stacked in our Lahore yard with custom spacers to air-season for up to 18 months, reducing internal strain before final vacuum kiln-drying to precisely 8.2% moisture content.',
      icon: <Trees className="w-5 h-5 text-oak" />,
      quote: "A table made of stressed timber will twist itself apart within two monsoons. True seasoning takes patience.",
      specs: [
        { label: 'Ideal Moisture Target', value: '8% to 9% (Karachi stability bound)' },
        { label: 'Timber Grade Select', value: 'FAS (First and Seconds) prime raw heartwood' },
        { label: 'Plank Thickness', value: 'Full-thickness 40mm continuous slabs' }
      ]
    },
    {
      id: 'joinery',
      num: '02',
      title: 'Traditional Wood Joinery',
      shortDesc: 'No staples, no chipboard, no hidden metal nails — joints are fitted by hand.',
      longDesc: 'We rely entirely on mechanical wood-on-wood joinery. Corner connections are interlocked via deep blind sliding dovetails and through-mortise-and-tenon work. Drawbored pegging is utilized for major load bearings, allowing the solid timber to safely contract and expand dynamically according to season shifts without cracking.',
      icon: <Hammer className="w-5 h-5 text-oak" />,
      quote: "Gluing particleboard is tailorship. Cutting blind sliding dovetails is mechanical engineering in organic life.",
      specs: [
        { label: 'Primary Corner Joint', value: 'Traditional Drawbored Mortise-and-Tenon' },
        { label: 'Drawer Slides Specs', value: 'Friction-fitted wood tracks (zero metal runners)' },
        { label: 'Expansion Clearance', value: 'Floating pocket slots with brass tension clips' }
      ]
    },
    {
      id: 'finishing',
      num: '03',
      title: 'Organic Oil & Beeswax Finishes',
      shortDesc: 'Natural oil coats that soak deep, building a rich copper-amber patina over generations.',
      longDesc: 'We reject industrial glossy polyurethane lacquer sprays that seal wood plastic-tight. Instead, we sand up to 400-grit before hand-rubbing with pure food-grade linseed oils and organic beeswaxes harvested in Swat. The finish sinks deeply into the timber vessels, leaving the natural texture soft, warm, and highly breathable.',
      icon: <Flame className="w-5 h-5 text-oak" />,
      quote: "A lacquer finish looks good for two years, then cracks. An oil finish acquires its mature soul after year ten.",
      specs: [
        { label: 'Coats applied', value: '4 hand-rubbed oil coats + final beeswax polish' },
        { label: 'VOC Emission Rate', value: '0.00% (Completely food-safe, child-safe)' },
        { label: 'Patina Level', value: 'Deepens in copper-amber tones with usage age' }
      ]
    }
  ];

  const [activeStageId, setActiveStageId] = useState<string>('timber');
  const activeStage = stages.find((s) => s.id === activeStageId)!;

  return (
    <section id="craftsmanship" className="py-24 border-b border-line bg-[#1C1A17]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block mb-3">Our Atelier Philosophy</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ivory">
              Traditional joint engineering
            </h2>
          </div>
          <p className="text-ivory-dim text-sm sm:text-base max-w-sm font-sans leading-relaxed">
            No veneer sheets. No laminate composites. We build furniture using four generations of pure hand joinery.
          </p>
        </div>

        {/* Workspace interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Image with dynamic stage content (5 Columns) */}
          <div className="lg:col-span-5 relative flex flex-col justify-between overflow-hidden border border-line bg-walnut/10 aspect-[4/5] lg:aspect-auto">
            {/* Background image representative of workspace */}
            <img
              src="https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=800&q=80"
              alt="Carpenter in Lahore studio hand-planing a solid sheesham board"
              className="absolute inset-0 w-full h-full object-cover saturate-50 mix-blend-overlay opacity-30 pointer-events-none"
            />
            
            {/* Overlay framing lines */}
            <div className="absolute inset-4 border border-oak/20 pointer-events-none" />

            <div className="p-8 z-10">
              <span className="font-mono text-[10px] text-oak uppercase tracking-widest block mb-2">USTAD GUIDELINE NOTE</span>
              <p className="font-display text-lg sm:text-xl font-medium text-ivory italic leading-relaxed">
                "{activeStage.quote}"
              </p>
            </div>

            {/* Dynamic specs box at bottom of left image panel */}
            <div className="p-6 m-6 box-gradient backdrop-blur-xs z-10 text-xs rounded-xl">
              <span className="font-mono text-[9px] text-sage uppercase tracking-wider block mb-3">TECHNICAL WORKSHOP SPECS</span>
              <div className="space-y-2">
                {activeStage.specs.map((sp, idx) => (
                  <div key={idx} className="flex justify-between border-b border-line/40 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-ivory-dim/70 font-sans">{sp.label}</span>
                    <span className="text-oak font-mono text-[11px] font-semibold">{sp.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Selection & Details (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-2">
            
            {/* Stage Selector buttons */}
            <div className="space-y-4 mb-8">
              <span className="font-mono text-[10px] uppercase text-sage tracking-widest block mb-2">
                Click a stage of craftsmanship to inspect
              </span>
              
              <div className="flex flex-col gap-2">
                {stages.map((stg) => (
                  <button
                    key={stg.id}
                    onClick={() => setActiveStageId(stg.id)}
                    className={`p-4 border text-left flex items-start gap-4 transition-all duration-300 ${
                      activeStageId === stg.id
                        ? 'border-oak bg-walnut/20'
                        : 'border-line hover:border-ivory-dim/40 bg-transparent'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-oak pt-0.5">{stg.num}</span>
                    <div className="flex-1">
                      <h4 className="font-display text-sm font-semibold text-ivory flex items-center gap-1.5">
                        {stg.title}
                        {activeStageId === stg.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block animate-ping" />
                        )}
                      </h4>
                      <p className="text-[11px] text-ivory-dim/70 font-sans mt-1 line-clamp-1">
                        {stg.shortDesc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stage description details panel */}
            <div className="box-gradient p-6 md:p-8 flex-1 flex flex-col justify-between rounded-xl">
              <div>
                <span className="font-mono text-[10px] uppercase text-oak tracking-widest block mb-2">
                  Atelier stage {activeStage.num} · Detail report
                </span>
                <h3 className="font-display text-2xl font-semibold text-ivory mb-4">
                  {activeStage.title}
                </h3>
                <p className="text-ivory-dim text-xs md:text-sm leading-relaxed font-sans mb-6">
                  {activeStage.longDesc}
                </p>
              </div>

              {/* Certified mark assurance */}
              <div className="border-t border-line/60 pt-4 flex gap-3 items-start text-[11px] text-sage font-mono">
                <Award className="w-4 h-4 text-oak shrink-0" />
                <div>
                  <span className="text-ivory uppercase font-bold text-[10px] block mb-0.5">ESTABLISHED TIMBER PEDIGREE</span>
                  Guaranteed true air-seasoned heartwood timber, finished using raw chemicals-free materials. Passed ustad karigar inspection.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
