import { Temp } from "../temp/temp_schema.js";
import { User } from "./user_schema.js";
import { hashPassword } from "../../utils/bcrypt.js";

export default class UserService {
  // create temp data for signup
  async createTempUserDetails(userData) {
    let tempUserData = await Temp.findOne({ email: userData.email });
    if (!tempUserData) {
      tempUserData = await Temp.create(userData);
    } else {
      tempUserData.name = userData.name;
      tempUserData.email = userData.email;
      tempUserData.password = userData.password;
      await tempUserData.save();
    }
    return tempUserData.id;
  }

  // create permanent data of user
  async completeSignup(userId) {
    const tempUser = await Temp.findById(userId).select("+password");
    if (!tempUser) {
      throw new ApplicationError("confirmation link expired", 410);
    }
    await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
    });
    await tempUser.deleteOne();
  }

  // update otp if already exist
  async updateOtp(email, otp) {
    await Temp.findOneAndUpdate({ email }, { otp }, { upsert: true });
  }

  // complete password change
  async changePassword({ email, password, otp }) {
    let userCredentials = await Temp.findOne({ email });
    if (userCredentials?.otp ==  otp) {
      password = await hashPassword(password);
      await User.findOneAndUpdate({ email }, { password });
      await userCredentials.deleteOne();
    } else {
      throw new ApplicationError("otp does not match", 400);
    }
  }
}
