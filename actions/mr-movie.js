import MovieUser from "../models/movie-user.js";

async function viewCount(req, res) {
  try {
    let data = req.body;
    let movieId = req.body.movieId;
    let userId = req.body.userId;

    let movieUser = await MovieUser.findOne({ movieId: movieId });

    if (!movieUser) {
      movieUser = new MovieUser({
        movieId: movieId,
        userId: [userId],
      });
      await movieUser.save();
      res.send({
        data: data,
        success: true,
        message: "View recorded",
      });
      return;
    } else {
      if (!movieUser.userId.includes(userId)) {
        movieUser.userId.push(userId);
        await movieUser.save();
      }
      res.send({
        data: data,
        success: true,
        message: "View recorded",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error recording view",
    });
  }
}
export { viewCount };
