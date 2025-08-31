
import mongoose from 'mongoose';
import { hashPassword } from '../hash-password-making/password-hash.js';

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
    lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	verificationToken: {
		type: String
	}
}, { timestamps: true });


// Hash password before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	try {
		this.password = await hashPassword(this.password);
		next();
	} catch (err) {
		next(err);
	}
});

const User = mongoose.model('User', userSchema);
export default User;
