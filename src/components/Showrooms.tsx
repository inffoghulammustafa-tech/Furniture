/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, ArrowRight, Compass } from 'lucide-react';

export default function Showrooms() {
  const showrooms = [
    {
      id: 'lahore',
      city: 'Lahore',
      name: 'The Timber Atelier Flagship',
      address: 'Sector XX, Phase 3, DHA, Lahore, Punjab',
      phone: '+92 (42) 3574-8891',
      timings: 'Mon – Sat: 11:00 AM – 9:00 PM',
      notes: 'Our primary design house. Showcasing full collections, live joinery mockups, and wood seasoning yards.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    },
    {
      id: 'karachi',
      city: 'Karachi',
      name: 'The Coastal Gallery',
      address: 'Block 4, Clifton, Karachi, Sindh',
      phone: '+92 (21) 3529-6612',
      timings: 'Mon – Sat: 12:00 PM – 10:00 PM',
      notes: 'Overlooking the ocean. Showcasing sea-air seasoned Oak collections and coastal veranda layouts.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    },
    {
      id: 'islamabad',
      city: 'Islamabad',
      name: 'The Hills Studio',
      address: 'Main Margalla Road, Sector F-7, Islamabad',
      phone: '+92 (51) 2824-3401',
      timings: 'Mon – Sat: 11:00 AM – 8:00 PM',
      notes: 'An intimate cabin experience in the heart of the capital. Specializing in high-altitude wild Walnut beds.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    }
  ];

  return (
    <section id="showrooms" className="py-24 border-b border-line bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block mb-3">VISIT OUR SPACES</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ivory">
              Experience the weight of solid wood.
            </h2>
          </div>
          <p className="text-ivory-dim text-sm sm:text-base max-w-sm font-sans leading-relaxed">
            There is no substitute for touching a hand-planed joint. Visit our designated galleries to explore seasoned timbers, grains, and finishes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {showrooms.map((showroom, idx) => (
            <motion.div
              key={showroom.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="box-gradient flex flex-col justify-between group overflow-hidden rounded-2xl"
              id={`showroom-${showroom.id}`}
            >
              <div>
                {/* Image Frame */}
                <div className="aspect-[16/10] overflow-hidden bg-walnut/10 border-b border-line relative">
                  <img
                    src={showroom.image}
                    alt={showroom.name}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-750 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-charcoal border border-line text-oak font-mono text-[10px] tracking-widest uppercase py-1 px-3">
                    {showroom.city}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ivory group-hover:text-oak transition-colors duration-200">
                      {showroom.name}
                    </h3>
                    <p className="text-xs text-ivory-dim/70 font-sans mt-2 leading-relaxed">
                      {showroom.notes}
                    </p>
                  </div>

                  <div className="space-y-3.5 border-t border-line/50 pt-5 text-xs font-sans text-ivory-dim">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                      <span>{showroom.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-oak shrink-0" />
                      <span>{showroom.timings}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-oak shrink-0" />
                      <span>{showroom.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-8 pt-0">
                <a
                  href={`https://maps.google.com/?q=Holzcraft+Furniture+${showroom.city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-line/80 hover:border-oak hover:text-oak flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all duration-300"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Get Directions <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
