import mongoose from "mongoose";

let connected = false;

export const connectMongoDB = async () => {
  if (connected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
    connected = true;
  } catch (error) {
    console.log("Error connecting to Database : ", error);
  }
};
