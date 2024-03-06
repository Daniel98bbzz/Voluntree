import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    // Added role to the schema
    type: String,
    enum: ["farmer", "volunteer"],
    required: true,
  },
  test: {
    type: String,
    required: false,
  },
  applications: [
    {
      date: {
        type: Date,
        required: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      approved: {
        type: Boolean,
        required: false,
        default: false,
      },
      farmer_id: {
        type: String,
        required: true,
      },
      volunteer_id: {
        type: String,
        required: true,
      },
      opportunity_id: {
        type: String,
        required: true,
      },
    },
  ],
  favorites: [
    {
      date: {
        type: Date,
        required: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      approved: {
        type: Boolean,
        required: false,
        default: false,
      },
      farmer_id: {
        type: String,
        required: true,
      },
      volunteer_id: {
        type: String,
        required: true,
      },
      opportunity_id: {
        type: String,
        required: true,
      },
    },
  ],
});

// // Authenticate input against database documents
// UserSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email: email }).exec(function (err, user) {
//     if (err) {
//       return callback(err);
//     } else if (!user) {
//       var err = new Error("User not found.");
//       err.status = 401;
//       return callback(err);
//     }
//     bcrypt.compare(password, user.password, function (err, result) {
//       if (result === true) {
//         return callback(null, user);
//       } else {
//         return callback(new Error
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
