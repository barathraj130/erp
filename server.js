const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const salesDashboardRoutes = require('./backend/routes/salesDashboardRoutes');
const connectDB = require('./backend/config/db');

require('dotenv').config(); // Load .env variables

connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('ERP System API Running 🚀');
});

app.use('/api/dashboard', salesDashboardRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
