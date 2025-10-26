import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
