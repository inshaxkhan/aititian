/**
 * MongoDB Connection Test Script
 * Run this script to verify your MongoDB connection is working
 * Usage: node scripts/test-db.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

/**
 * Test MongoDB connection and basic operations
 */
async function testConnection() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ 
      name: String,
      timestamp: { type: Date, default: Date.now }
    });
    const TestModel = mongoose.model('ConnectionTest', testSchema);
    
    console.log('🔄 Creating test document...');
    const testDoc = new TestModel({ name: 'Aititian Connection Test' });
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Test reading the document
    console.log('🔄 Reading test document...');
    const foundDoc = await TestModel.findOne({ name: 'Aititian Connection Test' });
    console.log('✅ Test document found:', foundDoc.name);
    
    // Clean up
    console.log('🔄 Cleaning up test document...');
    await TestModel.deleteOne({ name: 'Aititian Connection Test' });
    console.log('✅ Test document cleaned up!');
    
    // Test collections info
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully!');
    console.log('🎉 All tests passed! Your MongoDB setup is ready for Aititian.');
    
  } catch (error) {
    console.error('❌ MongoDB connection test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('- Check your username and password in the connection string');
      console.log('- Ensure the database user has proper permissions');
      console.log('- Verify the database name is correct');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('- Check your internet connection');
      console.log('- Verify your IP address is whitelisted in MongoDB Atlas');
      console.log('- Ensure the connection string is correct');
    }
    
    process.exit(1);
  }
}

// Run the test
testConnection();