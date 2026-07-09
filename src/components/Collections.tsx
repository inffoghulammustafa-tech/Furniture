/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
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
  Sparkles,
  MapPin,
  Mail,
  ArrowLeft,
  ChevronUp,
  Home
} from 'lucide-react';

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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Sissoo-Wood-Glass-Top-Fancy-Dining-Table-600x420.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/High-Back-Shisham-Wood-Bedroom-Chair-600x420.jpg#flipped"
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
      "https://i.pinimg.com/1200x/3d/ee/3a/3dee3a37b91acc6c757dfb70e6e35f4d.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Acacia-Dining-Room-Furniture-600x420.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Sissoo-Wood-Bedroom-Ship-Chair-600x420.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Bergere-Chair-Set-In-Pakistan-600x420.jpg#flipped"
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
      "https://i.pinimg.com/736x/fc/92/b8/fc92b87d8ba2c7aa252d8e162c624e7e.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Triangular-6-Chairs-Dining-Table-Set-600x420.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/8-Seater-Sofa-Set-600x420.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Chinioti-Shisham-Wood-Jhola-600x420.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Versace-Shisham-Wood-3-Table-Net-Set-600x420.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Chinioti-Moora-Chair-600x420.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Console-Shisham-Carved-Wood-600x420.jpg#flipped"
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
      "https://furnitureholz.com/wp-content/uploads/2021/04/Chase-Lounge-Bedroom-Sofa-Chair-600x420.jpg#flipped"
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
      "https://i.pinimg.com/1200x/8c/1d/64/8c1d6412275f03784cca7824e7f0c317.jpg#flipped"
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
      "https://i.pinimg.com/1200x/b3/2c/13/b32c136f377ff5adbb10b7fb3c5d1f38.jpg#flipped"
    ],
    status: "Available",
    categories: "Dressing Tables, Vanity Suite, Bedroom Luxury"
  }
};

interface CollectionsProps {
  onSelectCollection: (category: string) => void;
  onOpenPrivacy?: () => void;
}

