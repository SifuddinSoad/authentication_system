import bcrypt from 'bcryptjs';

/**
 * Hashes a plain text password
 * @param {string} password - The plain password to hash
 * @returns {Promise<string>} - The hashed password
 */
export async function hashPassword(password) {
	const saltRounds = 10;
	const hashed = await bcrypt.hash(password, saltRounds);
	return hashed;
}
