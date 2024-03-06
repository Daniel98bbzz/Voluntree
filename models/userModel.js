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

        type: Number,
        required: false,
        default: 0, //0 - Pending, 1 - Declined, 2 - Approved
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

      volunteer_username: {
        type: String,
        required: false,
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

      volunteer_username: {
        type: String,
        required: false,
      },
    },
  ],
});



const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
