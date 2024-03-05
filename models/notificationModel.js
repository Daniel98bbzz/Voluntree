const mongoose = require("mongoose");

// Change the variable name from Notification to notificationSchema
const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['follow', 'like', 'comment', 'system'],
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Use notificationSchema here as well
module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema, 'notifications');


