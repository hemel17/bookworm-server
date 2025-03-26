import mongoose from "mongoose";
const dbUrl = process.env.DB_URL;

const connectDB = () => {
  return mongoose.connect(dbUrl, { dbName: "BOOKWORM" });
};

export default connectDB;