export default function Collections({ onSelectCollection, onOpenPrivacy }: CollectionsProps) {
  const [currentPage, setCurrentPage] = useState(0); // 0 or 1
  const [slideDirection, setSlideDirection] = useState(1); // 1 or -1

  const [activeInquiryItem, setActiveInquiryItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeDetailImage, setActiveDetailImage] = useState<string>('');
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [woodSelection, setWoodSelection] = useState('Pure Sheesham Wood (Tali)');
  const [specifications, setSpecifications] = useState('');

  const handleOpenProductDetail = (productId: string) => {
    setSelectedProduct(productId);
    const product = PRODUCTS_DATABASE[productId];
    if (product) {
      setActiveDetailImage(product.images[0]);
    }
  };

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

      {/* ================= INQUIRY COMPLETE PAGE (FAISALABAD SHOWROOMS) ================= */}
      <AnimatePresence>
        {activeInquiryItem && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            id="inquiry-full-page"
            className="fixed inset-0 z-[100] bg-white text-stone-900 overflow-y-auto w-full h-full font-sans flex flex-col justify-between"
          >
            {/* Elegant Header Navigation Bar */}
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 py-4 px-6 md:px-12 flex justify-between items-center">
              <button 
                onClick={handleCloseInquiry}
                className="group flex items-center gap-2.5 text-stone-600 hover:text-amber-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform text-amber-700" />
                <span>Back to Woodwork Portfolio</span>
              </button>
              
              <div className="hidden md:block text-center">
                <span className="text-[10px] font-bold text-amber-700 tracking-[0.2em] uppercase font-mono block">
                  HOLZCRAFT PREMIUM OUTLET
                </span>
              </div>

              <button 
                onClick={handleCloseInquiry}
                className="flex items-center gap-1.5 text-stone-400 hover:text-stone-900 border border-stone-200 hover:border-stone-400 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                aria-label="Close page"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </header>

            {/* Main Content Area */}
            <div className="flex-grow py-12 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-12">
              {/* Page Centered Heading */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-750 uppercase block">
                  OUR PHYSICAL TOUCHPOINTS
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-semibold text-stone-900 uppercase tracking-tight font-serif">
                  Faisalabad Showrooms
                </h1>
                <div className="w-16 h-0.5 bg-amber-700 mx-auto rounded-full" />
                <p className="text-xs md:text-sm text-stone-500 font-sans max-w-xl mx-auto leading-relaxed">
                  Experience the physical density and weight of seasoned solid Sheesham wood before you finalize your bespoke pricing order.
                </p>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Part: Showrooms Section (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Showrooms Cards List */}
                  <div className="space-y-8">
                    {/* Showroom 1: Main Branch */}
                    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="p-5 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-stone-800 uppercase tracking-wider">
                          1. Main Branch Showroom
                        </span>
                        <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-200/50 px-2.5 py-1 rounded uppercase font-bold font-mono">
                          AL-Madina Tower
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Storefront Image */}
                        <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-stone-100 relative border-r border-stone-200">
                          <img 
                            src="https://furnitureholz.com/wp-content/uploads/2024/07/furniture-holz.jpeg"
                            alt="Furniture Holz Main Branch"
                            className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-5">
                            <span className="text-[10px] text-white font-semibold uppercase tracking-widest font-mono">
                              Sheikhupura Rd Exterior
                            </span>
                          </div>
                        </div>
                        {/* Active Google Map */}
                        <div className="h-[220px] md:h-[280px] bg-stone-100 relative">
                          <iframe 
                            src="https://maps.google.com/maps?q=Furniture%20Holz%20Al-madina%20tower%20Sheikhupura%20Rd%20Faisalabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy"
                            title="Furniture Holz Main Branch Google Map"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Showroom 2: Executive Branch */}
                    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="p-5 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-stone-800 uppercase tracking-wider">
                          2. Executive Branch Showroom
                        </span>
                        <span className="text-[9px] bg-stone-200 text-stone-800 border border-stone-300 px-2.5 py-1 rounded uppercase font-bold font-mono">
                          D-Ground
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Storefront Image */}
                        <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-stone-100 relative border-r border-stone-200">
                          <img 
                            src="https://furnitureholz.com/wp-content/uploads/2024/07/furniture-holz-d-2.jpg"
                            alt="Furniture Holz Executive Branch"
                            className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-5">
                            <span className="text-[10px] text-white font-semibold uppercase tracking-widest font-mono">
                              D-Ground Storefront
                            </span>
                          </div>
                        </div>
                        {/* Active Google Map */}
                        <div className="h-[220px] md:h-[280px] bg-stone-100 relative">
                          <iframe 
                            src="https://maps.google.com/maps?q=Furniture%20Holz%20Basement%20SB%20Store%20Harianwala%20Chowk%20D-Ground%20Faisalabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy"
                            title="Furniture Holz Executive Branch Google Map"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part: Inquiry Callback Request Form (4 Cols) */}
                <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-md sticky top-24">
                  <div className="text-left space-y-1.5 pb-4 border-b border-stone-200">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-amber-800 uppercase block">
                      Bespoke Pricing
                    </span>
                    <h3 className="text-xl font-display font-semibold text-stone-950 font-serif">
                      Bespoke Quotation
                    </h3>
                    <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                      Aap k selected masterpiece ke specifications aur custom design changes k mutabiq direct premium pricing quotation share ki jaey gi.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left font-sans">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        Inquiring Item
                      </label>
                      <input 
                        type="text" 
                        value={activeInquiryItem} 
                        readOnly 
                        className="w-full px-4 py-2.5 bg-stone-100 border border-stone-300 rounded-xl text-xs font-bold text-amber-800 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        Your Name *
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ali Ahmed" 
                        className="w-full px-4 py-2.5 bg-white border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl text-xs text-stone-850 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        WhatsApp Number *
                      </label>
                      <input 
                        type="tel" 
                        required 
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g., 0322 6638762" 
                        className="w-full px-4 py-2.5 bg-white border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl text-xs text-stone-850 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        Timber Choice
                      </label>
                      <select 
                        value={woodSelection}
                        onChange={(e) => setWoodSelection(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl text-xs text-stone-850 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option>Pure Sheesham Wood (Tali)</option>
                        <option>Premium Golden Teak (Sagan)</option>
                        <option>Luxury Walnut / Ash Wood combo</option>
                        <option>Solid Pine / Deodar Wood</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        Specifications (Size, Fabric, Color)
                      </label>
                      <textarea 
                        value={specifications}
                        onChange={(e) => setSpecifications(e.target.value)}
                        placeholder="E.g., Size 6ft x 6.5ft, royal red velvet seating, walnut dark polish gloss..." 
                        rows={3} 
                        className="w-full px-4 py-2.5 bg-white border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl text-xs text-stone-850 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <button 
                        type="submit" 
                        className="w-full py-3 bg-amber-800 hover:bg-stone-900 text-white font-bold rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                      >
                        Send Callback Request
                      </button>

                      {/* Direct WhatsApp Action Button */}
                      <a 
                        href={`https://wa.me/923226638762?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20the%20price%20of%20"${encodeURIComponent(activeInquiryItem || '')}"`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </form>
                </div>

              </div>

              {/* ================= BESPOKE AND CONTACT DETAILS ROW (Matching the user's provided image) ================= */}
              <div className="pt-12 border-t border-stone-200" id="bespoke-contact-info-section">
                <div className="bg-stone-50/85 rounded-[2.5rem] p-8 md:p-12 border border-stone-200/50 shadow-sm flex flex-col justify-center items-center">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center">
                    
                    {/* ADDRESS COLUMN */}
                    <div className="flex flex-col items-center space-y-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="p-3 bg-white rounded-full shadow-sm border border-stone-100/80 text-stone-900"
                      >
                        <Home className="w-6 h-6 stroke-[1.25]" />
                      </motion.div>
                      <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] text-stone-950 uppercase">
                        ADDRESS
                      </h4>
                      <div className="space-y-3 text-xs text-stone-600 font-sans leading-relaxed max-w-sm">
                        <p>
                          <span className="font-bold text-stone-900 block md:inline">Main Branch: </span>
                          AL-madina tower, Sheikhupura Rd, Near Misaq-ul-mall, Faisalabad
                        </p>
                        <p>
                          <span className="font-bold text-stone-900 block md:inline">Executive Branch: </span>
                          Basement SB Store, Harianwala Chowk, D-Ground, Faisalabad
                        </p>
                      </div>
                    </div>

                    {/* PHONE NUMBER COLUMN */}
                    <div className="flex flex-col items-center space-y-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="p-3 bg-white rounded-full shadow-sm border border-stone-100/80 text-stone-900"
                      >
                        <Phone className="w-6 h-6 stroke-[1.25]" />
                      </motion.div>
                      <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] text-stone-950 uppercase">
                        PHONE NUMBER
                      </h4>
                      <div className="space-y-2.5 text-xs text-stone-600 font-sans leading-relaxed">
                        <a 
                          href="tel:03041111857"
                          className="block font-medium hover:text-amber-800 transition-colors font-sans text-stone-700"
                        >
                          UAN 0304 1111857
                        </a>
                        <a 
                          href="https://wa.me/923226638762" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-emerald-700 transition-all duration-200 bg-white border border-stone-200/60 rounded-full px-4 py-1.5 shadow-xs"
                        >
                          <svg className="w-4 h-4 text-emerald-600 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.489 0 9.954-4.466 9.957-9.96.002-2.661-1.026-5.163-2.897-7.037C16.562 1.733 14.067.702 11.4.701c-5.493 0-9.96 4.467-9.963 9.962-.001 2.015.525 3.987 1.524 5.734L1.932 20.33l4.715-1.176zM18.14 14.8c-.34-.17-2.01-.99-2.321-1.1-.31-.11-.537-.17-.76.17-.223.34-.863 1.1-.1 1.3.18.2.36.23.68.06.32-.17 1.34-.49 2.56-1.58.95-.85 1.6-1.9 1.78-2.24.18-.34.02-.52-.15-.69-.15-.15-.34-.39-.5-.59-.16-.2-.22-.34-.33-.57-.11-.23-.06-.43.03-.6.09-.17.76-1.84 1.05-2.54.28-.68.56-.59.76-.6.2-.01.43-.01.66-.01.23 0 .61.09.93.43.32.34 1.22 1.19 1.22 2.91s-1.25 3.38-1.42 3.61c-.17.23-2.45 3.74-5.93 5.24-1.14.49-2.03.78-2.73.99-.85.27-1.63.23-2.24.14-.68-.1-2.01-.82-2.29-1.57-.28-.75-.28-1.39-.2-1.52.08-.13.3-.23.64-.4z"/>
                          </svg>
                          <span className="font-mono text-stone-900 font-semibold text-[13px] tracking-tight">0322-6638762</span>
                        </a>
                      </div>
                    </div>

                    {/* EMAIL COLUMN */}
                    <div className="flex flex-col items-center space-y-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="p-3 bg-white rounded-full shadow-sm border border-stone-100/80 text-stone-900"
                      >
                        <Mail className="w-6 h-6 stroke-[1.25]" />
                      </motion.div>
                      <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] text-stone-950 uppercase">
                        EMAIL
                      </h4>
                      <div className="text-xs text-stone-600 font-sans leading-relaxed">
                        <a 
                          href="mailto:info@furnitureholz.com"
                          className="hover:text-amber-800 transition-colors duration-200 font-medium tracking-wide block text-stone-750"
                        >
                          info@furnitureholz.com
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* ================= UNIFIED SHOWROOMS FOOTER (Styled exactly as in the user's first image with animations) ================= */}
            <footer className="w-full bg-[#1c1c1c] text-stone-300 border-t border-stone-800 pt-16 pb-10 px-6 md:px-12 font-sans">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-left items-start pb-12 border-b border-stone-800/80">
                
                {/* Column 1: Logo & Social Media Icons */}
                <div className="md:col-span-4 space-y-6">
                  <div className="group inline-block">
                    <Logo className="w-28 h-auto transition-all duration-300 group-hover:scale-105" />
                  </div>
                  
                  {/* Social Media Links from Image 1 */}
                  <div className="flex items-center gap-5 pt-2 text-stone-400">
                    <a 
                      href="https://facebook.com/furnitureholz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-amber-500 hover:scale-125 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center" 
                      title="Facebook"
                    >
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://tiktok.com/@furnitureholz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-amber-500 hover:scale-125 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center" 
                      title="TikTok"
                    >
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31 0 2.583.397 3.655 1.13-.564.602-1.024 1.336-1.373 2.141-.75-.688-1.428-1.365-2.282-1.552-.459-.42-.713-.984-.713-1.603 0-.038.006-.076.013-.116zM18.68 5.88c-1.29.02-2.52-.45-3.48-1.31.07.7.07 1.41-.01 2.11.7.59 1.58.94 2.5.96V5.88zm-7.18 8.12V0H8.24c0 .85-.35 1.66-.96 2.27-.61.61-1.42.98-2.27 1.01v3.26c1.24-.03 2.4-.62 3.24-1.61v9.07c0 1.52-1.23 2.75-2.75 2.75S3 15.52 3 14s1.23-2.75 2.75-2.75c.32 0 .63.06.92.17V8.12A7.52 7.52 0 0 0 5.75 8C2.57 8 .1 10.47.1 13.65s2.47 5.65 5.65 5.65 5.65-2.47 5.65-5.65c0-.02 0-.04-.01-.06z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://youtube.com/c/furnitureholz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-amber-500 hover:scale-125 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center" 
                      title="YouTube"
                    >
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com/furnitureholz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-amber-500 hover:scale-125 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center" 
                      title="Instagram"
                    >
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://pinterest.com/furnitureholz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-amber-500 hover:scale-125 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center" 
                      title="Pinterest"
                    >
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.715-.359-1.777c0-1.663.967-2.905 2.167-2.905 1.024 0 1.517.769 1.517 1.689 0 1.029-.654 2.57-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.76-2.245 3.76-5.487 0-2.869-2.062-4.878-5.008-4.878-3.411 0-5.413 2.561-5.413 5.2 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.983-5.367 11.983-11.987C24 5.367 18.637 0 12.017 0z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com/company/furnitureholz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-amber-500 hover:scale-125 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center" 
                      title="LinkedIn"
                    >
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Column 2: Links */}
                <div className="md:col-span-3 space-y-4">
                  <span className="text-white font-bold text-xs tracking-[0.2em] font-mono uppercase block border-b border-stone-800 pb-2.5">
                    Links
                  </span>
                  <div className="space-y-2.5">
                    <button 
                      onClick={() => {
                        const el = document.getElementById('inquiry-full-page');
                        if (el) {
                          el.scrollTo({ top: 300, behavior: 'smooth' });
                        }
                      }}
                      className="hover:text-amber-500 hover:translate-x-1.5 transition-all duration-300 block text-stone-400 text-sm py-0.5 text-left font-sans cursor-pointer w-full"
                    >
                      Contact Us
                    </button>
                    <button 
                      onClick={() => {
                        if (onOpenPrivacy) {
                          onOpenPrivacy();
                        } else {
                          setShowPrivacy(true);
                        }
                        triggerNotification("Opening Privacy Policy");
                      }}
                      className="hover:text-amber-500 hover:translate-x-1.5 transition-all duration-300 block text-stone-400 text-sm py-0.5 font-sans cursor-pointer text-left w-full"
                    >
                      Privacy Policy
                    </button>
                  </div>
                </div>

                {/* Column 3: Address (With exact text & info@furnitureholz.com opening website in new tab) */}
                <div className="md:col-span-5 space-y-4">
                  <span className="text-white font-bold text-xs tracking-[0.2em] font-mono uppercase block border-b border-stone-800 pb-2.5">
                    Address
                  </span>
                  <div className="space-y-3.5 text-sm text-stone-400">
                    <div className="flex items-start gap-3 group/item">
                      <span className="p-1.5 rounded-lg bg-stone-800/60 text-amber-500 group-hover/item:bg-amber-800 group-hover/item:text-white transition-colors duration-300 mt-0.5 flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <span className="leading-relaxed">
                        AL-Madina Tower, Sheikhupura Road, Near Misaq-ul-Mall, Faisalabad
                      </span>
                    </div>

                    {/* Email Link opening furnitureholz.com in a new tab as requested */}
                    <div className="flex items-start gap-3 group/item">
                      <span className="p-1.5 rounded-lg bg-stone-800/60 text-amber-500 group-hover/item:bg-amber-800 group-hover/item:text-white transition-colors duration-300 mt-0.5 flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </span>
                      <a 
                        href="https://furnitureholz.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-amber-500 font-bold transition-all duration-300 relative py-0.5 block group/link"
                        title="Open official website in new tab"
                      >
                        info@furnitureholz.com
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-amber-500 origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                      </a>
                    </div>

                    <div className="flex items-start gap-3 group/item">
                      <span className="p-1.5 rounded-lg bg-stone-800/60 text-amber-500 group-hover/item:bg-amber-800 group-hover/item:text-white transition-colors duration-300 mt-0.5 flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </span>
                      <a 
                        href="tel:03041111857"
                        className="hover:text-amber-500 font-mono transition-all duration-300 py-0.5 block"
                      >
                        UAN 0304 1111857
                      </a>
                    </div>

                    {/* Whatsapp with wa.me link */}
                    <div className="flex items-start gap-3 group/item">
                      <span className="p-1.5 rounded-lg bg-stone-800/60 text-emerald-500 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors duration-300 mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.489 0 9.954-4.466 9.957-9.96.002-2.661-1.026-5.163-2.897-7.037C16.562 1.733 14.067.702 11.4.701c-5.493 0-9.96 4.467-9.963 9.962-.001 2.015.525 3.987 1.524 5.734L1.932 20.33l4.715-1.176zM18.14 14.8c-.34-.17-2.01-.99-2.321-1.1-.31-.11-.537-.17-.76.17-.223.34-.863 1.1-.1 1.3.18.2.36.23.68.06.32-.17 1.34-.49 2.56-1.58.95-.85 1.6-1.9 1.78-2.24.18-.34.02-.52-.15-.69-.15-.15-.34-.39-.5-.59-.16-.2-.22-.34-.33-.57-.11-.23-.06-.43.03-.6.09-.17.76-1.84 1.05-2.54.28-.68.56-.59.76-.6.2-.01.43-.01.66-.01.23 0 .61.09.93.43.32.34 1.22 1.19 1.22 2.91s-1.25 3.38-1.42 3.61c-.17.23-2.45 3.74-5.93 5.24-1.14.49-2.03.78-2.73.99-.85.27-1.63.23-2.24.14-.68-.1-2.01-.82-2.29-1.57-.28-.75-.28-1.39-.2-1.52.08-.13.3-.23.64-.4z"/>
                        </svg>
                      </span>
                      <a 
                        href="https://wa.me/923276235300" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-amber-500 font-mono transition-all duration-300 py-0.5 block"
                      >
                        Whatsapp: 0327 6235300
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Bottom Strip */}
              <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 font-sans gap-4">
                <span>© furnitureholz.com – All Rights Reserved. Powered by Infinity Studios</span>
                
                {/* Scroll to Top button */}
                <button 
                  onClick={() => {
                    const el = document.getElementById('inquiry-full-page');
                    if (el) {
                      el.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="p-2.5 bg-stone-800 border border-stone-700 hover:border-amber-500 text-stone-400 hover:text-amber-500 rounded-full transition-all duration-300 cursor-pointer shadow-md hover:-translate-y-0.5"
                  title="Scroll to top of inquiry page"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </footer>
          </motion.div>
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
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line/40 bg-stone-950 group">
                      {(() => {
                        const currentImg = activeDetailImage || product.images[0];
                        const isFlipped = currentImg.endsWith('#flipped');
                        return (
                          <img 
                            id="product-main-image"
                            src={currentImg} 
                            alt={product.title} 
                            className={`w-full h-full object-cover transition-all duration-500 ease-out cursor-zoom-in origin-center ${
                              isFlipped 
                                ? 'scale-x-[-1] hover:scale-x-[-1.25] hover:scale-y-[1.25]' 
                                : 'scale-100 hover:scale-125'
                            }`}
                            referrerPolicy="no-referrer"
                          />
                        );
                      })()}
                      
                      {/* View Indicator Badge on Main Image */}
                      <div className="absolute bottom-3 left-3 bg-[#151309]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-mono border border-line tracking-wider text-sage uppercase">
                        🔍 Hover to Zoom
                      </div>

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
                      {product.images.map((imgUrl, idx) => {
                        const isActive = (activeDetailImage || product.images[0]) === imgUrl;
                        const isThumbFlipped = imgUrl.endsWith('#flipped');
                        return (
                          <button 
                            key={idx}
                            onClick={() => setActiveDetailImage(imgUrl)}
                            className={`relative w-24 h-16 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                              isActive 
                                ? 'border-oak ring-1 ring-oak shadow-md bg-oak/10 scale-105' 
                                : 'border-line/40 hover:border-oak/60'
                            }`}
                          >
                            <img 
                              src={imgUrl} 
                              alt={`${product.title} view ${idx + 1}`} 
                              className={`w-full h-full object-cover ${isThumbFlipped ? 'scale-x-[-1]' : ''}`}
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-1 right-1 text-[8px] bg-stone-950/90 text-ivory/90 px-1 py-0.5 rounded font-mono leading-none border border-line/40">
                              {idx === 0 ? 'Front View' : 'Left Angle'}
                            </span>
                          </button>
                        );
                      })}
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

      {/* ================= PRIVACY POLICY MODAL ================= */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 bg-stone-950/85 backdrop-blur-md z-55 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
            {/* Backdrop click close */}
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setShowPrivacy(false)} 
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#151309] text-ivory shadow-2xl border border-oak/35 p-6 md:p-10 z-10 max-h-[85vh] flex flex-col"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowPrivacy(false)} 
                className="absolute top-5 right-5 p-2 text-ivory-dim/50 hover:text-oak hover:bg-white/5 rounded-full transition-all duration-300 z-20 cursor-pointer"
                aria-label="Close Privacy Policy"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-6 pb-4 border-b border-line/40 flex-shrink-0">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-oak block mb-1">Company Information</span>
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-ivory uppercase tracking-tight flex items-center gap-3">
                  <span className="p-1.5 bg-oak/10 text-oak rounded-xl border border-oak/30 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </span>
                  Privacy Policy
                </h2>
                <p className="text-xs text-ivory-dim/60 mt-1.5">
                  Last updated: July 2026 • Furniture Holz Official
                </p>
              </div>

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto pr-2 md:pr-4 space-y-6 text-sm text-ivory-dim/80 leading-relaxed font-sans max-h-[60vh] scrollbar-thin scrollbar-thumb-oak/20 scrollbar-track-transparent">
                <p>
                  This privacy policy sets out how <strong className="text-ivory font-bold">Furniture Holz</strong> uses and protects any information that you give to Furniture Holz when you use this website.
                </p>

                <p>
                  Furniture Holz is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
                </p>

                <p>
                  Furniture Holz may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
                </p>

                <div className="space-y-3 pt-3 border-t border-line/20">
                  <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono">What we collect</h3>
                  <p>We may collect the following information:</p>
                  <ul className="list-disc pl-5 space-y-2 text-ivory-dim/95">
                    <li>Name and payment details</li>
                    <li>Contact information including email address</li>
                    <li>Demographic information such as postcode, preferences and interests</li>
                    <li>Other information relevant to customer surveys and/or offers</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-3 border-t border-line/20">
                  <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono">What we do with the information we gather</h3>
                  <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
                  <ul className="list-disc pl-5 space-y-2.5 text-ivory-dim/95">
                    <li>To process your order and obtain payment</li>
                    <li>Internal record keeping</li>
                    <li>We may use the information to improve our products and services</li>
                    <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided</li>
                    <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-3 border-t border-line/20">
                  <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono">Security</h3>
                  <p>
                    We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-line/20">
                  <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono">How we use cookies</h3>
                  <p>
                    A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
                  </p>
                  <p>
                    We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
                  </p>
                  <p>
                    Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
                  </p>
                  <p>
                    You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-line/20">
                  <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono">Links to other websites</h3>
                  <p>
                    Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-line/20">
                  <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono">Data aggregation, analytics and profile creation</h3>
                  <p>
                    We may analyse your browsing behaviour to draw inferences and create profiles about your personal preferences and behaviours. We may then use such information for the purposes described below:
                  </p>
                  <div className="pl-4 border-l border-oak/30 space-y-3 text-ivory-dim/90">
                    <p className="font-semibold text-ivory">Behavioural advertising and cross platform targeting</p>
                    <div>
                      <p className="font-bold text-oak text-xs uppercase font-mono">(a) Served by us</p>
                      <p className="pl-2 mt-1">We may use your information (including profile data) to serve you with advertising, which is relevant to you, on our websites and the websites of third parties.</p>
                    </div>
                    <div>
                      <p className="font-bold text-oak text-xs uppercase font-mono">(b) Served by third parties on our websites</p>
                      <p className="pl-2 mt-1">Advertisers or other third parties using our website may also engage in behavioural advertising and use cookies and web beacons in the manner described above. We do not control these advertisers or other parties’ use of cookies or web beacons or what they do with the information they collect.</p>
                    </div>
                    <div>
                      <p className="font-bold text-oak text-xs uppercase font-mono">(c) Served by third parties on third party websites</p>
                      <p className="pl-2 mt-1">We may provide your personal information (including profile data) to third parties who may then use it in combination with personal information that they have collected from you to serve you with relevant advertising on third party websites.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-line/20">
                  <h3 className="text-base font-semibold text-oak uppercase tracking-wider font-mono">Controlling your personal information</h3>
                  <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
                  <ul className="list-disc pl-5 space-y-2 text-ivory-dim/95">
                    <li>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
                    <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us</li>
                    <li>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</li>
                    <li>You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please write to us.</li>
                    <li>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible. We will promptly correct any information found to be incorrect.</li>
                  </ul>
                </div>
              </div>

              {/* Footer inside Modal */}
              <div className="mt-6 pt-4 border-t border-line/40 flex justify-between items-center text-[11px] text-ivory-dim/50 font-mono flex-shrink-0">
                <span>© FURNITURE HOLZ LEGAL DEPT</span>
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="px-4 py-2 bg-oak/10 hover:bg-oak text-oak hover:text-white rounded-lg border border-oak/30 transition-all duration-300 font-sans font-bold uppercase tracking-wider text-[10px] cursor-pointer"
                >
                  Understood & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
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
