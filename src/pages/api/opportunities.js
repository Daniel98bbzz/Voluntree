import opportunityModel from "../../../models/opportunityModel";
import { connect } from "../../dbConfig/dbConfig";
connect();

export default async function GET(req, res) {
  try {
    const opportunities = await opportunityModel.find();

    res.status(200).json({ data: opportunities });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
