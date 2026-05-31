import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not set in environment");
      throw new Error("Missing MONGODB_URI");
    }
    // comment line
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error");
    console.error(error);
    process.exit(1);
  }
};

