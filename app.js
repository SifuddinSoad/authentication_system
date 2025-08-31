import { sendVerificationEmail } from "./transporter/mailsender.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/mongodb.js";
import User from "./models/user.js";
import { generateVerificationCode } from "./tokens/emailverification.js";
import jwt from "jsonwebtoken";
import loginOperation from "./login/loginOperation.js";
import verificationPage from "./create-user/verification.js";
import profilePage from "./user-profile/profile.js";
dotenv.config();
import { generateJWT } from "./tokens/jwttokoens.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// JWT authentication middleware
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access denied");
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}
// Protected profile route
app.get("/profile", authMiddleware, async (req, res) => {
  const html = await profilePage(req.user);
  res.send(html);
});

// Root route
app.get("/", (req, res) => {
  res.send(`
        <h1>Welcome to the Authentication Service</h1>
        <form action="/login" method="POST">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="passwordl" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <form action="/register" method="POST">
            <input type="text" name="firstname" placeholder="First Name" required />
            <input type="text" name="lastname" placeholder="Last Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
        `);
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  // Generate verification code
  const verificationToken = generateVerificationCode();

  // Create new user with verification token
  const newUser = new User({
    firstname,
    lastname,
    email,
    password,
    verificationToken,
  });

  // Send verification email
  await sendVerificationEmail(newUser.email, newUser.verificationToken);

  // Send new user's id along with redirect
  res.redirect(`/verification?id=${newUser._id}`);
  app.get("/verification", async (req, res) => {
    const userId = req.query.id;
    res.send(verificationPage(userId));
  });

  app.post("/verify-code", async (req, res) => {
    const { code } = req.body;

    // Find user by verification token

    if (code == newUser.verificationToken) {
      // Mark user as verified
      newUser.isVerified = true;
      newUser.verificationToken = undefined;
      await newUser.save();
      // Generate JWT token
      const token = generateJWT({ id: newUser._id, email: newUser.email });
      // Set token in cookie
      res.cookie("token", token, { httpOnly: true });

      res.redirect(`/profile?id=${newUser._id}`);
    } else {
      res.send("Invalid verification code");
    }
  });
});

app.get("/success", (req, res) => {
  res.send("Email verified successfully");
});

app.post("/login", loginOperation);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
