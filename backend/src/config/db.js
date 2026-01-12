import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "freelancerStarterApp" });
    console.log("MongoDB Connected")
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1)
  }
}

export default connectDB