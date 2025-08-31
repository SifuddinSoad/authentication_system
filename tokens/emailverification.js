/**
 * Generates a 6-digit random verification code as a string
 * @returns {string} - 6-digit code
 */
export function generateVerificationCode() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}
