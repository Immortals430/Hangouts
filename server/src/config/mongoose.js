import mongoose from "mongoose";
const DB = process.env.DB || "mongodb://127.0.0.1/social_media";

// connect to mongodb database
const connectDb = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Something went wrong while connecting to MongoDb", err);
  }
};

export default connectDb;
