import mongoose from "mongoose";

async function connectdb() {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://prateekrai462:Hiallguys76+@cluster0.byn7xrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connection successfull ! ");
  } catch (error) {
    console.log(error);
  }
}
export default connectdb;
