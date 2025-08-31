import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Configure transporter (example: Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(to, code) {
  // Read and inject code into HTML template
  const templatePath = path.resolve("mail", "verification.html");
  let html = fs.readFileSync(templatePath, "utf8");
  html = html.replace("{{CODE}}", code);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Email Verification Code",
    html,
  };
  await transporter.sendMail(mailOptions);
}
