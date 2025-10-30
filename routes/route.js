import { Router } from "express";
import { signUp } from "../actions/authentication/signUp.js";
import { signin } from "../actions/authentication/login.js";
import { Fav } from "../actions/authentication/signUp.js";

const userRouter = Router();
userRouter.post("/signup", signUp);
userRouter.post("/signin", signin);
userRouter.post("/modfav", Fav);
export default userRouter;
