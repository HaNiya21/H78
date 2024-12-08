const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config(); // Load .env file



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Hardcoded admin login for testing
  if (username === 'Hana' && password === 'Hana') {
    const token = jwt.sign(
      { username }, // Payload data
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration
    );
    return res.status(200).json({ token });
  }

  try {
    // Check for user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT for valid user
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
