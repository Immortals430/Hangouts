import jwt from "jsonwebtoken";
import UserRepository from "./user_repository.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { ApplicationError } from "../../middlewares/error_handler.js";
import { createToken } from "../../utils/jwt_sign.js";
const jwtSecret = process.env.JWT_SECRET || "xyz";
const projectName = process.env.PROJECT_NAME || "Hangouts";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }



  // login
  async login(req, res, next) {
    // body: email, password
    try {
      let user = await this.userRepository.findByEmailAndPassword(req.body);

      const passwordIsValid = await comparePassword(password, user.password);
      if (!passwordIsValid) {
        throw new ApplicationError("Incorrect password", 401);
      }
      delete user.password
      const token = createToken({ id: user.id, email: user.email });

      res
        .status(200)
        .json({
          success: true,
          message: "Signed in successfully",
          data: user,
          token,
        });
    } catch (err) {
      next(err);
    }
  }




  // get loggedin status
  async getLoggedInStatus(req, res, next) {
    const jwtToken = req.headers.authorization;
    try {
      const { id } = jwt.verify(jwtToken, jwtSecret);
      const userData = await this.userRepository.findUser(id);
      res
        .status(200)
        .json({ success: true, message: "User Authorised", data: userData });
    } catch (err) {
      next(err);
    }
  }


}
