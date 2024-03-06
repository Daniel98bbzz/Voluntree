import { connect } from "../../dbConfig/dbConfig";
import opportunityModel from "../../../models/opportunityModel";

connect();

export default async function POST(request, result) {
  try {
    const reqBody = request.body;
    console.log(reqBody);
    const {
      title,
      location,
      description,
      header_image,
      rating_score,
      total_reviews,
      price_per_week,
      currency,
      duration_min,
      duration_max,
      minimum_age,
      services,
    } = reqBody;

    const newOpportunity = new opportunityModel({
      title,
      location,
      description,
      header_image,
      rating_score,
      rating: { score: rating_score, total_reviews },
      cost: {
        price_per_week,
        currency,
        duration_weeks: { min: duration_min, max: duration_max },
      },
      minimum_age,
    });

    result.status(200).json({ data: JSON.stringify(savedUser) });
  } catch (error) {
    console.log(error);
    result.status(400).json({ error: error });
  }
}
