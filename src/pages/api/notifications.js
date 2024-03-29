// pages/api/notifications.js
import Notification from "../../../models/notificationModel";
import { connect } from "../../dbConfig/dbConfig";

connect();

export default async function GET(req, res) {
  const reqBody = req.body;

  try {
    // Fetch all notifications without filtering by recipient
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
