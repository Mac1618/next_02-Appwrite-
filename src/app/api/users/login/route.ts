import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Model and dbConfig
import userModel from "@/models/userModel";
import { connect } from '@/dbConfig/dbConfig';

// connection
connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody;
    console.log("Login: ", email, password);

    // Authentication
    // check if the email exist
    const user = await userModel.findOne({ email: email })
    if(!user){
      return NextResponse.json({message: "User does not exist!"});
    };

    // check if the password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if(!validPassword){
      return NextResponse.json({message: "Invalid password!"}, {status: 400});
    }

    // token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    // create a token         //token data  // env variable            // token expiry
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    const response = NextResponse.json({ 
      message: "Login succesful", 
      success: true 
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    })

    // sends both the "cookies" and the "NextResponse"
    return response

  // catch error
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, {status: 500})
  }
}