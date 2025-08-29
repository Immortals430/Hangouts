import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { ApplicationError } from "../../middlewares/error_handler.js";
import { createToken } from "../../utils/jwt_sign.js";
import { sendConfirmationLink, sendOtpMail } from "../../utils/mailer.js";
import UserRepository from "./user_repository.js";
import UserService from "./user_service.js";
const projectName = process.env.PROJECT_NAME || "Hangouts";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService();
  }

  // initialize signup process
  async signup(req, res, next) {
    let { email, password, confirmPassword } = req.body;

    try {
      if (password !== confirmPassword) {
        throw new ApplicationError("Password must match confirm password", 405);
      }

      let user = await this.userRepository.findUser(email);
      if (user) {
        throw new ApplicationError(
          "User account already exist with this email address",
          409
        );
      }
      password = await hashPassword(password);
      const userId = await this.userService.createTempUserDetails({
        ...req.body,
        password,
      });

      sendConfirmationLink(email, userId);

      return res.status(201).json({
        success: true,
        message: "A confirmation link will be sent to your email.",
      });
    } catch (err) {
      next(err);
    }
  }

  // complete signup process
  async confirmSignup(req, res, next) {
    const { userId } = req.params;
    try {
      await this.userService.completeSignup(userId);

      return res.status(201).json({
        success: true,
        message: "User account created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  // login
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      let user = await this.userRepository.findUserForSignIn(email);
      if (!user) {
        throw new ApplicationError("user account does not exist", 404);
      }
      const passwordIsValid = await comparePassword(password, user.password);
      if (!passwordIsValid) {
        throw new ApplicationError("Incorrect password", 401);
      }
      user.password = null;
      const token = createToken({ id: user.id, email: user.email });

      res
        .status(200)
        .cookie(projectName, token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          domain: process.env.COOKIE_DOMAIN || undefined,
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        })
        .json({
          success: true,
          message: "Signed in successfully",
          data: user,
        });
    } catch (err) {
      next(err);
    }
  }

  // google login
  async googleLogin(req, res, next) {
    const email = req.user.emailAddresses[0].value;
    const name = req.user.names[0].displayName;
    try {
      let user = await this.userRepository.googleLogin(email, name);
      const token = createToken({ id: user.id, email: user.email });

      res
        .status(200)
        .cookie(projectName, token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          domain: process.env.COOKIE_DOMAIN || undefined,
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        })
        .json({
          success: true,
          message: "Signed in successfully",
          data: user,
        });
    } catch (err) {
      next(err);
    }
  }

  // get loggedin status
  async getLoggedInStatus(req, res, next) {
    const email = req.user.email;
    try {
      const userData = await this.userRepository.findUser({ email });
      if (!userData) return new ApplicationError("User not found", 404);
      res
        .status(200)
        .json({ success: true, message: "User Authorised", data: userData });
    } catch (err) {
      next(err);
    }
  }

  // send otp
  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;

      const user = await this.userRepository.findUser({ email });
      const otp = Math.floor(1000 + Math.random() * 9999);
      if (!user) {
        throw new ApplicationError("User not found", 404);
      }
      await this.userService.updateOtp(email, otp);
      sendOtpMail(email, otp);

      res.status(200).json({
        success: true,
        message: "Otp sent to email",
      });
    } catch (err) {
      next(err);
    }
  }

  // change password
  async changePassword(req, res, next) {
    // email, password
    try {
      await this.userService.changePassword(req.body);

      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  // logout
  async logout(req, res, next) {
    try {
      res
        .status(200)
        .cookie(projectName, undefined, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          domain: undefined,
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        })
        .json({
          success: true,
          message: "Logged out successfully",
          data: {},
        });
    } catch (err) {
      next(err);
    }
  }
}
