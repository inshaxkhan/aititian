/**
 * User Model
 * Defines the user schema with comprehensive health and profile information
 */

import mongoose, { Document, Schema } from 'mongoose';

// Interface for TypeScript type safety
export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  image?: string;
  provider: 'credentials' | 'google';
  
  // Profile Information
  profile: {
    age?: number;
    weight?: number; // in kg
    height?: number; // in cm
    gender: 'male' | 'female' | 'other';
    activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  };
  
  // Health Goals
  healthGoals: {
    primaryGoal: 'weight_loss' | 'weight_gain' | 'maintenance' | 'muscle_gain';
    targetWeight?: number;
    timeframe?: number; // in weeks
  };
  
  // Medical Information
  medicalInfo: {
    allergies: string[];
    conditions: string[]; // diabetes, hypertension, etc.
    medications: string[];
    dietaryRestrictions: string[]; // vegetarian, vegan, keto, etc.
  };
  
  // Calculated Health Metrics
  healthMetrics: {
    bmi?: number;
    bmr?: number; // Basal Metabolic Rate
    bodyFatPercentage?: number;
    dailyCalorieNeeds?: number;
    riskLevel?: 'low' | 'moderate' | 'high';
  };
  
  // Preferences
  preferences: {
    notifications: {
      meals: boolean;
      water: boolean;
      motivation: boolean;
    };
    mealTimes: {
      breakfast: string;
      lunch: string;
      dinner: string;
      snacks: string[];
    };
  };
  
  // Subscription and Status
  subscription: {
    plan: 'free' | 'premium';
    expiresAt?: Date;
  };
  
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema Definition
const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function(this: IUser) {
      return this.provider === 'credentials';
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  provider: {
    type: String,
    enum: ['credentials', 'google'],
    default: 'credentials',
  },
  
  profile: {
    age: {
      type: Number,
      min: 13,
      max: 120,
    },
    weight: {
      type: Number,
      min: 20,
      max: 500,
    },
    height: {
      type: Number,
      min: 100,
      max: 250,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'],
      default: 'moderately_active',
    },
  },
  
  healthGoals: {
    primaryGoal: {
      type: String,
      enum: ['weight_loss', 'weight_gain', 'maintenance', 'muscle_gain'],
      default: 'maintenance',
    },
    targetWeight: Number,
    timeframe: Number,
  },
  
  medicalInfo: {
    allergies: [String],
    conditions: [String],
    medications: [String],
    dietaryRestrictions: [String],
  },
  
  healthMetrics: {
    bmi: Number,
    bmr: Number,
    bodyFatPercentage: Number,
    dailyCalorieNeeds: Number,
    riskLevel: {
      type: String,
      enum: ['low', 'moderate', 'high'],
    },
  },
  
  preferences: {
    notifications: {
      meals: { type: Boolean, default: true },
      water: { type: Boolean, default: true },
      motivation: { type: Boolean, default: true },
    },
    mealTimes: {
      breakfast: { type: String, default: '08:00' },
      lunch: { type: String, default: '13:00' },
      dinner: { type: String, default: '19:00' },
      snacks: [{ type: String }],
    },
  },
  
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
    },
    expiresAt: Date,
  },
  
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: Date,
}, {
  timestamps: true,
});

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ 'subscription.plan': 1 });
UserSchema.index({ isActive: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);