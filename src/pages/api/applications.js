import { connect } from "../../dbConfig/dbConfig";

import userModal from "../../../models/userModel";
import opportunityModel from "../../../models/opportunityModel";

connect();

export default async function GET(request, result) {
  try {
    const { user_id } = request.query;

    const userData = await userModal.findOne({ _id: user_id });

    if (userData.applications.length > 0) {
      const applicationsData = await Promise.all(
        userData.applications.map(async (application) => {
          const getApplicationData = await opportunityModel.findOne({
            _id: application.opportunity_id,
          });
          getApplicationData.information.dateApplied = application.date;
          console.log("Application date:", getApplicationData);

          return getApplicationData;
        })
      );

      result
        .status(200)
        .json({
          applicationsData,
          userApplicationsData: userData.applications,
        });
    }

    result.status(400).json({ error: "error" });
  } catch (error) {
    console.log(error);
    result.status(400).json({ error: error });
  }
}
