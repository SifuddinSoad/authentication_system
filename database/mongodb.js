import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('\x1b[32m✔️  Successfully connected to MongoDB!\x1b[0m');
	} catch (error) {
		console.error('\x1b[31m❌ MongoDB connection error:\x1b[0m', error);
		process.exit(1);
	}
};

export default connectDB;
