import UserModel from "../models/UserModel.js";
import { sendcookie } from "../utils/cookie_util.js";
import bcrypt from "bcrypt";
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
    });

    sendcookie(user, res, "successfully registered", 201);
  } catch (e) {
    console.log(e)
    throw next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Register first",
      });
    }

    const encrypted = await bcrypt.compare(password, user.password);
    if (!encrypted) {
      return res.status(404).json({
        success: false,
        message: "your password is incorrect",
      });
    }

    sendcookie(user, res, `welcome back,${user.name}`, 201);
  } catch (e) {
    throw next(e);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(0),
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully logout",
        user: req.user,
      });
  } catch (e) {
    throw next(e);
  }
};
