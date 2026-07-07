/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, WoodProperty, Review } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'kirana-dining',
    name: 'Kirana Dining Table',
    category: 'dining',
    price: 148000,
    woodType: 'Sheesham',
    materialDetails: 'Sustainably sourced, kiln-dried seasoned Sheesham',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80',
    badge: 'New',
    description: 'A monument of solid joinery. Crafted with a full-thickness 40mm solid timber top featuring continuous planks that celebrate the deep, swirling red-brown grain of seasoned Sheesham. Supported by massive handcrafted chamfered pillar legs.',
    dimensions: '182cm L x 91cm W x 76cm H (6ft x 3ft)',
    weight: '72 kg',
    buildTime: '6-8 Weeks',
    joinery: 'Through-mortise and tenon corners, with anti-warping metal support channels slotted underneath.'
  },
  {
    id: 'marwa-bed',
    name: 'Marwa Bed Frame',
    category: 'bedroom',
    price: 189500,
    originalPrice: 214000,
    woodType: 'Walnut',
    materialDetails: 'A-grade air-dried select wild Walnut',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=900&q=80',
    badge: 'Bestseller',
    description: 'A masterpiece of understatement. The Marwa frame floating headboard is sculpted from highly figured walnut wood slabs, showcasing exquisite chocolate tones and blonde sapwood highlights. Built with silent interlocked frame rails that naturally bear load without creaking.',
    dimensions: '210cm L x 195cm W x 115cm H (King Size)',
    weight: '94 kg',
    buildTime: '8-10 Weeks',
    joinery: 'Blind sliding dovetails, traditional pocket joinery with steel-threaded corner brace plates.'
  },
  {
    id: 'chinar-console',
    name: 'Chinar Console Table',
    category: 'living-room',
    price: 76000,
    woodType: 'Sheesham',
    materialDetails: 'Handcarved solid heartwood Sheesham',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    description: 'An elegant statement for entryways and corridors. The Chinar console is styled with minimalist geometric carving on the drawer facades, preserving the raw natural contrast of the sapwood. Features three hidden soft-close solid wood drawers.',
    dimensions: '135cm L x 38cm W x 78cm H',
    weight: '38 kg',
    buildTime: '4-6 Weeks',
    joinery: 'Dovetailed drawer boxes, integrated mortise frames with hidden pegging.'
  },
  {
    id: 'walnut-lounge',
    name: 'Walnut Lounge Chair',
    category: 'living-room',
    price: 92000,
    woodType: 'Walnut',
    materialDetails: 'Hand-sculpted prime Walnut timber',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80',
    badge: 'Limited Run',
    description: 'Sculptural comfort. Each angle of this lounge chair is carefully hand-planed and carved to flow smoothly. Fitted with premium natural woven jute webbing or upholstered in premium raw Belgian linen, it is an ergonomic triumph.',
    dimensions: '74cm L x 82cm W x 78cm H',
    weight: '16 kg',
    buildTime: '5-7 Weeks',
    joinery: 'Double-pinned round mortise-and-tenon joints, sculptured wood-on-wood integration.'
  },
  {
    id: 'ravi-sideboard',
    name: 'Ravi Credenza & Sideboard',
    category: 'dining',
    price: 125000,
    woodType: 'Oak',
    materialDetails: 'Sustainably harvested European White Oak',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&q=80',
    description: 'Constructed from select quarter-sawn White Oak exhibiting exceptional fleck patterns. Features four sliding slatted tambour doors that glide smoothly to reveal adjustable solid oak shelving, ideal for dining storage or media setups.',
    dimensions: '160cm L x 45cm W x 72cm H',
    weight: '55 kg',
    buildTime: '6-8 Weeks',
    joinery: 'Half-lap frame construction, sliding groove track joinery with solid oak drawer glides.'
  },
  {
    id: 'shalimar-bench',
    name: 'Shalimar Garden Bench',
    category: 'outdoor',
    price: 68000,
    woodType: 'Oak',
    materialDetails: 'Sourced premium weather-treated White Oak',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900&q=80',
    description: 'A classic English-style garden bench built with slatted drainage panels and a curved ergonomic seat. Double-waxed with premium marine-grade oil to withstand hot, humid climates and dry desert heat alike.',
    dimensions: '150cm L x 60cm W x 90cm H',
    weight: '32 kg',
    buildTime: '3-4 Weeks',
    joinery: 'Drawbored tenon joints with solid oak pegs for maximum natural expansion allowance.'
  },
  {
    id: 'kaghan-wardrobe',
    name: 'Kaghan Armoire & Wardrobe',
    category: 'bedroom',
    price: 245000,
    woodType: 'Walnut',
    materialDetails: 'Heavy thick-plank kiln-seasoned Walnut',
    image: 'https://images.unsplash.com/photo-1558882224-cca166733360?w=900&q=80',
    badge: 'Masterpiece',
    description: 'A monumental wardrobe designed to be passed down through generations. Features full-height grain matched book-ended walnut doors. The interior reveals a hanging copper rail, four deep dynamic drawers, and cedar lining to protect fabrics.',
    dimensions: '110cm L x 62cm W x 205cm H',
    weight: '142 kg',
    buildTime: '10-12 Weeks',
    joinery: 'Frame-and-panel construction with free-floating panels to allow seasonal wood breathing.'
  },
  {
    id: 'margalla-study',
    name: 'Margalla Executive Desk',
    category: 'living-room',
    price: 165000,
    woodType: 'Walnut',
    materialDetails: 'Highly figured center heartwood Walnut',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80',
    description: 'Commanding attention. This executive desk balances mid-century floating geometry with massive solid walnut construction. Includes integrated wireless inductive charging wood inlays and a heavy brass cord escape.',
    dimensions: '152cm L x 76cm W x 75cm H',
    weight: '62 kg',
    buildTime: '7-9 Weeks',
    joinery: 'Mitered waterfalls with matching continuous wood grain, reinforced with splines.'
  },
  {
    id: 'murree-bookcase',
    name: 'Murree Modular Library',
    category: 'living-room',
    price: 110000,
    woodType: 'Sheesham',
    materialDetails: 'High-density seasoned Sheesham panels',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=80',
    description: 'An open modular shelving unit showcasing stunning contrasts of amber sapwood and deep dark heartwood. Clean, sturdy shelves capable of holding massive book collections without sagging.',
    dimensions: '100cm L x 30cm W x 180cm H',
    weight: '48 kg',
    buildTime: '4-6 Weeks',
    joinery: 'Through-housing dados, reinforced with rear wooden tension cross-struts.'
  },
  {
    id: 'kalyar-dining-set',
    name: 'Kalyar Premium Dining Set',
    category: 'sets',
    price: 245000,
    woodType: 'Sheesham',
    materialDetails: 'Premium hand-seasoned Sheesham Wood (Includes Table + 6 Cushioned Chairs)',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=900&q=80',
    badge: 'Luxury Set',
    description: 'The ultimate culinary gathering hub. This signature dining set includes our famous heavy-plank Kirana Table paired with 6 ergonomically curved Sheesham chairs upholstered in premium high-density Pakistani khaddar fabric. Heavy-duty mortise lock framing.',
    dimensions: '182cm L x 91cm W x 76cm H (Table) / 45cm W x 95cm H (Chairs)',
    weight: '130 kg',
    buildTime: '8-10 Weeks',
    joinery: 'Blind tenoned chair framing, table with deep-locked interlocking bolt-through dowels.'
  },
  {
    id: 'marwa-bedroom-set',
    name: 'Marwa Master Bedroom Set',
    category: 'sets',
    price: 385000,
    woodType: 'Walnut',
    materialDetails: 'Highly-figured Wild Persian Walnut (Includes King Bed + 2 Nightstands + Dresser Mirror)',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80',
    badge: 'Curated Suite',
    description: 'Elevate your private sanctuary. The Marwa Bedroom Set coordinates our premium Walnut floating-style king bed with two sleek soft-close nightstands and a multi-drawer matching dresser mirror console. Book-matched walnut grains curated from the same old-growth log.',
    dimensions: 'King Bed Layout / Side Tables: 55cm W x 45cm D x 50cm H',
    weight: '210 kg',
    buildTime: '10-12 Weeks',
    joinery: 'Sliding blind dovetail drawers, masterfully aligned book-matched grain panels.'
  },
  {
    id: 'chinar-lounge-set',
    name: 'Chinar Heritage Lounge Set',
    category: 'sets',
    price: 295000,
    woodType: 'Walnut',
    materialDetails: 'Solid hand-carved Walnut frames (Includes 3-Seater Sofa + 2 Sculptural Chairs)',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=80',
    badge: 'Ustad Special',
    description: 'Grace your living parlor with local ustad artistry. Consists of a three-seater walnut frame sofa upholstered in ivory Belgian linen, coupled with two hand-sculpted minimalist Walnut Lounge Chairs. Beautifully balanced modern lines with classical Pakistani chip-carving accents.',
    dimensions: 'Sofa: 210cm L x 85cm D x 75cm H / Chairs: 74cm L x 82cm W x 78cm H',
    weight: '115 kg',
    buildTime: '9-11 Weeks',
    joinery: 'Double-pinned round mortise-and-tenon frame connections, reinforced webbed supports.'
  },
  {
    id: 'shalimar-patio-set',
    name: 'Shalimar Outdoor Veranda Set',
    category: 'sets',
    price: 185000,
    woodType: 'Oak',
    materialDetails: 'Marine-grade weather-treated White Oak (Includes Rectangular Table + 2 Benches)',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80',
    badge: 'Veranda Special',
    description: 'Designed for lush evenings in Lahore gardens. A weather-ready dining setup comprising a high-drainage slatted White Oak outdoor table and two matching Shalimar benches. Sealed with dual-coat protective marine oils to withstand heavy sun and monsoon rain.',
    dimensions: 'Table: 160cm L x 80cm W x 75cm H / Benches: 140cm L x 35cm W x 45cm H',
    weight: '90 kg',
    buildTime: '6-8 Weeks',
    joinery: 'Drawbored mortise and tenon joints with premium expandable white oak dowels.'
  }
];

