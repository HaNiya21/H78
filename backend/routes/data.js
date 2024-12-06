// routes/data.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');  // Correctly import authMiddleware

// Define your protected route
router.get('/protected-data', authMiddleware, (req, res) => {
  res.json({ message: 'This is protected data', userId: req.user });
});

router.get('/chart-data', authMiddleware, async (req, res) => {
  // Fetch data from MongoDB or any other source
  const chartData = await getChartData();
  res.json(chartData);
});

// Telemedicine Visits Over Time
router.get('/telemedicine-visits', auth, (req, res) => {
  const data = [
    { month: 'Jan 2021', visits: 100 },
    { month: 'Feb 2021', visits: 120 },
    // ... more data points
    { month: 'Dec 2022', visits: 300 },
  ];
  res.json(data);
});

// Telemedicine Usage by Age Group
router.get('/telemedicine-age-group', auth, (req, res) => {
  const data = [
    { ageGroup: '18-29', percentage: 25 },
    { ageGroup: '30-49', percentage: 35 },
    { ageGroup: '50-64', percentage: 25 },
    { ageGroup: '65+', percentage: 15 },
  ];
  res.json(data);
});

module.exports = router;
