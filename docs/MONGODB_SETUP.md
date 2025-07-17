# MongoDB Setup Guide for Aititian

## Option 1: MongoDB Atlas (Recommended for Production)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Verify your email address

### Step 2: Create a New Cluster
1. After logging in, click "Create a New Cluster"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Name your cluster (e.g., "aititian-cluster")
5. Click "Create Cluster" (takes 1-3 minutes)

### Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and strong password
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Clusters" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "4.1 or later"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with your database name (e.g., "aititian")

Example connection string:
```
mongodb+srv://username:password@aititian-cluster.xxxxx.mongodb.net/aititian?retryWrites=true&w=majority
```

## Option 2: Local MongoDB Installation

### For Windows:
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Install MongoDB as a Windows Service
4. MongoDB will run on `mongodb://localhost:27017`

### For macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### For Linux (Ubuntu):
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Configuration for Aititian

### Update Environment Variables
After setting up MongoDB, update your `.env.local` file:

```env
# MongoDB Configuration
MONGODB_URI=your_connection_string_here

# For Atlas (example):
# MONGODB_URI=mongodb+srv://username:password@aititian-cluster.xxxxx.mongodb.net/aititian?retryWrites=true&w=majority

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/aititian

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OpenAI API (for AI features)
OPENAI_API_KEY=your_openai_api_key
```

### Test Your Connection
Create a test script to verify your MongoDB connection:

```javascript
// test-db.js
const mongoose = require('mongoose');

const MONGODB_URI = 'your_connection_string_here';

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ name: 'Connection Test' });
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Clean up
    await TestModel.deleteOne({ name: 'Connection Test' });
    console.log('✅ Test document cleaned up!');
    
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
}

testConnection();
```

Run the test:
```bash
node test-db.js
```

## Database Structure for Aititian

Your MongoDB database will automatically create these collections:
- `users` - User profiles and health data
- `dietplans` - AI-generated diet plans
- `foods` - Food database with nutritional information
- `notifications` - User notifications and reminders

## Security Best Practices

1. **Never commit credentials** to version control
2. **Use strong passwords** for database users
3. **Restrict IP access** in production
4. **Enable MongoDB authentication**
5. **Use connection pooling** (already implemented in our code)
6. **Monitor database performance** and usage

## Troubleshooting Common Issues

### Connection Timeout
- Check your network access settings in Atlas
- Verify your IP address is whitelisted
- Ensure your connection string is correct

### Authentication Failed
- Double-check username and password
- Ensure the database user has proper permissions
- Verify the database name in your connection string

### Local MongoDB Not Starting
- Check if MongoDB service is running
- Verify MongoDB is installed correctly
- Check MongoDB logs for error messages

## Next Steps

1. Set up your MongoDB database (Atlas recommended)
2. Update your `.env.local` file with the connection string
3. Test the connection using the provided test script
4. Start developing your Aititian application!

For any issues, refer to the [MongoDB Documentation](https://docs.mongodb.com/) or reach out for support.