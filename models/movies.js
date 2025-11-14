import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    movieName: { type: String },
    movieId: { type: String, unique: true },
    moviePoster: { type: String },
    movieRate: { type: String },
    movieYear: { type: String },
    movieLanguage: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);
export default Movie;
