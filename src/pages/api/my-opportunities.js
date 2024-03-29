import { connect } from "../../dbConfig/dbConfig";
import userModal from "../../../models/userModel";
import opportunityModel from "../../../models/opportunityModel";

connect();

export default async function GET(request, result) {
  try {
    const { user_id } = request.query;

    const userData = await userModal.findOne({ _id: user_id });

    if (userData.myOpportunities.length > 0) {
      const myOpportunitiesData = await Promise.all(
        userData.myOpportunities.map(async (opp) => {
          const getOpportunitiesData = await opportunityModel.findOne({
            _id: opp.opportunity_id,
          });
          getFavoriteData.information.dateApplied = opp.date;

          return getOpportunitiesData;
        })
      );

      result.status(200).json({
        myOpportunitiesData,
        userOpportunitiesData: userData.myOpportunities,
      });
    }

    result.status(400).json({ error: "error" });
  } catch (error) {
    console.log(error);
    result.status(400).json({ error: error });
  }
}
