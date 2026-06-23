import { Router } from "express";
import { currentUser, loginUser, registerUser } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const authRouter = Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.get("/me", authenticate, currentUser)  // return current logged in user


export default authRouter