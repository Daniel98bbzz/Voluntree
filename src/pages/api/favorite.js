import { connect } from "../../dbConfig/dbConfig";
import userModal from "../../../models/userModel";
import mongoose from "mongoose";

connect();

export default async function handler(request, result) {
  if (request.method === "POST") {
    try {
      const reqBody = request.body;
      const { volunteer_id, title, opportunity_id } = reqBody;

      var objectId = new mongoose.Types.ObjectId();

      const insertFavorite = await userModal.updateOne(
        { _id: volunteer_id },
        {
          $push: {
            favorites: {
              date: new Date().toDateString(),
              title,
              opportunity_id,
              _id: objectId,
            },
          },
        }
      );

      result.status(200).json({ message: "complete" });
    } catch (error) {
      console.log(error);
      result.status(400).json({ error: error });
    }
  }

  if (request.method === "DELETE") {
    try {
      const reqBody = request.body;
      const { volunteer_id, opportunity_id } = reqBody;

      const removeFavorite = await userModal.updateOne(
        { _id: volunteer_id },
        {
          $pull: {
            favorites: {
              opportunity_id: opportunity_id,
            },
          },
        }
      );

      result.status(200).json({ message: "complete" });
    } catch (error) {
      console.log(error);
      result.status(400).json({ error: error });
    }
  }
}
