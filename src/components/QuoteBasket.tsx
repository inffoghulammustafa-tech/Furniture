/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Send, FileText, Check, MapPin, Phone, Mail, User, Sparkles, Scale, Calendar } from 'lucide-react';
import { QuoteItem, CustomConfig } from '../types';
import { PAKISTAN_CITIES, INITIAL_PRODUCTS } from '../data';

interface QuoteBasketProps {
  isOpen: boolean;
  onClose: () => void;
  cart: QuoteItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onClearCart: () => void;
}

export default function QuoteBasket({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart
}: QuoteBasketProps) {
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInvoice, setSubmittedInvoice] = useState<any | null>(null);

  // Calculate totals
  const totalEstimates = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.product ? item.product.price : (item.customConfig ? item.customConfig.calculatedPrice : 0);
      return total + (price * item.quantity);
    }, 0);
  }, [cart]);

  // Calculate cargo delivery based on Pakistan Cities geography
  const deliveryQuote = useMemo(() => {
    if (!city) return 0;
    if (city === 'Lahore') return 4500; // local workshop pickup or short courier
    if (city === 'Islamabad' || city === 'Rawalpindi') return 12500; // North route
    if (city === 'Karachi' || city === 'Hyderabad') return 24000; // South route (requires heavy long-haul sea-crate packing)
    return 16500; // Other cities (Peshawar, Quetta, Multan, Faisalabad, etc.)
  }, [city]);

  // Calculate maximum lead time
  const maxLeadTimeWeeks = useMemo(() => {
    return cart.reduce((max, item) => {
      let itemWeeks = 4;
      if (item.product) {
        // extract numerical week from string (e.g. "6-8 Weeks" -> 8)
        const match = item.product.buildTime.match(/\d+/g);
        if (match) itemWeeks = Math.max(...match.map(Number));
      } else if (item.customConfig) {
        itemWeeks = item.customConfig.estimatedWeeks;
      }
      return itemWeeks > max ? itemWeeks : max;
    }, 4);
  }, [cart]);

  // Handle Quote Request submission
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !city || cart.length === 0) return;

    setIsSubmitting(true);

    // Simulate workshop register ledger entry
    setTimeout(() => {
      const invoiceId = `HC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const invoiceData = {
        invoiceId,
        date: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }),
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        clientCity: city,
        items: [...cart],
        subtotal: totalEstimates,
        delivery: deliveryQuote,
        grandTotal: totalEstimates + deliveryQuote,
        leadTime: maxLeadTimeWeeks,
        instructions: additionalInstructions
      };

      setSubmittedInvoice(invoiceData);
      setIsSubmitting(false);
      onClearCart(); // Empty the cart upon invoice generation
    }, 1500);
  };

  const handleResetWorkspace = () => {
    setSubmittedInvoice(null);
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setAdditionalInstructions('');
    onClose();
  };

  const formatPrice = (p: number) => {
    return `Rs. ${p.toLocaleString()}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-charcoal border-l border-line shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* INVOICE VIEW */}
            {submittedInvoice ? (
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-grain flex flex-col justify-between">
                <div>
                  {/* Success Header */}
                  <div className="text-center mb-8 pt-4">
                    <div className="w-12 h-12 rounded-full bg-sage/20 text-sage flex items-center justify-center mx-auto mb-3 border border-sage/50">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-ivory">Quote Request Submitted</h3>
                    <p className="text-xs text-ivory-dim/70 font-sans mt-1">
                      Our Lahore workshop ledger has recorded your custom request.
                    </p>
                  </div>

                  {/* Letterhead Invoice Card */}
                  <div className="bg-[#1e1c18] border border-oak/30 p-8 shadow-xl relative overflow-hidden text-xs">
                    {/* Background accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-oak" />
                    
                    {/* Invoice Letterhead Top */}
                    <div className="flex justify-between items-start mb-6 border-b border-line pb-4">
                      <div>
                        <span className="font-display text-xl font-bold tracking-wide">
                          Holz<span className="text-oak italic">craft</span>
                        </span>
                        <span className="block text-[8px] font-mono text-sage uppercase mt-0.5">SOLID TIMBER ATELIER</span>
                      </div>
                      <div className="text-right font-mono text-[10px] text-ivory-dim/70">
                        <span className="block font-semibold text-oak uppercase">OFFICIAL QUOTE</span>
                        <span className="block mt-1">ID: {submittedInvoice.invoiceId}</span>
                        <span>Date: {submittedInvoice.date}</span>
                      </div>
                    </div>

                    {/* Client & Studio Specs info */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-ivory-dim">
                      <div>
                        <span className="text-sage font-mono text-[9px] uppercase tracking-wider block mb-1">CLIENT PROFILE</span>
                        <span className="text-ivory font-medium block text-sm">{submittedInvoice.clientName}</span>
                        <span className="block mt-1 flex items-center gap-1"><MapPin className="w-3 h-3 text-oak" /> {submittedInvoice.clientCity}, Pakistan</span>
                        <span className="block flex items-center gap-1"><Phone className="w-3 h-3 text-oak" /> {submittedInvoice.clientPhone}</span>
                        <span className="block flex items-center gap-1"><Mail className="w-3 h-3 text-oak" /> {submittedInvoice.clientEmail}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sage font-mono text-[9px] uppercase tracking-wider block mb-1">WORKSHOP SOURCE</span>
                        <span className="text-ivory font-medium block">Holzcraft Timber Atelier</span>
                        <span className="block mt-1">Sector XX, Phase III, DHA</span>
                        <span>Lahore, Punjab</span>
                        <span className="block mt-0.5 font-mono text-[10px]">info@holzcraft.com.pk</span>
                      </div>
                    </div>

                    {/* Selected pieces breakdown table */}
                    <div className="border-t border-b border-line/60 py-4 mb-6">
                      <span className="text-sage font-mono text-[9px] uppercase tracking-wider block mb-3">CUSTOM SPECIFICATIONS</span>
                      <div className="space-y-3">
                        {submittedInvoice.items.map((item: QuoteItem) => {
                          const isCustom = !!item.customConfig;
                          const name = isCustom ? `Customised ${item.customConfig?.baseProductName}` : item.product?.name;
                          const wood = isCustom ? item.customConfig?.woodType : item.product?.woodType;
                          const price = isCustom ? item.customConfig?.calculatedPrice : item.product?.price;

                          return (
                            <div key={item.id} className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <span className="font-semibold text-ivory text-sm block">{name}</span>
                                {isCustom ? (
                                  <div className="text-[10px] text-ivory-dim/60 mt-1 font-mono space-y-0.5">
                                    <span className="block">Timber: {wood} heartwood</span>
                                    <span className="block">Size: {item.customConfig?.lengthCm}L x {item.customConfig?.widthCm}W x {item.customConfig?.heightCm}H cm</span>
                                    <span className="block">Finish: {item.customConfig?.finish} · Inlay: {item.customConfig?.brassInlay ? 'Artisanal Brass wire' : 'None'}</span>
                                    <span className="block">Carvings: {item.customConfig?.carvingLevel} details</span>
                                    {item.customConfig?.specialNotes && <span className="block italic text-sage">"Notes: {item.customConfig.specialNotes}"</span>}
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-ivory-dim/60 font-mono">Standard Catalog Spec · {wood}</span>
                                )}
                              </div>
                              <div className="text-right font-mono">
                                <span className="text-ivory-dim block">{item.quantity} x {formatPrice(price || 0)}</span>
                                <span className="text-oak font-semibold block mt-0.5">{formatPrice((price || 0) * item.quantity)}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="space-y-2 border-b border-line pb-4 mb-4 font-sans text-ivory-dim">
                      <div className="flex justify-between">
                        <span>Bespoke Timber Subtotal</span>
                        <span className="font-mono">{formatPrice(submittedInvoice.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Long-haul Cargo Packing & Transport ({submittedInvoice.clientCity})</span>
                        <span className="font-mono">{formatPrice(submittedInvoice.delivery)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold text-ivory pt-1 border-t border-line/40">
                        <span>Estimated Total Investment</span>
                        <span className="font-mono text-oak">{formatPrice(submittedInvoice.grandTotal)}</span>
                      </div>
                    </div>

                    {/* Timeline specifications */}
                    <div className="grid grid-cols-2 gap-4 text-[11px] font-sans text-ivory-dim leading-relaxed">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-sage block mb-1">TIMELINE ESTIMATES</span>
                        <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-oak" /> {submittedInvoice.leadTime} Weeks built from seasoning</p>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-sage block mb-1">TIMBER ASSURANCE</span>
                        <p className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sage" /> 10-Year structural joints guarantee</p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Instruction list */}
                  <div className="mt-8 p-4 bg-walnut/15 border border-line text-xs font-sans text-ivory-dim leading-relaxed">
                    <span className="text-oak font-semibold uppercase font-mono tracking-wider block mb-2">What Happens Next?</span>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>An ustad karigar from our Lahore workshop office will contact you on <span className="text-ivory font-medium">{submittedInvoice.clientPhone}</span> or email <span className="text-ivory font-medium">{submittedInvoice.clientEmail}</span> within 1 business day.</li>
                      <li>We will review timber raw-plank availability, moisture seasonings, and shipping access.</li>
                      <li>To commence joint carving, a 50% seasoning deposit is required; the remaining 50% is due upon completion review before dispatch cargo crate.</li>
                    </ol>
                  </div>
                </div>

                <button
                  onClick={handleResetWorkspace}
                  className="w-full mt-8 py-4 bg-oak hover:bg-ivory text-charcoal font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                >
                  Done & Close Workspace
                </button>
              </div>
            ) : (
              /* STANDARD BASKET VIEW */
              <>
                {/* Header */}
                <div className="p-6 border-b border-line flex items-center justify-between bg-charcoal/90 backdrop-blur-xs">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-oak" />
                    <h3 className="font-display text-lg font-semibold text-ivory">Bespoke Quote Basket</h3>
                    {cart.length > 0 && (
                      <span className="ml-2 bg-line text-oak text-[10px] font-mono py-0.5 px-2 uppercase tracking-widest border border-line">
                        {cart.length} unique pieces
                      </span>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-ivory-dim hover:text-oak border border-line/40 rounded-full hover:border-oak transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-grain">
                  {cart.length === 0 ? (
                    /* Empty state */
                    <div className="h-96 flex flex-col justify-center items-center text-center text-ivory-dim">
                      <ShoppingBag className="w-12 h-12 text-oak/30 mb-4 animate-bounce" />
                      <h4 className="font-display text-lg font-medium">Your basket is clear</h4>
                      <p className="text-xs font-sans max-w-xs mt-1">
                        Browse our solid woodwork portfolio and add items directly, or customize your timber specifications.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2.5 border border-line text-xs uppercase tracking-widest hover:border-oak hover:text-oak transition-colors font-sans"
                      >
                        Return to Atelier Catalog
                      </button>
                    </div>
                  ) : (
                    /* Cart list and Form */
                    <>
                      {/* Products List */}
                      <div className="space-y-4">
                        <span className="font-mono text-[10px] uppercase text-sage tracking-widest block border-b border-line pb-1 mb-2">
                          1. Review Configured Furniture
                        </span>

                        {cart.map((item) => {
                          const isCustom = !!item.customConfig;
                          const name = isCustom ? `Customised ${item.customConfig?.baseProductName}` : item.product?.name;
                          const wood = isCustom ? item.customConfig?.woodType : item.product?.woodType;
                          const price = isCustom ? item.customConfig?.calculatedPrice : item.product?.price;
                          const image = isCustom
                            ? INITIAL_PRODUCTS.find((p) => p.id === item.customConfig?.baseProductId)?.image
                            : item.product?.image;

                          return (
                            <div
                              key={item.id}
                              className="p-4 bg-charcoal/80 border border-line flex gap-4 items-start justify-between relative group"
                            >
                              <div className="flex gap-4 items-start">
                                {/* Thumbnail */}
                                <div className="w-16 h-16 shrink-0 bg-walnut/20 border border-line overflow-hidden relative">
                                  <img src={image} alt={name} className="w-full h-full object-cover saturate-70" />
                                  <div className="absolute inset-1.5 border border-oak/10 pointer-events-none" />
                                </div>

                                {/* Item specs description */}
                                <div className="text-xs">
                                  <span className="font-display text-sm font-semibold text-ivory block">{name}</span>
                                  {isCustom ? (
                                    <div className="text-[10px] text-ivory-dim/60 font-mono mt-1 space-y-0.5">
                                      <span className="block text-oak">{wood} Timber · Custom Dimensions</span>
                                      <span className="block">Size: {item.customConfig?.lengthCm}L x {item.customConfig?.widthCm}W x {item.customConfig?.heightCm}H cm</span>
                                      <span className="block">Finish: {item.customConfig?.finish} · Inlay: {item.customConfig?.brassInlay ? 'Brass wire' : 'None'}</span>
                                      {item.customConfig?.specialNotes && <span className="block italic text-sage">"Notes: {item.customConfig.specialNotes}"</span>}
                                    </div>
                                  ) : (
                                    <span className="text-[10px] text-ivory-dim/60 block mt-1 font-mono">Standard Catalog Specification · {wood}</span>
                                  )}
                                  <span className="block font-semibold text-oak mt-2 font-mono">{formatPrice(price || 0)}</span>
                                </div>
                              </div>

                              {/* Controls */}
                              <div className="flex flex-col items-end justify-between h-16">
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-ivory-dim hover:text-red-400 p-1.5 hover:bg-line rounded-full transition-colors"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                                {/* Quantity adjusting */}
                                <div className="flex items-center gap-1 border border-line/80 bg-black/40">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="px-2 py-0.5 text-xs hover:text-oak hover:bg-line transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="px-1.5 text-[10px] font-mono text-ivory">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-0.5 text-xs hover:text-oak hover:bg-line transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Quote Form */}
                      <form onSubmit={handleSubmitRequest} className="space-y-6">
                        <span className="font-mono text-[10px] uppercase text-sage tracking-widest block border-b border-line pb-1 mb-2">
                          2. Contact & Delivery Ledger
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-sage mb-2 font-mono flex items-center gap-1">
                              <User className="w-3 h-3 text-oak" /> Full Name
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Hammad Khan"
                              className="w-full bg-charcoal border border-line p-3 text-xs text-ivory placeholder-ivory-dim/30 focus:outline-none focus:border-oak"
                            />
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-sage mb-2 font-mono flex items-center gap-1">
                              <Mail className="w-3 h-3 text-oak" /> Email Address
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. hammad@domain.com"
                              className="w-full bg-charcoal border border-line p-3 text-xs text-ivory placeholder-ivory-dim/30 focus:outline-none focus:border-oak"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Phone */}
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-sage mb-2 font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3 text-oak" /> Phone Contact (Pakistan)
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="e.g. +92 300 1234567"
                              className="w-full bg-charcoal border border-line p-3 text-xs text-ivory placeholder-ivory-dim/30 focus:outline-none focus:border-oak"
                            />
                          </div>

                          {/* City selection */}
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-sage mb-2 font-mono flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-oak" /> Destination City
                            </label>
                            <select
                              required
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="w-full bg-charcoal border border-line p-3 text-xs text-ivory focus:outline-none focus:border-oak"
                            >
                              <option value="">Select city for shipping estimate</option>
                              {PAKISTAN_CITIES.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Special delivery requests */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-sage mb-2 font-mono">
                            Special Delivery or Cargo instructions (Optional)
                          </label>
                          <textarea
                            value={additionalInstructions}
                            onChange={(e) => setAdditionalInstructions(e.target.value)}
                            placeholder="e.g. Please coordinate delivery timing, require floor elevator assistance, or premium waterproof wrapping..."
                            className="w-full bg-charcoal/50 border border-line p-3 text-xs text-ivory placeholder-ivory-dim/30 h-20 focus:outline-none focus:border-oak font-sans resize-none"
                            maxLength={300}
                          />
                        </div>

                        {/* Financial checklist preview before sending */}
                        <div className="bg-walnut/10 border border-line p-4 space-y-2.5 text-xs text-ivory-dim font-sans">
                          <div className="flex justify-between">
                            <span>Timber Subtotal estimate:</span>
                            <span className="font-mono text-ivory">{formatPrice(totalEstimates)}</span>
                          </div>
                          {city && (
                            <div className="flex justify-between">
                              <span>Shipping & packing to {city}:</span>
                              <span className="font-mono text-ivory">{formatPrice(deliveryQuote)}</span>
                            </div>
                          )}
                          <div className="flex justify-between border-t border-line/40 pt-2 font-semibold text-ivory">
                            <span className="flex items-center gap-1">Estimated Grand Total <Sparkles className="w-3.5 h-3.5 text-oak inline" /></span>
                            <span className="font-mono text-oak">{formatPrice(totalEstimates + deliveryQuote)}</span>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting || !name || !email || !phone || !city}
                          className="w-full py-4 bg-oak hover:bg-ivory text-charcoal disabled:bg-line/40 disabled:text-ivory-dim/40 font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                              <span>Generating Ledger Entry...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Request Bespoke Workshop Quote</span>
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
