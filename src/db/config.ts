 import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        // const mongoUrl = process.env.MONGO_URL;
        // if (!mongoUrl) {
        //   throw new Error("MONGO_URL is not defined in the environment variables");
        // }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      }
}