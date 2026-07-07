/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string; // 'living-room' | 'dining' | 'bedroom' | 'outdoor'
  price: number;
  originalPrice?: number;
  woodType: 'Sheesham' | 'Walnut' | 'Oak';
  materialDetails: string;
  image: string;
  badge?: string;
  description: string;
  dimensions: string;
  weight: string;
  buildTime: string;
  joinery: string;
}

export interface WoodProperty {
  name: string;
  latinName: string;
  hardness: string;
  grainPattern: string;
  colorRange: string;
  humidityResponse: string;
  bestFor: string;
}

export interface CustomConfig {
  id: string;
  baseProductId: string;
  baseProductName: string;
  woodType: 'Sheesham' | 'Walnut' | 'Oak';
  widthCm: number;
  lengthCm: number;
  heightCm: number;
  finish: 'Natural Oil & Beeswax' | 'Matte Polyurethane' | 'Charcoal Stain';
  brassInlay: boolean;
  carvingLevel: 'None' | 'Minimal' | 'Traditional';
  specialNotes?: string;
  calculatedPrice: number;
  calculatedWeightKg: number;
  estimatedWeeks: number;
}

export interface QuoteItem {
  id: string; // unique cart item ID
  product?: Product; // if standard product
  customConfig?: CustomConfig; // if custom product
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  productName: string;
  woodType?: string;
  date: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
