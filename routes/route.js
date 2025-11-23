import { Router } from "express";
import { signUp } from "../actions/authentication/signUp.js";
import { signin } from "../actions/authentication/login.js";
import { Fav } from "../actions/authentication/signUp.js";
import { likeStatus } from "../actions/authentication/signUp.js";
import { readFavMovies } from "../actions/authentication/signUp.js";
import { viewCount } from "../actions/mr-movie.js";
import { viewNumber } from "../actions/mr-movie.js";
import { mostViewRead } from "../actions/mr-movie.js";

const userRouter = Router();
userRouter.post("/signup", signUp);
userRouter.post("/signin", signin);
userRouter.post("/modfav", Fav);
userRouter.post("/statusLike", likeStatus);
userRouter.post("/readFavMovies", readFavMovies);
userRouter.post("/viewCount", viewCount);
userRouter.post("/viewNumber", viewNumber);
userRouter.get("/mostViewRead", mostViewRead);

export default userRouter;
