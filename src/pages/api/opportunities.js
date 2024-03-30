import mongoose from "mongoose";
import opportunityModel from "../../../models/opportunityModel";

export default async function handler(req, res) {
  let client = await mongoose.connect(process.env.DATABASE_URL);

  if (req.method === "GET") {
    const opportunities = await opportunityModel.find();
    res.status(200).json({ data: opportunities });
  }

  res.status(400).json({ error: "No Method" });
}
