"use server";
import mongoose from "mongoose";

const connection = {};

const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("using existing conection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.isConnected = db.connections[0].readyState;

    console.log("MongoDB connected:", connection.isConnected);

    // Add connection event listeners
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Mongoose connection error: ${err.message}`);
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default connectDB;
