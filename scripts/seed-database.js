/**
 * Database Seeding Script
 * Populates the database with initial data for development
 * Usage: node scripts/seed-database.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Import models
const User = require('../src/models/User').default;
const Food = require('../src/models/Food').default;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

/**
 * Sample food data for the food database
 */
const sampleFoods = [
  {
    name: 'Chicken Breast',
    category: 'proteins',
    nutrition: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fats: 3.6,
      fiber: 0,
      sugar: 0,
      sodium: 74,
    },
    allergens: [],
    dietaryTags: ['high-protein', 'low-carb'],
    servingSizes: [
      { unit: '100g', weight: 100 },
      { unit: 'piece', weight: 150 },
    ],
    isVerified: true,
  },
  {
    name: 'Brown Rice',
    category: 'grains',
    nutrition: {
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fats: 0.9,
      fiber: 1.8,
      sugar: 0.4,
      sodium: 5,
    },
    allergens: [],
    dietaryTags: ['whole-grain', 'gluten-free'],
    servingSizes: [
      { unit: '100g', weight: 100 },
      { unit: 'cup', weight: 195 },
    ],
    isVerified: true,
  },
  {
    name: 'Avocado',
    category: 'fruits',
    nutrition: {
      calories: 160,
      protein: 2,
      carbs: 9,
      fats: 15,
      fiber: 7,
      sugar: 0.7,
      sodium: 7,
    },
    allergens: [],
    dietaryTags: ['healthy-fats', 'keto-friendly', 'vegan'],
    servingSizes: [
      { unit: '100g', weight: 100 },
      { unit: 'medium', weight: 150 },
    ],
    isVerified: true,
  },
  {
    name: 'Greek Yogurt',
    category: 'dairy',
    nutrition: {
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fats: 0.4,
      fiber: 0,
      sugar: 3.2,
      sodium: 36,
    },
    allergens: ['dairy'],
    dietaryTags: ['high-protein', 'probiotic'],
    servingSizes: [
      { unit: '100g', weight: 100 },
      { unit: 'cup', weight: 245 },
    ],
    isVerified: true,
  },
  {
    name: 'Spinach',
    category: 'vegetables',
    nutrition: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fats: 0.4,
      fiber: 2.2,
      sugar: 0.4,
      sodium: 79,
    },
    allergens: [],
    dietaryTags: ['leafy-green', 'iron-rich', 'vegan'],
    servingSizes: [
      { unit: '100g', weight: 100 },
      { unit: 'cup', weight: 30 },
    ],
    isVerified: true,
  },
];

/**
 * Sample user data for testing
 */
const sampleUsers = [
  {
    email: 'demo@aititian.com',
    name: 'Demo User',
    provider: 'credentials',
    profile: {
      age: 28,
      weight: 70,
      height: 175,
      gender: 'male',
      activityLevel: 'moderately_active',
    },
    healthGoals: {
      primaryGoal: 'maintenance',
      targetWeight: 70,
      timeframe: 12,
    },
    medicalInfo: {
      allergies: [],
      conditions: [],
      medications: [],
      dietaryRestrictions: [],
    },
    preferences: {
      notifications: {
        meals: true,
        water: true,
        motivation: true,
      },
      mealTimes: {
        breakfast: '08:00',
        lunch: '13:00',
        dinner: '19:00',
        snacks: ['10:30', '16:00'],
      },
    },
  },
];

/**
 * Seed the database with initial data
 */
async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out for production)
    console.log('🔄 Clearing existing data...');
    await Food.deleteMany({});
    await User.deleteMany({ email: { $regex: '@aititian.com$' } }); // Only delete demo users
    console.log('✅ Existing demo data cleared');

    // Seed food database
    console.log('🔄 Seeding food database...');
    await Food.insertMany(sampleFoods);
    console.log(`✅ Inserted ${sampleFoods.length} food items`);

    // Seed demo users
    console.log('🔄 Seeding demo users...');
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created demo user: ${user.email}`);
    }

    // Display statistics
    const foodCount = await Food.countDocuments();
    const userCount = await User.countDocuments();
    
    console.log('\n📊 Database Statistics:');
    console.log(`- Food items: ${foodCount}`);
    console.log(`- Users: ${userCount}`);

    await mongoose.disconnect();
    console.log('✅ Database seeding completed successfully!');
    console.log('🎉 Your Aititian database is ready for development.');

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();