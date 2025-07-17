# Detailed MongoDB Setup Instructions for Aititian

## Option 1: MongoDB Atlas (Cloud) - RECOMMENDED FOR BEGINNERS

MongoDB Atlas is MongoDB's cloud service that's free to start and handles all the server management for you.

### Step 1: Create Your MongoDB Atlas Account

1. **Visit MongoDB Atlas**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click the green "Try Free" button

2. **Sign Up Process**
   - Fill out the registration form with your email and password
   - Or click "Sign up with Google" for faster registration
   - Verify your email address when prompted

3. **Initial Setup Questions**
   - Choose "I'm learning MongoDB" or "I'm building a new application"
   - Select "JavaScript" as your preferred language
   - Choose "Local Environment" for deployment

### Step 2: Create Your First Database Cluster

1. **Choose Your Cluster Type**
   - You'll see different pricing tiers
   - **IMPORTANT**: Select "M0 Sandbox" (it says FREE)
   - This gives you 512MB of storage at no cost

2. **Select Cloud Provider and Region**
   - **Provider**: Choose AWS, Google Cloud, or Azure (AWS is most common)
   - **Region**: Pick the region closest to your users
   - Example: If you're in the US, choose "us-east-1" or "us-west-2"

3. **Name Your Cluster**
   - Default name is fine, or choose something like "aititian-cluster"
   - Click "Create Cluster"
   - **Wait 1-3 minutes** for cluster creation

### Step 3: Create Database User (Authentication)

1. **Navigate to Database Access**
   - In the left sidebar, click "Database Access"
   - Click the green "Add New Database User" button

2. **Set Up User Credentials**
   - **Authentication Method**: Keep "Password" selected
   - **Username**: Choose something like "aititian-admin"
   - **Password**: Click "Autogenerate Secure Password" or create your own
   - **IMPORTANT**: Copy and save this password somewhere safe!

3. **Set User Privileges**
   - Under "Database User Privileges"
   - Select "Read and write to any database"
   - Click "Add User"

### Step 4: Configure Network Access (Security)

1. **Go to Network Access**
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"

2. **For Development (Easy Setup)**
   - Click "Allow Access from Anywhere"
   - This adds 0.0.0.0/0 (all IP addresses)
   - **Note**: This is fine for development, but restrict for production

3. **For Production (Secure Setup)**
   - Click "Add Current IP Address" to add your specific IP
   - Or manually enter specific IP addresses that need access

4. **Confirm Settings**
   - Click "Confirm" to save network settings

### Step 5: Get Your Connection String

1. **Connect to Your Cluster**
   - Go back to "Clusters" in the left sidebar
   - Click the "Connect" button on your cluster

2. **Choose Connection Method**
   - Select "Connect your application"
   - Choose "Node.js" as the driver
   - Select version "4.1 or later"

3. **Copy Connection String**
   - You'll see something like:
   ```
   mongodb+srv://aititian-admin:<password>@aititian-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - **Replace `<password>`** with the password you created earlier
   - **Add database name** by changing it to:
   ```
   mongodb+srv://aititian-admin:YOUR_PASSWORD@aititian-cluster.xxxxx.mongodb.net/aititian?retryWrites=true&w=majority
   ```

### Step 6: Update Your Environment File

1. **Open your `.env.local` file** in your project root
2. **Update the MONGODB_URI**:
   ```env
   MONGODB_URI=mongodb+srv://aititian-admin:YOUR_PASSWORD@aititian-cluster.xxxxx.mongodb.net/aititian?retryWrites=true&w=majority
   ```

---

## Option 2: Local MongoDB Installation

This installs MongoDB directly on your computer.

### For Windows Users

1. **Download MongoDB**
   - Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Select "Windows" and "msi" package
   - Click "Download"

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - **IMPORTANT**: Check "Install MongoDB as a Service"
   - Check "Install MongoDB Compass" (GUI tool)

3. **Verify Installation**
   - Open Command Prompt as Administrator
   - Type: `mongod --version`
   - You should see version information

4. **Your Connection String**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/aititian
   ```

### For macOS Users

