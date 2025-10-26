import { Router } from "express";
import { signUp } from "../../actions/authentication/signUp";

const userRouter = Router();
userRouter.post("/signup", signUp);
export default userRouter;
