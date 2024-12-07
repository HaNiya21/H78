const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');  // Import your authentication routes
const dataRoute = require('./routes/data');  // Your data route
const app = express();

dotenv.config();

// Enable CORS for all origins or restrict to a specific origin like your frontend's URL
app.use(cors({
  origin: 'http://localhost',  // Ensure this matches the port the frontend runs on (port 80 for NGINX setup)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON request body
app.use(express.json());

// Use authentication and other routes
app.use('/auth', authRoute);
//app.use('/api', dataRoute);
app.use('/api/data', dataRoute); // Register the data routes

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Database connection error:', err));
