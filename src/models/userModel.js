import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"]
  },

  // send the user a link and once click the user gets verified
  isVerified: {
    type: Boolean,
    default: true,
  },

  // check if the user is admin
  isAdmin: {
    type: Boolean,
    default: false
  },

  // forgot password token
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,

  // Access token
  verifyToken: String,
  verifyTokenExpiry: Date
})

// if there is no "users" collection then creat new "User"/ "users" collection
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;