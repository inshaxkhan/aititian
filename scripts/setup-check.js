/**
 * Complete Setup Verification Script
 * Checks all requirements for Aititian development
 * Usage: node scripts/setup-check.js
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

/**
 * Check if required environment variables are set
 */
function checkEnvironmentVariables() {
  console.log('🔍 Checking environment variables...');
  
  const required = ['MONGODB_URI'];
  const optional = ['NEXTAUTH_SECRET', 'GOOGLE_CLIENT_ID', 'OPENAI_API_KEY'];
  
  let allGood = true;
  
  // Check required variables
  required.forEach(variable => {
    if (process.env[variable]) {
      console.log(`✅ ${variable}: Set`);
    } else {
      console.log(`❌ ${variable}: Missing (REQUIRED)`);
      allGood = false;
    }
  });
  
  // Check optional variables
  optional.forEach(variable => {
    if (process.env[variable]) {
      console.log(`✅ ${variable}: Set`);
    } else {
      console.log(`⚠️  ${variable}: Not set (optional)`);
    }
  });
  
  return allGood;
}

/**
 * Check if .env.local file exists
 */
function checkEnvFile() {
  console.log('\n🔍 Checking .env.local file...');
  
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (fs.existsSync(envPath)) {
    console.log('✅ .env.local file exists');
    return true;
  } else {
    console.log('❌ .env.local file not found');
    console.log('💡 Create .env.local file in your project root with:');
    console.log('   MONGODB_URI=your_connection_string_here');
    return false;
  }
}

/**
 * Test MongoDB connection
 */
async function testMongoConnection() {
  console.log('\n🔍 Testing MongoDB connection...');
  
  if (!process.env.MONGODB_URI) {
    console.log('❌ Cannot test MongoDB - MONGODB_URI not set');
    return false;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connection successful');
    
    // Test basic operations
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('SetupTest', testSchema);
    
    const doc = new TestModel({ test: 'setup-check' });
    await doc.save();
    await TestModel.deleteOne({ test: 'setup-check' });
    
    console.log('✅ MongoDB read/write operations working');
    
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    
    // Provide specific troubleshooting
    if (error.message.includes('authentication failed')) {
      console.log('💡 Check your username and password in the connection string');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('💡 Check your internet connection and cluster URL');
    } else if (error.message.includes('timeout')) {
      console.log('💡 Check your IP whitelist in MongoDB Atlas Network Access');
    }
    
    return false;
  }
}

/**
 * Check Node.js and npm versions
 */
function checkNodeVersion() {
  console.log('\n🔍 Checking Node.js and npm versions...');
  
  const nodeVersion = process.version;
  const npmVersion = process.env.npm_version || 'unknown';
  
  console.log(`✅ Node.js version: ${nodeVersion}`);
  console.log(`✅ npm version: ${npmVersion}`);
  
  // Check if Node.js version is compatible
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion >= 16) {
    console.log('✅ Node.js version is compatible');
    return true;
  } else {
    console.log('⚠️  Node.js version might be too old (recommended: 16+)');
    return false;
  }
}

/**
 * Check if required dependencies are installed
 */
function checkDependencies() {
  console.log('\n🔍 Checking dependencies...');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ package.json not found');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const required = [
    'mongoose',
    'next-auth',
    'react',
    'next',
    'tailwindcss',
    'lucide-react'
  ];
  
  let allInstalled = true;
  
  required.forEach(dep => {
    if (dependencies[dep]) {
      console.log(`✅ ${dep}: ${dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep}: Not installed`);
      allInstalled = false;
    }
  });
  
  return allInstalled;
}

/**
 * Main setup check function
 */
async function runSetupCheck() {
  console.log('🚀 Aititian Setup Verification\n');
  console.log('='.repeat(50));
  
  const checks = [
    { name: 'Node.js Version', fn: checkNodeVersion },
    { name: 'Environment File', fn: checkEnvFile },
    { name: 'Environment Variables', fn: checkEnvironmentVariables },
    { name: 'Dependencies', fn: checkDependencies },
    { name: 'MongoDB Connection', fn: testMongoConnection },
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    try {
      const result = await check.fn();
      if (!result) allPassed = false;
    } catch (error) {
      console.log(`❌ ${check.name} check failed:`, error.message);
      allPassed = false;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (allPassed) {
    console.log('🎉 All checks passed! Your Aititian setup is ready.');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000');
    console.log('3. Start building your authentication pages');
  } else {
    console.log('⚠️  Some checks failed. Please fix the issues above.');
    console.log('\n📋 Common solutions:');
    console.log('1. Run: npm install');
    console.log('2. Create .env.local with your MongoDB connection string');
    console.log('3. Check MongoDB Atlas network access settings');
  }
}

// Run the setup check
runSetupCheck().catch(console.error);