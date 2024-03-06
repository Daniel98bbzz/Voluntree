import { connect } from "../../../dbConfig/dbConfig";
import userModal from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export default async function POST(request, result) {
  try {
    const reqBody = request.body;
    const { email, password } = reqBody;

    const user = await userModal.findOne({ email });

    if (!user) {
      return result.status(400).json({ error: "User Not Found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return result.status(400).json({ error: "Invalid password" });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const jwtSession = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // const tokenDataString = JSON.stringify(tokenData);
    // const jwtSession = JSON.stringify(token);

    result.setHeader(
      "Set-Cookie",
      `jwtSession=${jwtSession}; Path=/; HttpOnly`
    );

    // const response = NextResponse.json({
    //   message: "Login successful",
    //   success: true,
    // });

    // Set the token as an HTTP-only cookie
    // response.cookies.set("token", token, {
    //   httpOnly: true,
    // });

    // Return a plain JavaScript object with the message
    return result.status(200).json({ message: "Logged In" });
  } catch (error) {
    console.log(error);
    return result.status(500).json({ error: error.message });
  }
}
