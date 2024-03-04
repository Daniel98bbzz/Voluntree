const mongoose = require('mongoose');

const {logger} = require('../logger');

const connectDB = async () => {
  try {
    await mongoose.connect(//still need to edit this: xq0yhmm.mongodb.net 
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/volunteeringOpportunitiesDB`
    );

    logger.info('MongoDB connected successfully.');

  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
  }
};

module.exports = {connectDB};