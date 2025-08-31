import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for a user
 * @param {Object} payload - Data to encode in the token (e.g., user id, email)
 * @returns {string} - JWT token
 */
export function generateJWT(payload) {
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "24h" };
  return jwt.sign(payload, secret, options);
}
