/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sofa, Bed, Utensils, Trees } from 'lucide-react';

interface CollectionsProps {
  onSelectCollection: (category: string) => void;
}

export default function Collections({ onSelectCollection }: CollectionsProps) {
  const categories = [
    {
      id: 'living-room',
      num: '01',
      title: 'Living Room',
      icon: <Sofa className="w-5 h-5 text-oak" />,
      image: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?w=600&q=80',
      count: '42 pieces',
      tagline: 'Sculptured lounge chairs, side credenzas, and executive desks.'
    },
    {
      id: 'dining',
      num: '02',
      title: 'Dining Area',
      icon: <Utensils className="w-5 h-5 text-oak" />,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
      count: '28 pieces',
      tagline: 'Continuous heartwood dining tables, benches, and storage sideboards.'
    },
    {
      id: 'bedroom',
      num: '03',
      title: 'Master Bedroom',
      icon: <Bed className="w-5 h-5 text-oak" />,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80',
      count: '36 pieces',
      tagline: 'Solid mortised bed frames, grand closets, and side bedside drawers.'
    },
    {
      id: 'outdoor',
      num: '04',
      title: 'Veranda & Outdoor',
      icon: <Trees className="w-5 h-5 text-oak" />,
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
      count: '17 pieces',
      tagline: 'Naturally seasoned, weather-treated white oak benches and tables.'
    }
  ];

  return (
    <section id="collections" className="py-24 border-b border-line bg-charcoal/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block mb-3">Shop by Room</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold max-w-xl text-ivory">
              Four collections, one standard: solid wood, no compromises.
            </h2>
          </div>
          <p className="text-ivory-dim text-sm sm:text-base max-w-sm font-sans leading-relaxed">
            Click on any room collection below to automatically view our available catalog pieces and custom building options.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => onSelectCollection(cat.id)}
              className="group cursor-pointer relative aspect-[3/4] bg-walnut overflow-hidden border border-line hover:border-oak/40 transition-colors duration-300"
              id={`cat-card-${cat.id}`}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700 ease-out"
              />

              {/* Gradient cover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />

              {/* Inner thin wood border outline */}
              <div className="absolute inset-3 border border-ivory/10 pointer-events-none group-hover:border-oak/30 transition-colors duration-300" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-semibold text-oak">{cat.num}</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal/80 p-2 rounded-full border border-line">
                    {cat.icon}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-ivory mb-2 group-hover:text-oak transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-ivory-dim leading-relaxed mb-3 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.tagline}
                  </p>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sage border-b border-sage/30 pb-0.5">
                    {cat.count}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
