import mongoose from "mongoose";

export let connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rwtgeet6:geeta99@cluster0.2aenolc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to db");
  } catch (err) {
    console.log(err.message);
  }
};
