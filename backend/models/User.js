// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Required field
  password: { type: String, required: true }, // Required field
  // other fields...
});

module.exports = mongoose.model('User', UserSchema);
