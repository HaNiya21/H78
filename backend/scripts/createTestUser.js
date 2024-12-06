// scripts/createTestUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash('Hana', 10);

    const user = new User({
      username: 'Hana',        // Include the username field
      password: hashedPassword,
    });

    await user.save();
    console.log('Test user created');
  } catch (err) {
    console.error('Error creating test user:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

createTestUser();
