import { Router } from "express";
import { signUp } from "../actions/authentication/signUp.js";
import { signin } from "../actions/authentication/login.js";

const userRouter = Router();
userRouter.post("/signup", signUp);
userRouter.post("/signin", signin);
export default userRouter;
