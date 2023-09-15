import mongoose from "mongoose";

import { configKey } from "../../../../../config";

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(configKey.MONGODB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(`Datasbase connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
