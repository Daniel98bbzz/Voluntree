import { connect } from "../../dbConfig/dbConfig";
import opportunityModel from "../../../models/opportunityModel";
import mongoose from "mongoose";

connect();

export default async function POST(request, result) {
  try {
    const reqBody = request.body;

    const {
      title,
      location,
      description,
      detailed_description,
      coordinates, // Added directly if you need the object as is
      header_image,
      price_per_week,
      currency,
      duration_min,
      duration_max,
      minimum_age,
      about_farmer,
      working_hours,
      volunteers_needed,
      difficulty_level,
      include,
      availability,
      services,
      farmer_id,
    } = reqBody;

    var objectId = new mongoose.Types.ObjectId();

    const newOpportunity = new opportunityModel({
      _id: objectId,
      title,
      location,
      description,
      header_image,
      overview: {
        detailed_description,
        reviews: [],
      },
      information: {
        about_farmer,
        include,
        details: {
          availability,
          working_hours,
          volunteers_needed,
          difficulty_level,
        },
      },
      cost: {
        price_per_week,
        currency,
        duration_weeks: { min: duration_min, max: duration_max },
      },
      location_details: {
        address: location,
        coordinates,
      },
      services,
      minimum_age,
    });

    await newOpportunity.save();

    const insertOpp = await userModal.updateOne(
      { _id: farmer_id },
      {
        $push: {
          myOpportunities: {
            title,
            opportunity_id: objectId,
          },
        },
      }
    );

    result.status(200).json({ data: JSON.stringify(savedUser) });
  } catch (error) {
    console.log(error);
    result.status(400).json({ error: error });
  }
}
