import express from "express";
import LikeController from "./like_controller.js";
import jwtAuth from "../../middlewares/jwt_middleware.js";
const likeController = new LikeController();
const likeRouter = express.Router();

// toggle like
likeRouter.get("/toggle/:postId", jwtAuth, (req, res, next) =>
  likeController.toggle(req, res, next)
);

export default likeRouter;
