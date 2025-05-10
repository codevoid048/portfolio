import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI ? process.env.MONGO_URI.toString() : "";
        if (!uri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected : ${conn.connection.host}`)
        console.log(`MongoDB : ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;