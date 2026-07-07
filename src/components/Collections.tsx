/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sofa, 
  Bed, 
  Utensils, 
  Trees, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Phone, 
  Check, 
  ShieldCheck, 
  Compass,
  Sparkles
} from 'lucide-react';

interface CollectionsProps {
  onSelectCollection: (category: string) => void;
}

const NEW_ARRIVALS = [
  // Page 1 (Exactly as in the user's image)
  {
    id: 'arr-1',
    name: 'High Living Sissoo Crafted Wood 8 Chair Fancy Dining Table Set',
    tag: 'Luxury Dining',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Sissoo-Wood-Glass-Top-Fancy-Dining-Table-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-2',
    name: 'Carving Shisham Wood High Back Bedroom Chair Set',
    tag: 'Sold Out',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/High-Back-Shisham-Wood-Bedroom-Chair-600x420.jpg',
    status: 'Sold Out'
  },
  {
    id: 'arr-3',
    name: 'Pigeon Foot Carved Sissoo Wood Console',
    tag: 'Elegant Console',
    image: 'https://i.pinimg.com/1200x/3d/ee/3a/3dee3a37b91acc6c757dfb70e6e35f4d.jpg',
    status: 'Available'
  },
  {
    id: 'arr-4',
    name: 'Black & Golden 8 Chairs Solid Acacia Wood Fancy Dining Table Set',
    tag: 'Black & Gold',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Acacia-Dining-Room-Furniture-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-5',
    name: 'Shisham Wood Chase Ship Bedroom Chair',
    tag: 'Chaise Lounge',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Sissoo-Wood-Bedroom-Ship-Chair-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-6',
    name: 'Bergere Sissoo Wood Inlay Work Bedroom Chair Set',
    tag: 'Inlay Craft',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Bergere-Chair-Set-In-Pakistan-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-7',
    name: 'Sheesham Wood High Back Prince Red Velvet Bedroom Chair',
    tag: 'Prince Luxury',
    image: 'https://i.pinimg.com/736x/fc/92/b8/fc92b87d8ba2c7aa252d8e162c624e7e.jpg',
    status: 'Available'
  },
  {
    id: 'arr-8',
    name: 'Tri-Angular Solid Acacia Wood Table With 6 Carved Chairs',
    tag: 'Sold Out',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Triangular-6-Chairs-Dining-Table-Set-600x420.jpg',
    status: 'Sold Out'
  },
  // Page 2 (Premium Additional masterpieces)
  {
    id: 'arr-9',
    name: 'High Living L Shape 7 Seater Velvet Full Gauge Solid Wood Sofa',
    tag: 'L-Shape',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/8-Seater-Sofa-Set-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-10',
    name: 'Shisham Wood Chinioti Swing / Jhula with Brass Chains',
    tag: 'Traditional Swing',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Chinioti-Shisham-Wood-Jhola-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-11',
    name: 'Versace Inlay Crafted Sissoo Wood 3 Table Nest Set',
    tag: 'Inlay Premium',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Versace-Shisham-Wood-3-Table-Net-Set-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-12',
    name: 'Chinioti Crafted Silver Deco Moora Chair Set',
    tag: 'Chinioti Crafted',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Chinioti-Moora-Chair-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-13',
    name: 'Mughal Heritage Handcarved Solid Teak Console Mirror',
    tag: 'Royal Teak',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Console-Shisham-Carved-Wood-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-14',
    name: 'Royal Sovereign Double Cushion Sheesham Rocking Chair',
    tag: 'Rocking Chair',
    image: 'https://furnitureholz.com/wp-content/uploads/2021/04/Chase-Lounge-Bedroom-Sofa-Chair-600x420.jpg',
    status: 'Available'
  },
  {
    id: 'arr-15',
    name: 'Kalyar Geometric Lattice Carved Partition Screen',
    tag: 'Lattice Screen',
    image: 'https://i.pinimg.com/1200x/8c/1d/64/8c1d6412275f03784cca7824e7f0c317.jpg',
    status: 'Available'
  },
  {
    id: 'arr-16',
    name: 'Presidential Hand-Sculptured Walnut Dressing Table',
    tag: 'Bespoke Walnut',
    image: 'https://i.pinimg.com/1200x/b3/2c/13/b32c136f377ff5adbb10b7fb3c5d1f38.jpg',
    status: 'Available'
  }
];

