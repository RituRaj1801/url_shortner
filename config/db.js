import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in .env file!");
}

const connectDB = async () => {

    try {
        const db = await mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ New MongoDB Connection Established!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectDB;
