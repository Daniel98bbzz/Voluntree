// pages/api/notifications.js
import mongoose from "mongoose";
import Notification from "../../../models/notificationModel";

export default async function handler(req, res) {
  // Connect to the database
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.DATABASE_URL);
  }

  if (req.method === "GET") {
    try {
      // Fetch all notifications without filtering by recipient
      const notifications = await Notification.find({}).sort({ createdAt: -1 });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "No Method" });
  }
}












// THE FOLLOWING CODE IS WHAT I WANT LATER, TO FETCH THE API FILTERED BY USER CURRENTLY THE CODE ABOVE IS THE CODE FOR TESTING THAT THE NOTIFICATIONS BEING FETCHED CORRECTLY

// import mongoose from "mongoose";
// import Notification from "../../../models/notificationModel";

// export default async function handler(req, res) {
//   // Connect to the database
//   if (mongoose.connections[0].readyState !== 1) {
//     await mongoose.connect(process.env.DATABASE_URL);
//   }

//   if (req.method === "GET") {
//     try {
//       // Assuming you would have the current user's ID stored in session
//       // For this example, let's say the user's ID is stored in req.query.id
//       const userId = req.query.id; // Replace with your method of getting the logged-in user's ID

//       const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
//       res.status(200).json(notifications);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(400).json({ error: "No Method" });
//   }
// }