import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    return connection;
  } catch (error) {
    console.log(`Error: ${error.message}`);

    process.exit(1);
  }
};
