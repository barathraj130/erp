import axios from 'axios';

const API_URL = 'http://localhost:5001/api/dashboard';

export const getDashboardOverview = async () => {
  const res = await axios.get(`${API_URL}/overview`);
  return res.data;
};

