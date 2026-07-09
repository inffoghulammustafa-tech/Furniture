import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data';
import { getCategoryLabel } from './Catalog';

interface CategoryPageProps {
  category: string;
  onAddProductToQuote: (product: Product) => void;
  onConfigureProduct: (product: Product) => void;
}

export default function CategoryPage({ category, onAddProductToQuote, onConfigureProduct }: CategoryPageProps) {
  const [searchParams, setSearchParams] = useState({
    color: 'all',
    material: 'all',
    polish: 'all',
    style: 'all',
    pieces: 'all',
  });

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(p => {
      const matchesCategory = p.category === category;
      // Note: The original products don't have these exact fields, 
      // mocking filter behavior based on typical furniture attributes
      return matchesCategory;
    });
  }, [category]);

  const filterOptions = {
    color: ['Natural', 'Walnut Stain', 'Oak'],
    material: ['Sheesham', 'Walnut', 'Oak'],
    polish: ['Matte', 'Gloss', 'Oil'],
    style: ['Modern', 'Traditional', 'Minimalist'],
    pieces: ['1', '2', '3', '4+']
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-charcoal text-ivory p-6 md:p-12 pt-28 md:pt-40"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center mb-12 text-4xl font-light text-ivory uppercase tracking-[0.2em]">
          {getCategoryLabel(category)} Luxury Collection
        </h1>

        {/* Filter Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 bg-[#2a2a2a] p-6 rounded-lg shadow-sm border border-gray-700"
        >
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key}>
              <label className="block text-[10px] uppercase tracking-widest text-gray-300 mb-2 font-bold">{key}</label>
              <select
                value={searchParams[key as keyof typeof searchParams]}
                onChange={(e) => setSearchParams(prev => ({ ...prev, [key]: e.target.value }))}
                className="w-full bg-[#1a1a1a] border border-gray-600 py-2 px-2 text-xs rounded text-ivory"
              >
                <option value="all">All</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
              <div className="relative h-64 bg-gray-800">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-sm text-ivory font-medium mb-6 min-h-[3rem]">
                  {product.name}
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onAddProductToQuote(product)}
                    className="inline-block border border-ivory text-ivory py-2 px-6 text-xs font-bold uppercase tracking-wide hover:bg-ivory hover:text-charcoal transition-all"
                  >
                    Add to Quote
                  </button>
                  <button
                    onClick={() => onConfigureProduct(product)}
                    className="inline-block text-gray-400 py-2 px-6 text-xs font-bold uppercase tracking-wide hover:text-ivory"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
