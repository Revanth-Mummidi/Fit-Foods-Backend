 
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("token", token);
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "user is not found or Login first",
    });
  }

  const decode = jwt.verify(token, process.env.SECRET_KEY);

  req.user = await UserModel.findById(decode._id);
  next();
};