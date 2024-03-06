import { connect } from "../../../dbConfig/dbConfig";

import userModal from "../../../../models/userModel";

import bcrypt from "bcrypt";

connect();

export default async function POST(request, result) {
  try {
    const reqBody = request.body;
    console.log(reqBody);
    const { username, email, password, role } = reqBody;

    const user = await userModal.findOne({ email });

    if (user) {
      result.status(400).json({ error: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModal({
      username,
      email,
      password: hashedPassword,
      role,
      applications: [],
    });
    const savedUser = await newUser.save();

    result.status(200).json({ data: JSON.stringify(savedUser) });
  } catch (error) {
    console.log(error);
    result.status(400).json({ error: error });
  }
}
