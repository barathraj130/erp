const mongoose = require('mongoose');

const salesRecordSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  customer: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('SalesRecord', salesRecordSchema);
