/**
 * Food Database Model
 * Comprehensive food database for nutrition calculations and meal planning
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IFood extends Document {
  name: string;
  category: string;
  brand?: string;
  
  // Nutritional information per 100g
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    sugar: number;
    sodium: number;
    vitamins: {
      vitaminA?: number;
      vitaminC?: number;
      vitaminD?: number;
      vitaminE?: number;
      vitaminK?: number;
      vitaminB12?: number;
    };
    minerals: {
      calcium?: number;
      iron?: number;
      magnesium?: number;
      potassium?: number;
      zinc?: number;
    };
  };
  
  // Food properties
  allergens: string[];
  dietaryTags: string[]; // vegetarian, vegan, gluten-free, etc.
  glycemicIndex?: number;
  
  // Serving information
  servingSizes: {
    unit: string; // cup, piece, gram, etc.
    weight: number; // in grams
  }[];
  
  // Administrative
  isVerified: boolean;
  addedBy: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

const FoodSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'fruits',
      'vegetables',
      'grains',
      'proteins',
      'dairy',
      'nuts_seeds',
      'beverages',
      'snacks',
      'condiments',
      'oils_fats',
      'herbs_spices',
    ],
  },
  brand: String,
  
  nutrition: {
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    fiber: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 },
    
    vitamins: {
      vitaminA: Number,
      vitaminC: Number,
      vitaminD: Number,
      vitaminE: Number,
      vitaminK: Number,
      vitaminB12: Number,
    },
    
    minerals: {
      calcium: Number,
      iron: Number,
      magnesium: Number,
      potassium: Number,
      zinc: Number,
    },
  },
  
  allergens: [String],
  dietaryTags: [String],
  glycemicIndex: {
    type: Number,
    min: 0,
    max: 100,
  },
  
  servingSizes: [{
    unit: String,
    weight: Number,
  }],
  
  isVerified: {
    type: Boolean,
    default: false,
  },
  addedBy: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin',
  },
}, {
  timestamps: true,
});

// Indexes for search and filtering
FoodSchema.index({ name: 'text' });
FoodSchema.index({ category: 1 });
FoodSchema.index({ dietaryTags: 1 });
FoodSchema.index({ isVerified: 1 });

export default mongoose.models.Food || mongoose.model<IFood>('Food', FoodSchema);