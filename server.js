require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Opportunity = require('./models/opportunityModel'); // Import Opportunity model

// Initialize express app
const app = express();

// MongoDB URI
const mongoDBURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/volunteeringOpportunitiesDB`;

// Connect to MongoDB
mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the opportunityList.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'opportunityList.html'));
});

// Route to serve the addOpportunity.html
app.get('/add-opportunity', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'addOpportunity.html'));
});

// API Endpoint to get all opportunities
app.get('/api/opportunities', async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Separated logic for adding a new opportunity via GET (for demonstration)
// Note: For production, consider using a POST request for adding resources.
app.get('/api/add-opportunity', async (req, res) => {
  const servicesArray = req.query.services ? req.query.services.split(',') : [];
  const services = servicesArray.map(service => ({ name: service.trim(), icon: '' }));

  const opportunityData = {
    title: req.query.title,
    location: req.query.location,
    description: req.query.description,
    header_image: req.query.header_image,
    high_demand: req.query.high_demand === 'on',
    rating: {
      score: parseFloat(req.query.rating_score),
      total_reviews: parseInt(req.query.total_reviews, 10),
    },
    cost: {
      price_per_week: parseFloat(req.query.price_per_week),
      currency: req.query.currency,
      duration_weeks: {
        min: parseInt(req.query.duration_min, 10),
        max: parseInt(req.query.duration_max, 10),
      },
    },
    minimum_age: parseInt(req.query.minimum_age, 10),
    services,
  };

  try {
    const newOpportunity = new Opportunity(opportunityData);
    await newOpportunity.save();
    res.redirect('/'); // Redirect back to the main page or to a confirmation page
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
