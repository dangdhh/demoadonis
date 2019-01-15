"use strict";
const Env = use("Env");
const User = use("App/Models/User");
const Hash = use("Hash");
const Event = use("Event");
const randomstring = require("randomstring");

class UserController {
  //hàm login
  async login({ request, auth }) {
    try {
      const { email, password } = request.only(["email", "password"]);
      const user = await User.findByOrFail("email", email);

      const token = await auth.attempt(email, password);
      return token;
    } catch (error) {
      return {
        messenger: error.message
      };
    }
  }

  //hàm đăng kí tài khoản mới
  async register({ request,response }) {
    const { email, password, username } = request.only([
      "email",
      "password",
      "username"
    ]);
    const verify_code = randomstring.generate(7); //tạo mã xác thực tài khoản
    await User.create({
      email,
      password,
      username,
      verify_code
    });

    const data = {
      //tạo đối tượng data có chưa dữ liệu để gửi mail
      username: username,
      email: email,
      verify_code: verify_code,
      link: Env.get("APP_URL")
    };
    //event gửi mail
    Event.emit("sendemail", data);
    //kết thúc event gửi mail
    // return this.login(...arguments);
    return response.json({
      status: "success",
      message: "Registed!",
      verify_code: verify_code
    });
  }

  // hàm update profile
  async updateProfile({ request, auth, response }) {
    const user = await auth.getUser();
    user.merge(request.only(["username"]));
    user.save();
    return response.json({
      status: "success",
      message: "Profile updated!"
    });
  }

  // hàm đổi password
  async changePassword({ request, auth, response }) {
    const user = await auth.getUser();
    //xác minh nếu mật khẩu hiện tại đúng
    const verifyPassword = await Hash.verify(
      request.input("password"),
      user.password
    );

    if (!verifyPassword) {
      return response.status(400).json({
        status: "error",
        message: "Current password could not be verified! Please try again."
      });
    }

    user.password = await Hash.make(request.input("newPassword"));
    console.log(user);
    await user.save();

    return response.json({
      status: "success",
      message: "Password updated!"
    });
  }

  async active({ request,auth }) {
    const { email, code } = request.all();
    console.log(email, code);
    const user = await User.findBy("email", email);
    console.log(user);
    if (user.verify_code != code) {
      throw new Error();
    }
    user.merge({ active: true });
    user.save();

    const token = await auth.generate(user);
    return {
      status: "success",
      message: "Verify successfully",
      token: token
    };
  }

  async showProfile({ auth, response }) {
    const user = await auth.getUser();
    console.log(user);
    const userPost = await user
      .posts()
      .with("replies")
      .fetch();
    console.log(userPost);
    return response.json({
      status: "success",
      data: userPost
    });
  }
}

module.exports = UserController;
