// routes/protected.js
const express = require('express');
const auth = require('../middleware/authMiddleware');  // Import auth middleware
const router = express.Router();

// Example protected route
router.get('/protected-data', auth, (req, res) => {
  res.json({ message: 'This is protected data', userId: req.user });
});

module.exports = router;
