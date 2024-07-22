import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt-nodejs";

export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: "user not found" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let data = req.body;
   
    if(data.password)
    {
      let hashedpassword = await bcrypt.hash(password, 10);
      data.password=hashedpassword;
    }
    
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { $set: { ...data } },
      { new: true }
    );

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