const SHOWROOM_CATEGORIES = [
  {
    id: 'bedroom',
    title: 'BEDROOM',
    subtitle: 'Bedroom Series',
    desc: 'Complete master suites including hand-crafted beds, vanity mirrors, and luxury wardrobes.',
    tags: ['Beds', 'Chairs', 'Dressing', 'Almirahs'],
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'bedroom'
  },
  {
    id: 'dining',
    title: 'DINING',
    subtitle: 'Dining Concept',
    desc: 'Ergonomic triangular & circular configurations layout with polished heat-resistant lacquer.',
    tags: ['Dining Sets', 'Sofa Chairs', 'Crockery Units', 'Trolleys'],
    image: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'dining'
  },
  {
    id: 'lounge',
    title: 'LOUNGE',
    subtitle: 'Lounge Suite',
    desc: 'Deep tufted Chesterfield luxury velvet sofas, beautiful central consoles, and solid-wood Jhulas.',
    tags: ['Consoles', 'Sofas', 'Traditional Swings'],
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'living-room'
  },
  {
    id: 'outdoor',
    title: 'OUTDOOR',
    subtitle: 'Garden Design',
    desc: 'Treated weatherproof garden picnic structures, ring swings, and high-quality seasoned wood chairs.',
    tags: ['Garden Sets', 'Picnic Tables', 'Ring Swings'],
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'outdoor'
  },
  {
    id: 'sets',
    title: 'SETS',
    subtitle: 'Home Collections',
    desc: 'Curated bride sets, complete matching living rooms and traditional geometric net layout integrations.',
    tags: ['Bridal Packages', 'Coordinated Sets', 'Lattice Net Designs'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'sets'
  },
  {
    id: 'interior',
    title: 'INTERIOR SERVICES',
    subtitle: 'Interior Fitting',
    desc: 'Heavy premium solid-wood door frames, customized high-end acoustic TV consoles, drapery & kitchen panels.',
    tags: ['Doors', 'Wall Art TV Units', 'Kitchen Cabinetry'],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600',
    categoryKey: 'interior-services'
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.98
  })
};

interface ProductDetailData {
  id: string;
  title: string;
  tmr: string;
  sku: string;
  color: string;
  material: string;
  polish: string;
  style: string;
  size: string;
  images: string[];
  status: string;
  categories: string;
}

