const SalesRecord = require('../models/salesRecordModel');

const getDashboardOverview = async (req, res) => {
  try {
    const start = req.query.startDate ? new Date(req.query.startDate) : new Date('2025-01-01');
    const end = req.query.endDate ? new Date(req.query.endDate) : new Date();

    console.log('Start Date:', start);
    console.log('End Date:', end);

    const totalRevenue = await SalesRecord.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    console.log('Total Revenue:', totalRevenue);

    const salesByProduct = await SalesRecord.aggregate([
      { $group: { _id: '$product', total: { $sum: '$amount' } } }
    ]);
    console.log('Sales By Product:', salesByProduct);

    const salesByRegion = await SalesRecord.aggregate([
      { $group: { _id: '$region', total: { $sum: '$amount' } } }
    ]);
    console.log('Sales By Region:', salesByRegion);

    const monthlyTrends = await SalesRecord.aggregate([
      {
        $match: {
          date: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
    console.log('Monthly Trends:', monthlyTrends);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      salesByProduct,
      salesByRegion,
      monthlyTrends
    });
  } catch (err) {
    console.error('Dashboard Error Stack:', err.stack); // <== new
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
  
};

module.exports = {
  getDashboardOverview
};
