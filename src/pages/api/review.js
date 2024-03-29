import { connect } from "../../dbConfig/dbConfig";
import Opportunity from "../../../models/opportunityModel";
import userModal from "../../../models/userModel";
import mongoose from "mongoose";

connect();

export default async function handler(request, result) {
  if (request.method === "POST") {
    try {
      const reqBody = request.body;
      const { rating, comment, name, id, user_id } = reqBody;

      var objectId = new mongoose.Types.ObjectId();

      const insertReview = await Opportunity.updateOne(
        { _id: id },
        {
          $push: {
            "overview.reviews": {
              rating,
              comment,
              name,
            },
          },
        }
      );

      const pullApplication = await userModal.updateOne(
        { _id: user_id },
        {
          $pull: {
            applications: {
              opportunity_id: id,
            },
          },
        }
      );

      console.log(pullApplication);

      result.status(200).json({ message: "complete" });
    } catch (error) {
      console.log(error);
      result.status(400).json({ error: error });
    }
  }
}
