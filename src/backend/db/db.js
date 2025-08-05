import mongoose from "mongoose";

export let connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_URL);
    console.log("connected to db");
  } catch (err) {
    console.log(err.message);
  }
};
