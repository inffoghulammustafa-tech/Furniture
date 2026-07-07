/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Plus, Check, MapPin, SlidersHorizontal, Eye, ShieldCheck, X } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS, PAKISTAN_CITIES, INITIAL_PRODUCTS } from '../data';
import CountUp from './CountUp';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [filterWood, setFilterWood] = useState<string | 'all'>('all');

  // Load reviews from localStorage or fallback to static list
  useEffect(() => {
    const saved = localStorage.getItem('holzcraft_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  // Save reviews to localStorage
  const saveReviews = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    localStorage.setItem('holzcraft_reviews', JSON.stringify(updatedReviews));
  };

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formProduct, setFormProduct] = useState('');
  const [formWood, setFormWood] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Submit handler
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formCity || !formComment || !formProduct) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: formName,
      city: formCity,
      rating: formRating,
      comment: formComment,
      productName: formProduct,
      woodType: formWood || undefined,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);

    setFormSuccess(true);
    setFormName('');
    setFormCity('');
    setFormRating(5);
    setFormProduct('');
    setFormWood('');
    setFormComment('');

    setTimeout(() => {
      setFormSuccess(false);
      setShowForm(false);
    }, 3000);
  };

  // Filter calculations
  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      const matchesRating = filterRating === 'all' || rev.rating === filterRating;
      const matchesWood = filterWood === 'all' || rev.woodType === filterWood;
      return matchesRating && matchesWood;
    });
  }, [reviews, filterRating, filterWood]);

  // General Statistics
  const ratingStats = useMemo(() => {
    if (reviews.length === 0) return { avg: 5, total: 0 };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      avg: Number((sum / reviews.length).toFixed(1)),
      total: reviews.length
    };
  }, [reviews]);

  return (
    <section id="reviews" className="py-24 border-b border-line bg-charcoal/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block mb-3">Client Ledger</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ivory">
              What clients say after year one, not week one
            </h2>
          </div>
          <p className="text-ivory-dim text-sm sm:text-base max-w-sm font-sans leading-relaxed">
            We follow up with customers months after their bespoke setup is delivered, documenting how solid timber breathes and settles in their homes.
          </p>
        </div>

        {/* Review dashboard stats & filters row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal/80 border border-line p-6 md:p-8 mb-12">
          {/* Stats column (4 Columns) */}
          <div className="lg:col-span-4 border-r border-line/40 pr-0 lg:pr-8 flex items-center gap-6 justify-between lg:justify-start">
            <div>
              <span className="font-display text-5xl font-bold text-oak block">
                <CountUp end={ratingStats.avg} decimals={1} />
              </span>
              <div className="flex gap-1 text-oak my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= Math.round(ratingStats.avg) ? 'fill-oak text-oak' : 'text-line'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-ivory-dim/70 font-sans">
                Based on <CountUp end={ratingStats.total} /> client audits
              </span>
            </div>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-3 border border-oak text-oak hover:bg-oak hover:text-charcoal text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Write Review
            </button>
          </div>

          {/* Filter column (8 Columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Rating Filter */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-sage mb-2 font-mono flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-oak" /> Filter by Rating
              </label>
              <div className="flex items-center gap-2">
                {[5, 4, 3, 'all'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setFilterRating(r as any)}
                    className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                      filterRating === r
                        ? 'bg-oak text-charcoal border-oak font-bold'
                        : 'text-ivory-dim border-line hover:text-ivory'
                    }`}
                  >
                    {r === 'all' ? 'All Ratings' : `${r} ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Wood type filter */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-sage mb-2 font-mono flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-oak" /> Filter Wood Species
              </label>
              <div className="flex items-center gap-2">
                {['all', 'Sheesham', 'Walnut', 'Oak'].map((w) => (
                  <button
                    key={w}
                    onClick={() => setFilterWood(w)}
                    className={`px-3 py-1.5 text-xs border transition-all ${
                      filterWood === w
                        ? 'bg-oak text-charcoal border-oak font-bold'
                        : 'text-ivory-dim border-line hover:text-ivory'
                    }`}
                  >
                    {w === 'all' ? 'All Timber' : w}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Review Form Drawer/Panel */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form onSubmit={handleReviewSubmit} className="bg-charcoal border border-oak/30 p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-line pb-3">
                  <h4 className="font-display text-lg font-medium text-ivory flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-oak" /> Write an Authentic Review
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="p-1 text-ivory-dim hover:text-oak"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-sage font-mono mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Ayesha Raza"
                      className="w-full bg-charcoal border border-line p-3 text-xs text-ivory focus:outline-none focus:border-oak"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-sage font-mono mb-2">City (Pakistan)</label>
                    <select
                      required
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full bg-charcoal border border-line p-3 text-xs text-ivory focus:outline-none focus:border-oak"
                    >
                      <option value="">Select your city</option>
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-sage font-mono mb-2">Star Rating</label>
                    <div className="flex gap-1.5 pt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormRating(s)}
                          className="text-oak hover:scale-110 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${s <= formRating ? 'fill-oak text-oak' : 'text-line'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-sage font-mono mb-2">Purchased Product</label>
                    <select
                      required
                      value={formProduct}
                      onChange={(e) => setFormProduct(e.target.value)}
                      className="w-full bg-charcoal border border-line p-3 text-xs text-ivory focus:outline-none focus:border-oak"
                    >
                      <option value="">Select piece purchased</option>
                      {INITIAL_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-sage font-mono mb-2">Timber Wood (Optional)</label>
                    <select
                      value={formWood}
                      onChange={(e) => setFormWood(e.target.value)}
                      className="w-full bg-charcoal border border-line p-3 text-xs text-ivory focus:outline-none focus:border-oak"
                    >
                      <option value="">Select wood type</option>
                      <option value="Sheesham">Sheesham (Indian Rosewood)</option>
                      <option value="Walnut">Persian Wild Walnut</option>
                      <option value="Oak">European White Oak</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-sage font-mono mb-2">Your experience living with the furniture</label>
                  <textarea
                    required
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder="Describe how the timber grain looks, how the joinery behaves across seasons, and overall durability..."
                    className="w-full bg-charcoal border border-line p-3 text-xs text-ivory h-24 focus:outline-none focus:border-oak font-sans resize-none"
                    maxLength={500}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-oak hover:bg-ivory text-charcoal font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300"
                >
                  Submit Honest Client Audit
                </button>

                {formSuccess && (
                  <div className="bg-sage/20 border border-sage text-sage p-3 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Audit recorded successfully. Thank you for your feedback!</span>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-line text-ivory-dim">
            <MessageSquare className="w-8 h-8 mx-auto text-oak/40 mb-3" />
            <p className="font-display">No client reviews match this filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="box-gradient p-6 flex flex-col justify-between rounded-xl"
              >
                <div>
                  {/* Stars list */}
                  <div className="flex gap-1 text-oak mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-oak text-oak' : 'text-line'}`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-ivory-dim text-sm font-sans leading-relaxed mb-6 italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Footer client bio */}
                <div className="flex items-center gap-3 border-t border-line/40 pt-4 mt-2">
                  <div className="w-9 h-9 rounded-full bg-oak flex items-center justify-center font-display font-bold text-charcoal text-sm">
                    {rev.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <b className="text-xs text-ivory block">{rev.name}</b>
                      <ShieldCheck className="w-3.5 h-3.5 text-sage" title="Verified Bespoke Owner" />
                    </div>
                    <span className="text-[10px] text-ivory-dim/60 font-sans flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-sage" /> {rev.city} · {rev.productName}
                      {rev.woodType && ` (${rev.woodType})`}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