const PRODUCTS_DATABASE: Record<string, ProductDetailData> = {
  "arr-1": {
    id: "arr-1",
    title: "High Living Sissoo Crafted Wood 8 Chair Fancy Dining Table Set",
    tmr: "614251",
    sku: "FH-10101",
    color: "Walnut Polish, Cream Cushion",
    material: "Solid Sissoo Wood (Sheesham)",
    polish: "Glossy Melamine Polish, Premium Fabric",
    style: "Mughal Craft Dining",
    size: "9 Pieces (8 Chairs + 1 Table)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Sissoo-Wood-Glass-Top-Fancy-Dining-Table-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Acacia-Dining-Room-Furniture-600x420.jpg"
    ],
    status: "Available",
    categories: "Chair & Tables, Dining Room, Luxury Sets"
  },
  "arr-2": {
    id: "arr-2",
    title: "Carving Shisham Wood High Back Bedroom Chair Set",
    tmr: "614252",
    sku: "FH-10102",
    color: "Teak Brown, Ivory Cushion",
    material: "Solid Shisham Wood",
    polish: "Matte Lacquer Polish, Luxury Velvet",
    style: "High Back Carved",
    size: "3 Pieces (2 Chairs + 1 Table)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/High-Back-Shisham-Wood-Bedroom-Chair-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Bergere-Chair-Set-In-Pakistan-600x420.jpg"
    ],
    status: "Sold Out",
    categories: "Chair & Tables, Sofa, Chair & Deewan"
  },
  "arr-3": {
    id: "arr-3",
    title: "Pigeon Foot Carved Sissoo Wood Console",
    tmr: "614253",
    sku: "FH-10103",
    color: "Antique Gold Accent, Dark Oak",
    material: "Solid Sissoo Wood",
    polish: "Hand-rubbed Polish",
    style: "Pigeon Foot Baroque",
    size: "1 Piece",
    images: [
      "https://i.pinimg.com/1200x/3d/ee/3a/3dee3a37b91acc6c757dfb70e6e35f4d.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Console-Shisham-Carved-Wood-600x420.jpg"
    ],
    status: "Available",
    categories: "Console & Mirrors, Lobby Luxury, Solid Wood"
  },
  "arr-4": {
    id: "arr-4",
    title: "Black & Golden 8 Chairs Solid Acacia Wood Fancy Dining Table Set",
    tmr: "614254",
    sku: "FH-10104",
    color: "Jet Black with Gold Leaf Gilding",
    material: "Solid Acacia Wood",
    polish: "High Gloss Black Polish, Golden Velvet Cushion",
    style: "Victorian Luxury",
    size: "9 Pieces (8 Chairs + 1 Table)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Acacia-Dining-Room-Furniture-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Sissoo-Wood-Glass-Top-Fancy-Dining-Table-600x420.jpg"
    ],
    status: "Available",
    categories: "Chair & Tables, Dining Room, Special Edition"
  },
  "arr-5": {
    id: "arr-5",
    title: "Shisham Wood Chase Ship Bedroom Chair",
    tmr: "614255",
    sku: "FH-10105",
    color: "Rosewood Mahogany, Emerald Velvet",
    material: "Solid Shisham Wood",
    polish: "Natural Gloss Polish, Quilted Velvet",
    style: "Ship Deck Chaise Lounge",
    size: "1 Piece",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Sissoo-Wood-Bedroom-Ship-Chair-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Chase-Lounge-Bedroom-Sofa-Chair-600x420.jpg"
    ],
    status: "Available",
    categories: "Chair & Tables, Sofa & Deewan, Sofa, Chair & Deewan"
  },
  "arr-6": {
    id: "arr-6",
    title: "Bergere Sissoo Wood Inlay Work Bedroom Chair Set",
    tmr: "614256",
    sku: "FH-10106",
    color: "Honey Oak, Brocade Floral Upholstery",
    material: "Sissoo Wood (Sheesham) with Ivory Wood Inlay",
    polish: "Inlay Lacquered Finish",
    style: "French Bergere Classic",
    size: "3 Pieces (2 Chairs + 1 Table)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Bergere-Chair-Set-In-Pakistan-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/High-Back-Shisham-Wood-Bedroom-Chair-600x420.jpg"
    ],
    status: "Available",
    categories: "Chair & Tables, Sofa, Chair & Deewan"
  },
  "arr-7": {
    id: "arr-7",
    title: "Sheesham Wood High Back Prince Red Velvet Bedroom Chair",
    tmr: "614257",
    sku: "FH-10107",
    color: "Deep Mahogany with Royal Crimson Red",
    material: "Solid Sheesham Wood",
    polish: "Satin Polish, High-density Foam & Royal Red Velvet",
    style: "Prince High-Back Royal",
    size: "1 Piece",
    images: [
      "https://i.pinimg.com/736x/fc/92/b8/fc92b87d8ba2c7aa252d8e162c624e7e.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/High-Back-Shisham-Wood-Bedroom-Chair-600x420.jpg"
    ],
    status: "Available",
    categories: "Chair & Tables, Sofa, Chair & Deewan"
  },
  "arr-8": {
    id: "arr-8",
    title: "Tri-Angular Solid Acacia Wood Table With 6 Carved Chairs",
    tmr: "614258",
    sku: "FH-10108",
    color: "Natural Acacia Honey Finish",
    material: "Solid Acacia Hardwood",
    polish: "Heat-Resistant Polyurethane Polish",
    style: "Rustic Tri-Angular Geometric",
    size: "7 Pieces (6 Chairs + 1 Table)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Triangular-6-Chairs-Dining-Table-Set-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Acacia-Dining-Room-Furniture-600x420.jpg"
    ],
    status: "Sold Out",
    categories: "Chair & Tables, Dining Room, Special Shapes"
  },
  "arr-9": {
    id: "arr-9",
    title: "High Living L Shape 7 Seater Velvet Full Gauge Solid Wood Sofa",
    tmr: "614259",
    sku: "FH-10109",
    color: "Taupe/Ash Grey Velvet",
    material: "Solid Keekar Wood Frame with Shisham Feet",
    polish: "Premium Velvet Tufted Poshish, Master Molty Foam",
    style: "Modern Chesterfield L-Shape",
    size: "7 Seater (3+2+1+Corner)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/8-Seater-Sofa-Set-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Chase-Lounge-Bedroom-Sofa-Chair-600x420.jpg"
    ],
    status: "Available",
    categories: "Sofa & Deewan, Sofa, Chair & Deewan"
  },
  "arr-10": {
    id: "arr-10",
    title: "Shisham Wood Chinioti Swing / Jhula with Brass Chains",
    tmr: "614260",
    sku: "FH-10110",
    color: "Antique Dark Walnut, Maroon Seat Cushion",
    material: "Premium Solid Shisham Wood, Solid Brass Chains",
    polish: "Chinioti Lacquer Shellac Polish, Velvet Cushion",
    style: "Royal Chinioti Handcrafted",
    size: "1 Jhula Unit (Includes Brass Chains)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Chinioti-Shisham-Wood-Jhola-600x420.jpg",
      "https://i.pinimg.com/1200x/8c/1d/64/8c1d6412275f03784cca7824e7f0c317.jpg"
    ],
    status: "Available",
    categories: "Swings & Jhulas, Traditional Lobby, Solid Wood"
  },
  "arr-11": {
    id: "arr-11",
    title: "Versace Inlay Crafted Sissoo Wood 3 Table Nest Set",
    tmr: "614261",
    sku: "FH-10111",
    color: "Rich Espresso, White Wood Inlay Pattern",
    material: "Solid Sissoo Wood (Sarsoot)",
    polish: "High-Gloss Inlay Polish",
    style: "Italian-Inspired Versace Inlay",
    size: "3-Piece Nest Set (Small, Medium, Large)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Versace-Shisham-Wood-3-Table-Net-Set-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Acacia-Dining-Room-Furniture-600x420.jpg"
    ],
    status: "Available",
    categories: "Tables & Nest, Living Room Accents"
  },
  "arr-12": {
    id: "arr-12",
    title: "Chinioti Crafted Silver Deco Moora Chair Set",
    tmr: "614262",
    sku: "FH-10112",
    color: "Deco Silver Paint, Silver Brocade Fabric",
    material: "Solid Shisham Wood Frame",
    polish: "Deco Paint Finish with Master Foam Seating",
    style: "Traditional Royal Moora",
    size: "3 Pieces (2 Moora Chairs + 1 Central Table)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Chinioti-Moora-Chair-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Bergere-Chair-Set-In-Pakistan-600x420.jpg"
    ],
    status: "Available",
    categories: "Chair & Tables, Sofa, Chair & Deewan"
  },
  "arr-13": {
    id: "arr-13",
    title: "Mughal Heritage Handcarved Solid Teak Console Mirror",
    tmr: "614263",
    sku: "FH-10113",
    color: "Golden Brown Teak Gloss",
    material: "Solid Burma Teak & Shisham Wood",
    polish: "Teak Varnish / French Polish",
    style: "Mughal Floral Carvings",
    size: "2 Pieces (1 Console Table + 1 Mirror Frame)",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Console-Shisham-Carved-Wood-600x420.jpg",
      "https://i.pinimg.com/1200x/3d/ee/3a/3dee3a37b91acc6c757dfb70e6e35f4d.jpg"
    ],
    status: "Available",
    categories: "Console & Mirrors, Lobby Entryway"
  },
  "arr-14": {
    id: "arr-14",
    title: "Royal Sovereign Double Cushion Sheesham Rocking Chair",
    tmr: "614264",
    sku: "FH-10114",
    color: "Chestnut Brown, Velvet Blue Cushion",
    material: "Solid Sheesham Wood",
    polish: "Hand-Waxed Polish, Double Padded Velvet Seating",
    style: "Sovereign Ergonomic Rocker",
    size: "1 Rocking Chair Unit",
    images: [
      "https://furnitureholz.com/wp-content/uploads/2021/04/Chase-Lounge-Bedroom-Sofa-Chair-600x420.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Sissoo-Wood-Bedroom-Ship-Chair-600x420.jpg"
    ],
    status: "Available",
    categories: "Chair & Tables, Sofa, Chair & Deewan"
  },
  "arr-15": {
    id: "arr-15",
    title: "Kalyar Geometric Lattice Carved Partition Screen",
    tmr: "614265",
    sku: "FH-10115",
    color: "Antique Dark Oak Finish",
    material: "Solid Sissoo Wood & Brass Pins",
    polish: "Natural Wax Lacquer Finish",
    style: "Kalyar Pinjrakari Lattice",
    size: "4-Panel Folding Screen",
    images: [
      "https://i.pinimg.com/1200x/8c/1d/64/8c1d6412275f03784cca7824e7f0c317.jpg",
      "https://furnitureholz.com/wp-content/uploads/2021/04/Console-Shisham-Carved-Wood-600x420.jpg"
    ],
    status: "Available",
    categories: "Partition Screens, Room Dividers"
  },
  "arr-16": {
    id: "arr-16",
    title: "Presidential Hand-Sculptured Walnut Dressing Table",
    tmr: "614266",
    sku: "FH-10116",
    color: "Bespoke Rich Walnut Finish, Gold Highlights",
    material: "Premium Solid Walnut & Shisham Wood",
    polish: "Satin Walnut Polish, Solid Wood Drawers",
    style: "Imperial Rococo Carvings",
    size: "2 Pieces (Dressing Table + Mirror Frame)",
    images: [
      "https://i.pinimg.com/1200x/b3/2c/13/b32c136f377ff5adbb10b7fb3c5d1f38.jpg",
      "https://i.pinimg.com/1200x/3d/ee/3a/3dee3a37b91acc6c757dfb70e6e35f4d.jpg"
    ],
    status: "Available",
    categories: "Dressing Tables, Vanity Suite, Bedroom Luxury"
  }
};

