import { Router } from "express";
import { signUp } from "../../actions/authentication/signUp.js";

const userRouter = Router();
userRouter.post("/signup", signUp);
export default userRouter;
