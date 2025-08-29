import express from "express";
import PostController from "./post_controller.js";
import multer from "multer";
import jwtAuth from "../../middlewares/jwt_middleware.js";
const postController = new PostController();
const postRouter = express.Router();
const upload = multer();

// get post
postRouter.get("/get-post/", jwtAuth, (req, res, next) =>
  postController.getPost(req, res, next)
);

// add post
postRouter.post("/add-post",jwtAuth, upload.single("image"), (req, res, next) =>
  postController.addPost(req, res, next)
);

// delete post
postRouter.delete("/delete-post/:postId", jwtAuth, (req, res, next) =>
  postController.deletePost(req, res, next)
);

export default postRouter;
