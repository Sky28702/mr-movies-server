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

async function viewNumber(req, res) {
  try {
    let data = req.body;
    let movieId = req.body.movieId;

    let movieUser = await MovieUser.findOne({ movieId: movieId });

    if (!movieUser) {
      res.send({
        message: `no movie found`,
      });
    } else {
      const count = movieUser.userId.length;
      res.send({
        data: data,
        count: count,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function mostViewRead(req, res) {
  try {
    const mostViewed = await MovieUser.aggregate([
      {
        $project: {
          movieId: 1,
          views: { $size: "$userId" },
        },
      },
      { $sort: { views: -1 } }, // quite imp to remember
      { $limit: 4 },
    ]);

    res.send({
      mostViewed: mostViewed,
    });
  } catch (error) {
    console.log(error);
  }
}

export { viewCount, viewNumber, mostViewRead };
