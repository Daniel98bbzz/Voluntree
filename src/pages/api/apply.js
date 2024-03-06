import { connect } from "../../dbConfig/dbConfig";
import userModal from "../../../models/userModel";
import mongoose from "mongoose";

connect();

export default async function POST(request, result) {
  try {
    const reqBody = request.body;

    const {
      volunteer_id,
      farmer_id,
      title,
      opportunity_id,
      volunteer_username,
    } = reqBody;

    var objectId = new mongoose.Types.ObjectId();

    const volunteer = await userModal.updateOne(
      { _id: volunteer_id },
      {
        $push: {
          applications: {
            date: new Date().toDateString(),
            title,
            farmer_id,
            opportunity_id,
            volunteer_id,
            approved: 0,
            _id: objectId,
          },
        },
      }
    );

    const farmer = await userModal.updateOne(
      { _id: farmer_id },
      {
        $push: {
          applications: {
            date: new Date().toDateString(),
            title,
            farmer_id,
            opportunity_id,
            volunteer_id,
            approved: 0,
            volunteer_username,
            _id: objectId,
          },
        },
      }
    );

    result.status(200).json({ data: JSON.stringify("yes") });
  } catch (error) {
    console.log(error);
    result.status(400).json({ error: error });
  }
}