1. **Install Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if you don't have it
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Add MongoDB tap
   brew tap mongodb/brew
   
   # Install MongoDB Community Edition
   brew install mongodb-community
   ```

2. **Start MongoDB Service**
   ```bash
   # Start MongoDB (runs in background)
   brew services start mongodb/brew/mongodb-community
   
   # To stop later: brew services stop mongodb/brew/mongodb-community
   ```

3. **Verify Installation**
   ```bash
   # Check if MongoDB is running
   brew services list | grep mongodb
   
   # Test connection
   mongosh
   ```

4. **Your Connection String**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/aititian
   ```

### For Linux (Ubuntu/Debian) Users

1. **Import MongoDB GPG Key**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```

2. **Add MongoDB Repository**
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. **Update Package Database**
   ```bash
   sudo apt-get update
   ```

4. **Install MongoDB**
   ```bash
   sudo apt-get install -y mongodb-org
   ```

5. **Start MongoDB Service**
   ```bash
   # Start MongoDB
   sudo systemctl start mongod
   
   # Enable auto-start on boot
   sudo systemctl enable mongod
   
   # Check status
   sudo systemctl status mongod
   ```

6. **Your Connection String**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/aititian
   ```

---

## Testing Your MongoDB Setup

### Step 1: Update Environment Variables

Create or update your `.env.local` file in your project root:

```env
# MongoDB Configuration
MONGODB_URI=your_connection_string_here

# For Atlas example:
# MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/aititian?retryWrites=true&w=majority

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/aititian

# Other required variables
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-make-it-long-and-random

# Optional: For Google OAuth later
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Optional: For AI features later
OPENAI_API_KEY=your_openai_api_key
```

### Step 2: Install Dependencies

Make sure you have all required packages:

```bash
npm install
```

### Step 3: Test Your Connection

Run the connection test script:

```bash
npm run test:db
```

**Expected Output (Success)**:
```
🔄 Connecting to MongoDB...
✅ MongoDB connected successfully!
🔄 Creating test document...
✅ Test document created successfully!
🔄 Reading test document...
✅ Test document found: Aititian Connection Test
🔄 Cleaning up test document...
✅ Test document cleaned up!
📊 Available collections: []
✅ MongoDB disconnected successfully!
🎉 All tests passed! Your MongoDB setup is ready for Aititian.
```

### Step 4: Seed Your Database (Optional)

Add sample data to your database:

```bash
npm run seed:db
```

This will add:
- Sample food items with nutritional information
- Demo user accounts for testing
- Basic data structure for development

---

## Common Issues and Solutions

### Issue 1: "Authentication Failed"
**Problem**: Wrong username or password in connection string
**Solution**: 
- Double-check your username and password
- Make sure you're using the database user (not your Atlas account)
- Verify the password doesn't contain special characters that need encoding

### Issue 2: "Connection Timeout"
**Problem**: Network access not configured properly
**Solution**:
- Check your IP whitelist in Atlas Network Access
- Try "Allow access from anywhere" for testing
- Check your internet connection

### Issue 3: "MONGODB_URI not defined"
**Problem**: Environment variable not set correctly
**Solution**:
- Make sure `.env.local` file exists in your project root
- Check that the variable name is exactly `MONGODB_URI`
- Restart your development server after changing environment variables

### Issue 4: Local MongoDB Won't Start
**Problem**: MongoDB service not running
**Solution**:
- **Windows**: Check Services app, start "MongoDB Server"
- **macOS**: Run `brew services start mongodb/brew/mongodb-community`
- **Linux**: Run `sudo systemctl start mongod`

---

## Security Best Practices

### For Development
- Use strong passwords for database users
- Keep your `.env.local` file in `.gitignore`
- Never commit credentials to version control

### For Production
- Restrict IP access to specific addresses
- Use environment variables for all secrets
- Enable MongoDB authentication
- Use SSL/TLS connections
- Monitor database access logs

---

## Next Steps After Setup

Once your MongoDB is working:

1. **Test the connection** with `npm run test:db`
2. **Seed sample data** with `npm run seed:db`
3. **Start your development server** with `npm run dev`
4. **Begin building authentication** pages
5. **Implement user registration** and login

Your MongoDB setup is now complete and ready for the Aititian application!