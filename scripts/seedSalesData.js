const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SalesRecord = require('../backend/models/salesRecordModel');

dotenv.config(); // Load environment variables

const seedData = [
  {
    product: 'Product A',
    customer: 'Company Alpha',
    region: 'USA',
    amount: 15000,
    date: new Date('2025-01-12'),
  },
  {
    product: 'Product B',
    customer: 'Company Beta',
    region: 'Germany',
    amount: 20000,
    date: new Date('2025-02-10'),
  },
  {
    product: 'Product C',
    customer: 'Company Gamma',
    region: 'India',
    amount: 18000,
    date: new Date('2025-03-15'),
  },
  {
    product: 'Product A',
    customer: 'Company Alpha',
    region: 'USA',
    amount: 22000,
    date: new Date('2025-03-25'),
  },
  {
    product: 'Product D',
    customer: 'Company Delta',
    region: 'Brazil',
    amount: 12500,
    date: new Date('2025-04-01'),
  }
];


const seedSales = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB...");

    // Clear existing records (optional)
    await SalesRecord.deleteMany();
    console.log("🗑️ Cleared existing sales records...");

    // Insert new seed data
    await SalesRecord.insertMany(seedData);
    console.log("✅ Sales data seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding sales data:", error);
    process.exit(1);
  }
};

seedSales();