export const WOOD_PROPERTIES: Record<'Sheesham' | 'Walnut' | 'Oak', WoodProperty> = {
  Sheesham: {
    name: 'Indian Rosewood (Sheesham)',
    latinName: 'Dalbergia sissoo',
    hardness: 'Extremely Hard (Janka: 1,660 lbf)',
    grainPattern: 'Wild, highly defined, contrasting interlocking grain with dramatic golden-to-dark-brown waves.',
    colorRange: 'Golden yellow sapwood contrasting sharply with rich chesnut or dark red-brown heartwood.',
    humidityResponse: 'Highly stable once kiln-seasoned; exceptional resistance to dry rot and subterranean termites.',
    bestFor: 'Heavy-use dining tables, consoles, bed structures, and intricate traditional carvings.'
  },
  Walnut: {
    name: 'Persian / Wild Walnut',
    latinName: 'Juglans regia',
    hardness: 'Moderately Hard & Tough (Janka: 1,010 lbf)',
    grainPattern: 'Rich, tight, sometimes wavy or curly grain. Features soft, elegant, organic swirls.',
    colorRange: 'Deep chocolate browns, warm undertones of charcoal grey and highlights of creamy blonde.',
    humidityResponse: 'Very responsive to craftsmanship; moderate shrinkage, must be given dynamic joint clearances.',
    bestFor: 'Fine sculptural lounge chairs, master wardrobes, sleek floating beds, and luxury desktops.'
  },
  Oak: {
    name: 'European White Oak',
    latinName: 'Quercus robur',
    hardness: 'Hard & Wear-Resistant (Janka: 1,360 lbf)',
    grainPattern: 'Straight grain with a coarse texture; spectacular medullary rays or fleck patterns when quarter-sawn.',
    colorRange: 'Pale biscuit gold to soft honey-brown with contemporary muted, sandy undertones.',
    humidityResponse: 'Exceptional moisture resistance due to its cellular structure (tyloses), making it highly decay resistant.',
    bestFor: 'Outdoor benches, heavy-duty credenzas, modern dining sets, and bathroom cabinetry.'
  }
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Ayesha Raza',
    city: 'Lahore',
    rating: 5,
    comment: 'Two years in and the Kirana dining table looks even better than the day it arrived. The walnut-stain oil finish has just deepened and acquired a rich luster with family meals. A stunning piece.',
    productName: 'Kirana Dining Table',
    woodType: 'Sheesham',
    date: '2025-11-14'
  },
  {
    id: 'rev-2',
    name: 'Hamza Iqbal',
    city: 'Islamabad',
    rating: 5,
    comment: 'They took the time to talk us out of a design that would have warped in our humid monsoon months and recommended White Oak with customized drawbored pegs. That kind of master woodworking honesty is extremely rare.',
    productName: 'Shalimar Garden Bench',
    woodType: 'Oak',
    date: '2026-02-28'
  },
  {
    id: 'rev-3',
    name: 'Sana Malik',
    city: 'Karachi',
    rating: 5,
    comment: 'The Marwa bed frame is built like a fortress. Absolutely solid, no squeaking whatsoever, and the wood grain headboard is like a giant piece of abstract art in our bedroom. Worth every rupee.',
    productName: 'Marwa Bed Frame',
    woodType: 'Walnut',
    date: '2026-05-01'
  },
  {
    id: 'rev-4',
    name: 'Dr. Tariq Jamil',
    city: 'Peshawar',
    rating: 5,
    comment: 'Ordered a customized Margalla executive desk with standard walnut but customized sizes for my double monitors. The integrated wireless charger block works flawlessly and is completely invisible. Master class.',
    productName: 'Margalla Executive Desk',
    woodType: 'Walnut',
    date: '2026-06-15'
  }
];

export const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Faisalabad',
  'Multan',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Sargodha',
  'Bahawalpur',
  'Hyderabad',
  'Sukkur'
];
