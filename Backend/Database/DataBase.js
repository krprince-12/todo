const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB URI from environment variables (MongoDB Atlas or Local)
const mongoURI = process.env.DB_URI ;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  // Exit the process with failure code
  }
};

// Export the connection function
module.exports = connectDB;
