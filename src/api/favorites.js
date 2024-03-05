import { connect } from "../../dbConfig/dbConfig";

import userModal from "../../../models/userModel";
import opportunityModel from "../../../models/opportunityModel";

connect();

export default async function GET(request, result) {
  try {
    const { user_id } = request.query;

    const userData = await userModal.findOne({ _id: user_id });

    if (userData.favorites.length > 0) {
      const favoritesData = await Promise.all(
        userData.favorites.map(async (favorite) => {
          const getFavoriteData = await opportunityModel.findOne({
            _id: favorite.opportunity_id,
          });
          getFavoriteData.information.dateApplied = favorite.date;
          console.log("Favorite date:", getFavoriteData);

          return getFavoriteData;
        })
      );

      result
        .status(200)
        .json({
          favoritesData,
          userFavoritesData: userData.favorites,
        });
    }

    result.status(400).json({ error: "error" });
  } catch (error) {
    console.log(error);
    result.status(400).json({ error: error });
  }
}
