// backend/services/salesDashboardService.js
const SalesRecord = require('../models/salesRecordModel');

exports.getSalesSummary = async () => {
  const revenue = await SalesRecord.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
  ]);
  return revenue[0] || { totalRevenue: 0 };
};

exports.getMonthlyTrends = async () => {
  return await SalesRecord.aggregate([
    {
      $group: {
        _id: { $month: '$date' },
        total: { $sum: '$amount' }
      }
    },
    { $sort: { '_id': 1 } }
  ]);
};

// Add more methods like: getTopProducts, getTopRegions, getSalesCycleData, etc.
