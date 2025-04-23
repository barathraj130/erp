import React, { useEffect, useState } from 'react';
import { getDashboardOverview } from '../services/dashboardService';

import RevenueChart from '../components/dashboard/RevenueChart';
import ProductPieChart from '../components/dashboard/ProductPieChart';
import CountryRevenueMap from '../components/dashboard/CountryRevenueMap';
import MonthlyTrends from '../components/dashboard/MonthlyTrends';

const Dashboard = () => {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboardOverview();
        setOverview(data);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    }

    fetchData();
  }, []);

  if (!overview) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <ProductPieChart data={overview.salesByProduct} />
        <CountryRevenueMap data={overview.salesByRegion} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <MonthlyTrends data={overview.monthlyTrends} />
        <RevenueChart data={overview.monthlyTrends} />
      </div>
    </div>
  );
};

export default Dashboard;
