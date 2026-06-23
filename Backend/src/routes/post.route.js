import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createPost, getPosts, toggleLike, addComment } from "../controllers/post.controller.js";

const postRouter = Router()

postRouter.get("/", getPosts)

postRouter.post("/", authenticate, createPost)
postRouter.post("/:id/like", authenticate, toggleLike)
postRouter.post("/:id/comment", authenticate, addComment)

export default postRouter;