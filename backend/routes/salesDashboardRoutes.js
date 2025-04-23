const express = require('express');
const router = express.Router();

const { getDashboardOverview } = require('../controllers/salesDashboardController');

// 👇 This is the key line
router.get('/overview', getDashboardOverview);

module.exports = router;






