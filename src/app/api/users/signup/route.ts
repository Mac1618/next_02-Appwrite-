// Database config
import { connect } from "@/dbConfig/dbConfig";
// User Model
import userModel from "@/models/userModel";

// For API
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";


// connection to databse
connect()


// POST request
export const POST = async (request: NextRequest) => {
  try {
    // request.body in expressjs
    const reqBody = await request.json()
    const { username, email, password } = reqBody;
    console.log(reqBody); // test log

    //Authentication || validation
    // check if user email exist
    const user = await userModel.findOne({email: email});
    if(user){
      return NextResponse.json({
        message: "User already exist"
      })
    }

    //hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)

    // save user accoutn
    const newUser = new userModel({
      username: username,
      email: email,
      password: hashedPassword
    })
    const savedUser = await newUser.save()
    console.log(savedUser); // test log

    // response
    return NextResponse.json({
      message: "User is created successfuly", 
      success: true,
      savedUser
    })

  // response error message
  } catch (error: any) {
    return NextResponse.json({
      message: error, 
      status: 500 
    })
  }
}
