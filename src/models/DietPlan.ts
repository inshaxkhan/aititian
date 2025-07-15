/**
 * Diet Plan Model
 * Stores AI-generated personalized diet plans for users
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IDietPlan extends Document {
  userId: mongoose.Types.ObjectId;
  planName: string;
  duration: number; // in days
  totalCalories: number;
  macronutrients: {
    protein: number; // in grams
    carbs: number;
    fats: number;
    fiber: number;
  };
  
  meals: {
    breakfast: IMeal[];
    lunch: IMeal[];
    dinner: IMeal[];
    snacks: IMeal[];
  };
  
  aiRecommendations: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMeal {
  name: string;
  ingredients: string[];
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  preparationTime: number; // in minutes
  instructions: string[];
  tags: string[]; // vegetarian, gluten-free, etc.
}

const MealSchema: Schema = new Schema({
  name: { type: String, required: true },
  ingredients: [String],
  calories: { type: Number, required: true },
  macros: {
    protein: Number,
    carbs: Number,
    fats: Number,
  },
  preparationTime: Number,
  instructions: [String],
  tags: [String],
});

const DietPlanSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 365,
  },
  totalCalories: {
    type: Number,
    required: true,
  },
  macronutrients: {
    protein: Number,
    carbs: Number,
    fats: Number,
    fiber: Number,
  },
  meals: {
    breakfast: [MealSchema],
    lunch: [MealSchema],
    dinner: [MealSchema],
    snacks: [MealSchema],
  },
  aiRecommendations: String,
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes
DietPlanSchema.index({ userId: 1, isActive: 1 });
DietPlanSchema.index({ createdAt: -1 });

export default mongoose.models.DietPlan || mongoose.model<IDietPlan>('DietPlan', DietPlanSchema);