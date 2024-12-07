const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');  // Import your authentication routes
const dataRoute = require('./routes/data');  // Import your data routes
const app = express();

dotenv.config(); // Load environment variables

// Enable CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://157.230.52.106',  // Replace with your frontend URL or domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON request body
app.use(express.json());

// Authentication routes
app.use('/auth', authRoute);

// Data routes
app.use('/api/data', dataRoute); // Use /api/data for data-related endpoints

// Database connection
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Optional with modern Mongoose but kept for backward compatibility
  useUnifiedTopology: true, // Optional with modern Mongoose
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
