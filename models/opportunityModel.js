const { default: mongoose } = require("mongoose");

const Opportunity = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  location: String,
  description: String,
  header_image: String,
  high_demand: Boolean,
  verified_by_volunteer_membership: Boolean,
  response_rate: String,
  overview: {
    detailed_description: String,
    reviews: [
      {
        name: String,
        date: Date,
        rating: Number,
        comment: String,
      },
    ],
  },
  information: {
    details: {
      availability: String,
      working_hours: String,
      volunteers_needed: Number,
      difficulty_level: String,
    },
    includes: {
      food_beverages: Boolean,
      internet_access: Boolean,
      accommodation: Boolean,
    },
    about_farmer: String,
  },
  location_details: {
    coordinates: {
      lat: Number,
      lng: Number,
    },
    address: String,
  },
  rating: {
    score: Number,
    total_reviews: Number,
  },
  cost: {
    price_per_week: Number,
    currency: String,
    duration_weeks: {
      min: Number,
      max: Number,
    },
  },
  minimum_age: Number,
  services: [
    {
      name: String,
      icon: String,
    },
  ],
});

export default mongoose.models.Opportunity ||
  mongoose.model("Opportunity", Opportunity);
