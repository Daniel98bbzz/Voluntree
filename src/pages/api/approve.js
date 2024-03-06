import { connect } from "../../dbConfig/dbConfig";

import userModal from "../../../models/userModel";

connect();

export default async function POST(request, result) {
  try {
    const reqBody = request.body;

    const { farmer_id, application_id, approve, volunteer_id } = reqBody;
    console.log(farmer_id, application_id, approve);

    const farmer = await userModal.updateOne(
      { _id: farmer_id, "applications._id": application_id },
      {
        $set: {
          "applications.$.approved": approve ? 2 : 1,
        },
      }
    );

    const volunteer = await userModal.updateOne(
      { _id: volunteer_id, "applications._id": application_id },
      {
        $set: {
          "applications.$.approved": approve ? 2 : 1,
        },
      }
    );

    result.status(200).json({ data: JSON.stringify("yes") });
  } catch (error) {
    console.log(error);
    result.status(400).json({ error: error });
  }
}
