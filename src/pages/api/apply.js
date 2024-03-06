import { connect } from "../../dbConfig/dbConfig";

import userModal from "../../../models/userModel";

connect();

export default async function POST(request, result) {
  try {
    const reqBody = request.body;

    const { volunteer_id, farmer_id, title, opportunity_id } = reqBody;

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
          },
        }
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
            approved: false,
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
