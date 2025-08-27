import { User } from "./user_schema.js";
import { randomBytes } from "crypto";

export default class UserRepository {
  // find user by email and password
  async findUserForSignIn(email) {
    const user = await User.findOne({ email }).select("+password");
    return user;
  }

  // create or proceed google login
  async googleLogin(email, name) {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: randomBytes(20).toString("hex"),
      });
    }
    user.password = "";
    return user;
  }


  // find user
  async findUser(searchQuery) {
    return await User.findOne(searchQuery);
  }





  // find user
  // async findById(id) {
  //   return await User.findById(id);
  // }
}
