import mongoose from "mongoose";

const movieUserSchema = new mongoose.Schema(
  {
    movieId: { type: String, unique: true },
    userId: [{ type: String }],
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const MovieUser =
  mongoose.models.MovieUser || mongoose.model("MovieUser", movieUserSchema);
export default MovieUser;
