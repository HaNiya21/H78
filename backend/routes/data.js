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



// Mock Data for Summary.js Chart - IoT Devices Growth
router.get('/iot-devices-growth', authMiddleware, (req, res) => {
  const data = [
    { year: "2015", devices: 500 },
    { year: "2016", devices: 800 },
    { year: "2017", devices: 1200 },
    { year: "2018", devices: 1700 },
    { year: "2019", devices: 2500 },
    { year: "2020", devices: 4000 },
    { year: "2021", devices: 5200 },
    { year: "2022", devices: 7000 }
  ];
  res.json(data);
});

// Mock Data for Reports.js Chart - AI Use Cases in Healthcare
router.get('/ai-use-cases', authMiddleware, (req, res) => {
  const data = [
    { category: "Diagnostics", percentage: 30 },
    { category: "Treatment Recommendations", percentage: 25 },
    { category: "Patient Management", percentage: 20 },
    { category: "Hospital Administration", percentage: 25 }
  ];
  res.json(data);
});

module.exports = router;

