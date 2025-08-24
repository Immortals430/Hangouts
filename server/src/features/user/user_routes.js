import express from "express";
import UserController from "./user_controller.js";
// import multer from "multer";
import verifyToken from "../../middlewares/google_auth_library.js";
// import jwtAuth from "../../middlewares/jwt_middleware.js";
const userController = new UserController();
const userRouter = express.Router();
// const upload = multer();

// // signup route
// userRouter.post("/signup", (req, res, next) =>
//   userController.signup(req, res, next)
// );

// // confirm signup route
// userRouter.get("/confirm-signup/:userId", (req, res, next) =>
//   userController.confirmSignup(req, res, next)
// );

// // signin route
userRouter.post("/login", (req, res, next) =>
  userController.login(req, res, next)
);

// // google login route
userRouter.post("/google-login", verifyToken, (req, res, next) =>
  userController.googleLogin(req, res, next)
);

// // get friend suggestion route
// userRouter.get("/get-friend-suggestion/", jwtAuth, (req, res, next) =>
//   userController.getFriendSuggestion(req, res, next)
// );


// // get user details with userId route
// userRouter.get("/get-user/:id", jwtAuth, (req, res, next) =>
//   userController.getUser(req, res, next)
// );

// get login status with jwtToken route
userRouter.get("/check-authorization", (req, res, next) =>
  userController.getLoggedInStatus(req, res, next)
);


// // update user details route
// userRouter.put(
//   "/update-user/",
//   jwtAuth,
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "cover", maxCount: 1 },
//   ]),
//   (req, res, next) => userController.updateUser(req, res, next)
// );

// // send otp route
// userRouter.post("/send-otp", (req, res, next) =>
//   userController.sendOtp(req, res, next)
// );

// // change password route
// userRouter.post("/change-password", (req, res, next) =>
//   userController.changePassword(req, res, next)
// );

export default userRouter;