export default function Collections({ onSelectCollection }: CollectionsProps) {
  const [currentPage, setCurrentPage] = useState(0); // 0 or 1
  const [slideDirection, setSlideDirection] = useState(1); // 1 or -1
  const [activeInquiryItem, setActiveInquiryItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeDetailImage, setActiveDetailImage] = useState<string>('');

  const handleOpenProductDetail = (productId: string) => {
    setSelectedProduct(productId);
    const product = PRODUCTS_DATABASE[productId];
    if (product) {
      setActiveDetailImage(product.images[0]);
    }
  };

  // Form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [woodSelection, setWoodSelection] = useState('Pure Sheesham Wood (Tali)');
  const [specifications, setSpecifications] = useState('');

  const handleNextPage = () => {
    setSlideDirection(1);
    setCurrentPage((prev) => (prev === 0 ? 1 : 0));
    triggerNotification(`Showing ${currentPage === 0 ? 'second' : 'first'} batch of New Arrivals`);
  };

  const handlePrevPage = () => {
    setSlideDirection(-1);
    setCurrentPage((prev) => (prev === 1 ? 0 : 1));
    triggerNotification(`Showing ${currentPage === 1 ? 'first' : 'second'} batch of New Arrivals`);
  };

  const triggerNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleOpenInquiry = (itemName: string) => {
    setActiveInquiryItem(itemName);
  };

  const handleCloseInquiry = () => {
    setActiveInquiryItem(null);
    setClientName('');
    setClientPhone('');
    setSpecifications('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCloseInquiry();
    triggerNotification("Shukriya! Custom quotation request received. Our team will contact you via WhatsApp shortly.");
  };

  const handleCategoryAction = (cat: typeof SHOWROOM_CATEGORIES[0]) => {
    if (cat.categoryKey === 'interior-services') {
      const element = document.getElementById('interior-services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        triggerNotification("Navigated to Bespoke Interior Fitting Services");
      }
    } else {
      onSelectCollection(cat.categoryKey);
      triggerNotification(`Opening ${cat.title} Collection`);
    }
  };

  // 8 items per page (2 rows of 4)
  const visibleArrivals = currentPage === 0 ? NEW_ARRIVALS.slice(0, 8) : NEW_ARRIVALS.slice(8, 16);

  return (
    <section id="collections" className="py-24 border-b border-line bg-grain relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* ================= NEW ARRIVALS SECTION ================= */}
        <div id="new-arrivals-section" className="space-y-8">
          <div className="flex justify-between items-end border-b border-line/40 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block mb-1">Freshly Carved masterpieces</span>
              <h3 className="text-2xl md:text-4xl font-display font-semibold text-ivory uppercase tracking-tight">
                New Arrivals
              </h3>
              <p className="text-xs text-ivory-dim/70 mt-1 font-medium font-sans">
                Bespoke handmade pieces ready for booking
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevPage} 
                className="w-9 h-9 rounded-full border border-line hover:border-oak hover:bg-oak/10 text-ivory hover:text-oak flex items-center justify-center transition-all cursor-pointer bg-charcoal/40"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNextPage} 
                className="w-9 h-9 rounded-full border border-line hover:border-oak hover:bg-oak/10 text-ivory hover:text-oak flex items-center justify-center transition-all cursor-pointer bg-charcoal/40"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Products Grid with beautiful slide transition */}
          <div className="overflow-hidden relative p-1">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={currentPage}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              >
                {visibleArrivals.map((item) => (
                  <div
                    key={item.id}
                    className="group box-gradient rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between border border-line hover:border-oak/40"
                  >
                    <div 
                      onClick={() => handleOpenProductDetail(item.id)}
                      className="relative aspect-video overflow-hidden bg-stone-950 cursor-pointer"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100 cursor-pointer"
                        referrerPolicy="no-referrer"
                      />
                      {item.status === 'Sold Out' ? (
                        <span className="absolute top-3 right-3 bg-walnut text-[9px] text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-oak/30">
                          Sold Out
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 bg-[#151309]/80 backdrop-blur-md text-[9px] text-oak px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-line">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <h4 
                        onClick={() => handleOpenProductDetail(item.id)}
                        className="text-xs md:text-sm font-semibold text-ivory leading-snug group-hover:text-oak transition-colors min-h-[40px] font-sans cursor-pointer"
                      >
                        {item.name}
                      </h4>
                      {item.status === 'Sold Out' ? (
                        <button 
                          onClick={() => handleOpenInquiry(`${item.name} (Backorder Request)`)} 
                          className="w-full py-2 border border-line text-ivory-dim/60 hover:text-white hover:border-oak hover:bg-oak/10 text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg cursor-pointer"
                        >
                          Backorder Query
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleOpenInquiry(item.name)} 
                          className="w-full py-2 border-2 border-oak hover:bg-oak hover:text-charcoal text-oak text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg cursor-pointer"
                        >
                          Call For Price
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================= SHOWROOM SEGMENTS SECTION ================= */}
        <div id="catalog-grid" className="space-y-8 scroll-mt-24 pt-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage block">Shop by Room</span>
            <h3 className="text-3xl md:text-5xl font-display font-semibold text-ivory">
              Explore Showroom Segments
            </h3>
            <p className="text-ivory-dim/70 text-xs md:text-sm font-sans max-w-2xl mx-auto leading-relaxed">
              Aap k luxury visual reference k mutabiq har category ko real-world catalogs, item structures aur custom option grids k sath configure kia gya hai.
            </p>
          </div>

          {/* Custom Elegant Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOWROOM_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                onClick={() => handleCategoryAction(cat)}
                className="group cursor-pointer box-gradient rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-line"
              >
                <div className="relative h-64 overflow-hidden bg-stone-950">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-walnut text-ivory text-[10px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-oak/30">
                    {cat.subtitle}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-lg md:text-xl font-display font-semibold text-ivory tracking-wide group-hover:text-oak transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-ivory-dim/70 text-xs leading-relaxed font-sans min-h-[48px]">
                      {cat.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2.5 py-0.5 bg-charcoal/85 border border-line text-ivory-dim/65 rounded text-[9px] font-medium font-sans group-hover:border-oak/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button className="w-full py-3 bg-charcoal hover:bg-oak hover:text-charcoal border border-line text-ivory-dim group-hover:border-oak rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300">
                    {cat.categoryKey === 'interior-services' ? 'View Services' : 'View Full Collection'} &rarr;
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= TRUST BADGES SEGMENT ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-line/40">
          <div className="text-center p-4 space-y-2">
            <div className="text-oak font-display text-3xl font-semibold">100%</div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-ivory">Premium Hardwood</h5>
            <p className="text-ivory-dim/60 text-[11px] font-sans">Strictly use seasoned Sheesham & Golden Teak.</p>
          </div>
          <div className="text-center p-4 space-y-2">
            <div className="text-oak font-display text-3xl font-semibold">15 Year</div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-ivory">Termite Warranty</h5>
            <p className="text-ivory-dim/60 text-[11px] font-sans">Advanced pressure chemical kiln treatment.</p>
          </div>
          <div className="text-center p-4 space-y-2">
            <div className="text-oak font-display text-3xl font-semibold">Custom</div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-ivory">Made To Order</h5>
            <p className="text-ivory-dim/60 text-[11px] font-sans">Sizing & fabrics adjusted perfectly to your layout.</p>
          </div>
          <div className="text-center p-4 space-y-2">
            <div className="text-oak font-display text-3xl font-semibold">Safe</div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-ivory">Transit Padding</h5>
            <p className="text-ivory-dim/60 text-[11px] font-sans">Free delivery with absolute doorstep fitting.</p>
          </div>
        </div>

      </div>

      {/* ================= INQUIRY MODAL ================= */}
      <AnimatePresence>
        {activeInquiryItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseInquiry}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs"
            />

            {/* Modal Wrapper */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#151309] text-ivory shadow-2xl border border-oak/35 p-6 md:p-8 z-10 font-sans"
            >
              {/* Close Button */}
              <button 
                onClick={handleCloseInquiry} 
                className="absolute top-4 right-4 p-2 text-ivory-dim/50 hover:text-oak transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Heading */}
              <div className="space-y-2 mb-6 text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest text-oak uppercase">
                  Customization Inquiry
                </span>
                <h2 className="text-xl md:text-2xl font-display font-semibold text-ivory">
                  Inquire & Request Bespoke Quote
                </h2>
                <p className="text-xs text-ivory-dim/70 leading-relaxed">
                  Aap k selected variant, dimensions aur polish instructions ke mutabiq hamari team real-world quotation aur delivery timeline provide karegi.
                </p>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                    Selected Item Variant
                  </label>
                  <input 
                    type="text" 
                    value={activeInquiryItem} 
                    readOnly 
                    className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs font-semibold text-oak focus:outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ali Ahmed" 
                      className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs text-ivory focus:outline-none focus:border-oak transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                      WhatsApp / Phone *
                    </label>
                    <input 
                      type="tel" 
                      required 
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="03xx xxxxxxx" 
                      className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs text-ivory focus:outline-none focus:border-oak transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                    Primary Wood Selection
                  </label>
                  <select 
                    value={woodSelection}
                    onChange={(e) => setWoodSelection(e.target.value)}
                    className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs text-ivory focus:outline-none focus:border-oak transition-colors cursor-pointer"
                  >
                    <option>Pure Sheesham Wood (Tali)</option>
                    <option>Premium Golden Teak (Sagan)</option>
                    <option>Luxury Walnut / Ash Wood combo</option>
                    <option>Solid Pine / Deodar Wood</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-dim/70 mb-1.5">
                    Custom Polish & Dimensional Specifications
                  </label>
                  <textarea 
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    placeholder="Write dimensional requirements (e.g., 6ft x 6.5ft), fabric choice, or polish gloss requirements..." 
                    rows={3} 
                    className="w-full px-4 py-2.5 bg-charcoal border border-line rounded-lg text-xs text-ivory focus:outline-none focus:border-oak resize-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={handleCloseInquiry} 
                    className="px-5 py-2.5 bg-charcoal border border-line hover:bg-stone-900 text-ivory-dim rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-oak hover:bg-white text-charcoal font-bold rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= PRODUCT DETAILS OVERLAY MODAL ================= */}
      <AnimatePresence>
        {selectedProduct && PRODUCTS_DATABASE[selectedProduct] && (() => {
          const product = PRODUCTS_DATABASE[selectedProduct];
          return (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
              />

              {/* Modal Wrapper */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl rounded-3xl bg-[#151309] text-ivory shadow-2xl border border-oak/35 p-6 md:p-10 z-10 font-sans max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-oak/20"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="absolute top-4 right-4 p-2 text-ivory-dim/50 hover:text-oak transition-colors z-20 cursor-pointer"
                  aria-label="Close product details"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Main Content Container (Flex/Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  
                  {/* Left Side: Images Section */}
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line/40 bg-stone-950">
                      <img 
                        id="product-main-image"
                        src={activeDetailImage || product.images[0]} 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {product.status === 'Sold Out' ? (
                        <span className="absolute top-3 right-3 bg-walnut text-[9px] text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-oak/30">
                          Sold Out
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 bg-[#151309]/80 backdrop-blur-md text-[9px] text-oak px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-line">
                          {product.status}
                        </span>
                      )}
                    </div>
                    
                    {/* Thumbnail Container */}
                    <div className="flex gap-3 flex-wrap" id="thumb-container">
                      {product.images.map((imgUrl, idx) => (
                        <img 
                          key={idx}
                          src={imgUrl} 
                          alt={`${product.title} thumbnail ${idx + 1}`} 
                          onClick={() => setActiveDetailImage(imgUrl)}
                          className={`w-20 h-16 object-cover cursor-pointer border rounded-lg transition-all ${
                            (activeDetailImage || product.images[0]) === imgUrl 
                              ? 'border-oak scale-105 shadow-md bg-oak/10' 
                              : 'border-line/40 hover:border-oak/60 hover:scale-102'
                          }`}
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Details Section */}
                  <div className="flex flex-col justify-between space-y-6 text-left">
                    <div>
                      <h1 className="text-xl md:text-3xl font-display font-semibold text-ivory tracking-tight mb-2" id="product-title">
                        {product.title}
                      </h1>
                      <div className="text-xs font-mono text-sage mb-4 flex items-center gap-2">
                        <span>TMR #<span id="product-tmr" className="font-bold">{product.tmr}</span></span>
                        <span className="text-line/40">|</span>
                        <span>SKU: <span id="product-sku" className="font-bold">{product.sku}</span></span>
                      </div>

                      {product.status === 'Sold Out' ? (
                        <button 
                          onClick={() => {
                            setSelectedProduct(null);
                            handleOpenInquiry(`${product.title} (Backorder Request)`);
                          }}
                          className="px-6 py-3 bg-[#1e1c18] hover:bg-stone-900 border border-line text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md cursor-pointer mb-6"
                        >
                          Backorder Query
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            setSelectedProduct(null);
                            handleOpenInquiry(product.title);
                          }}
                          className="px-6 py-3 bg-oak hover:bg-white hover:text-charcoal text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md cursor-pointer mb-6"
                        >
                          Call For Price
                        </button>
                      )}

                      <ul className="space-y-2 text-xs md:text-sm text-ivory-dim/80 list-disc pl-4 leading-relaxed font-sans mb-6">
                        <li>Made of {product.material}</li>
                        {product.title.toLowerCase().includes('chair') || product.title.toLowerCase().includes('sofa') ? (
                          <>
                            <li>Molty Foam Seating & Stuffing</li>
                            <li>Velvet Quilted Upholstery/ Poshish</li>
                          </>
                        ) : null}
                        <li>Suitable for Bedroom, Lounge and Outdoor</li>
                        <li>Customer can Customize Fabric</li>
                        <li>Design May Vary Slightly from Given Picture</li>
                        <li>Prices are Negotiable</li>
                      </ul>
                    </div>

                    <div className="text-xs text-ivory-dim/60 font-mono space-y-1 pt-4 border-t border-line/40">
                      <div><strong>SKU:</strong> <span className="text-oak">{product.sku}</span></div>
                      <div><strong>Categories:</strong> <span className="text-sage">{product.categories}</span></div>
                    </div>
                  </div>

                </div>

                {/* Additional Information Section (Table) */}
                <div className="mt-12 pt-8 border-t border-line/40">
                  <div className="text-center font-mono font-medium text-xs tracking-widest text-oak uppercase mb-6">
                    Additional Information
                  </div>
                  
                  <div className="overflow-hidden rounded-xl border border-line/30 bg-charcoal/20">
                    <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
                      <tbody>
                        <tr className="border-b border-line/20 hover:bg-white/2">
                          <td className="p-4 w-1/3 font-bold uppercase text-[10px] tracking-wider text-ivory-dim/70">Color</td>
                          <td id="table-color" className="p-4 text-ivory">{product.color}</td>
                        </tr>
                        <tr className="border-b border-line/20 hover:bg-white/2">
                          <td className="p-4 font-bold uppercase text-[10px] tracking-wider text-ivory-dim/70">Material</td>
                          <td id="table-material" className="p-4 text-ivory">{product.material}</td>
                        </tr>
                        <tr className="border-b border-line/20 hover:bg-white/2">
                          <td className="p-4 font-bold uppercase text-[10px] tracking-wider text-ivory-dim/70">Polish/ Upholstery</td>
                          <td id="table-polish" className="p-4 text-ivory">{product.polish}</td>
                        </tr>
                        <tr className="border-b border-line/20 hover:bg-white/2">
                          <td className="p-4 font-bold uppercase text-[10px] tracking-wider text-ivory-dim/70">Style</td>
                          <td id="table-style" className="p-4 text-ivory">{product.style}</td>
                        </tr>
                        <tr className="hover:bg-white/2">
                          <td className="p-4 font-bold uppercase text-[10px] tracking-wider text-ivory-dim/70">Size/ Pieces</td>
                          <td id="table-size" className="p-4 text-ivory">{product.size}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* ================= TOAST STATUS BANNER ================= */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            className="fixed bottom-5 right-5 bg-[#151309] text-ivory px-5 py-4 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-3 z-50 border border-oak/30"
          >
            <div className="w-5 h-5 rounded-full bg-oak/20 text-oak flex items-center justify-center border border-oak/40 font-bold">✓</div>
            <span className="font-sans">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
