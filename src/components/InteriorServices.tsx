/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, PenTool, Layout, Check, Sparkles, Send, FileText } from 'lucide-react';

export default function InteriorServices() {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryService, setInquiryService] = useState('full-house');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 5000);
  };

  const servicesList = [
    {
      id: 'panelling',
      title: 'Architectural Timber Panelling',
      description: 'Stately floor-to-ceiling geometric acoustic wood panelling, custom milled in Sheesham or Oak. Hand-oiled to elevate commercial lounges or master bedroom backdrops.',
      icon: <Layout className="w-5 h-5 text-oak" />,
    },
    {
      id: 'fitout',
      title: 'Bespoke Full-House Fit-Outs',
      description: 'Seamless integration of custom solid timber walk-in closets, continuous corridor door portals, matching architraves, and master-crafted kitchen islands.',
      icon: <PenTool className="w-5 h-5 text-oak" />,
    },
    {
      id: 'consultancy',
      title: 'Aesthetic Spatial Consultation',
      description: 'Collaborate one-on-one with our senior architects in Lahore. Includes precise 3D spatial renders, continuous material sample boards, and live moisture seasoning reports.',
      icon: <Compass className="w-5 h-5 text-oak" />,
    }
  ];

  return (
    <section id="interior-services" className="py-24 border-b border-line bg-grain relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Info Grid */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block mb-3">ATELIER TAILORING</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ivory leading-tight">
                Architectural wood services & bespoke design layouts.
              </h2>
              <p className="text-ivory-dim text-sm sm:text-base font-sans leading-relaxed mt-4 max-w-2xl">
                We extend our woodwork expertise beyond loose furniture. Our ustad karigars collaborate directly with architects, builders, and interior designers to deliver master-class permanent installations across Pakistan.
              </p>
            </div>

            <div className="space-y-6">
              {servicesList.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 p-5 bg-charcoal/40 border border-line hover:border-oak/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 border border-line bg-charcoal flex items-center justify-center shrink-0">
                    {service.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-semibold text-ivory">
                      {service.title}
                    </h3>
                    <p className="text-xs text-ivory-dim/80 leading-relaxed font-sans">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Consultation Form Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#181613] border border-line p-8 md:p-10 relative">
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-oak text-charcoal px-3 py-1 font-mono text-[9px] uppercase tracking-widest font-bold">
                Direct Consultation
              </div>

              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold text-ivory flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-oak animate-pulse" /> Book an Interior Architect
                </h3>
                <p className="text-[11px] text-ivory-dim/70 font-sans mt-1">
                  Share your building plans or room layout below. Our senior design consultants will get back to you within 24 hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="consultation-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 font-sans text-xs"
                  >
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sage font-mono mb-1.5">
                        Your full name
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="e.g. Zainab Ahmed"
                        className="w-full bg-charcoal border border-line px-3.5 py-2.5 text-ivory focus:outline-none focus:border-oak transition-colors rounded-none placeholder-ivory-dim/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sage font-mono mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="zainab@example.com"
                        className="w-full bg-charcoal border border-line px-3.5 py-2.5 text-ivory focus:outline-none focus:border-oak transition-colors rounded-none placeholder-ivory-dim/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sage font-mono mb-1.5">
                        Service of interest
                      </label>
                      <select
                        value={inquiryService}
                        onChange={(e) => setInquiryService(e.target.value)}
                        className="w-full bg-charcoal border border-line px-3.5 py-2.5 text-ivory focus:outline-none focus:border-oak transition-colors rounded-none"
                      >
                        <option value="panelling">Architectural Timber Panelling</option>
                        <option value="full-house">Bespoke Full-House Fit-Outs</option>
                        <option value="consultancy">Aesthetic Spatial Consultation</option>
                        <option value="other">Other custom architectural project</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sage font-mono mb-1.5">
                        Tell us about your room space (optional)
                      </label>
                      <textarea
                        rows={3}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder="Describe sizes, timelines, or specific timber wood preference..."
                        className="w-full bg-charcoal border border-line px-3.5 py-2.5 text-ivory focus:outline-none focus:border-oak transition-colors rounded-none placeholder-ivory-dim/30 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-oak hover:bg-ivory text-charcoal font-semibold uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Request
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="submission-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 px-4 text-center space-y-4"
                  >
                    <div className="w-12 h-12 bg-sage/20 border border-sage/50 text-sage rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-semibold text-ivory">Request Lodged Successfully</h4>
                      <p className="text-xs text-ivory-dim/75 font-sans mt-2 max-w-xs mx-auto leading-relaxed">
                        Shukriya, <strong>{inquiryName}</strong>. Our senior spatial architect in DHA Lahore has received your blueprint files. We will contact you over email shortly.
                      </p>
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-sage border-t border-line/40 pt-4">
                      TICKET WORK-INT-2026
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
