const mongoose = require('mongoose');

// Define Mongoose Schema
const opportunitySchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  header_image: String,
  high_demand: Boolean,
  rating: {
    score: Number,
    total_reviews: Number
  },
  cost: {
    price_per_week: Number,
    currency: String,
    duration_weeks: {
      min: Number,
      max: Number
    }
  },
  minimum_age: Number,
  services: [{
    name: String,
    icon: String
  }]
});

// Create Mongoose Model
const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;
