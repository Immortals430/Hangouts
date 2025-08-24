import { ApplicationError } from "../../middlewares/error_handler.js";
import { User } from "./user_schema.js";

export default class UserRepository {
  // find user by email and password
  async findByEmailAndPassword(credentials) {
    const user = await User.findOne(credentials).select("+password");
    if (!user) {
      throw new ApplicationError("user account does not exist", 404);
    }
    return user;
  }

  // find user
  async findUser(id) {
    return await User.findOne({ _id: id });
  }
}
