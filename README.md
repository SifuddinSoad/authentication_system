# Authentication System

This project is a modern Node.js authentication system using Express, MongoDB, JWT, and Nodemailer. It supports user registration, email verification, login, and protected profile access.

## Features

- User registration with hashed passwords
- Email verification using a 6-digit code
- Login with JWT token authentication
- Protected profile route
- Nodemailer integration for sending verification emails
- Modern HTML email template

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/SifuddinSoad/authentication_system.git
   cd authentication_system
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add:

   ```
   MONGODB_URL=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   EMAIL_USER=your-gmail-address@gmail.com
   EMAIL_PASS=your-app-password
   ```

   > **Note:** For Gmail, use an App Password (not your regular password).

4. Start the server:
   ```
   npm run dev
   ```

## Usage

- Register a new user on the home page.
- Check your email for the verification code and enter it to verify your account.
- Log in to receive a JWT token and access your profile.

## Folder Structure

- `app.js` - Main server file
- `models/user.js` - User schema
- `hash-password-making/password-hash.js` - Password hashing
- `tokens/emailverification.js` - Verification code generator
- `tokens/jwttokoens.js` - JWT token generator
- `transporter/mailsender.js` - Nodemailer setup
- `mail/verification.html` - Email template
- `user-profile/profile.js` - Profile page logic

## License

MIT
