import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../tokens/jwttokoens.js";

const loginOperation = async (req, res) => {
  let { email, passwordl } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }

  // Check password
  const pass = user.password;
  const isMatch = await bcrypt.compare(passwordl, pass);
  if (!isMatch) {
    return res.status(400).send("Invalid password");
  }
  console.log("User logged in successfully");
  // Generate JWT token
  const token = generateJWT({ id: user._id, email: user.email });

  // Set token in cookie


  // Fahim Dost Here is the answer of your question : JWT-TOKEN-STORE
  res.cookie("token", token, { httpOnly: true });

  res.redirect(`/profile?id=${user._id}`);
};

export default loginOperation;
