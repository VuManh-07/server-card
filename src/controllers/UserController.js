const mongoose = require("mongoose");
const userModel = require("../model/User");

async function saveUser(req, res) {
  try {
    const data = await userModel.findOne({ publicKey: req.body.publicKey });
    console.log(data);

    if (data !== null) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const newuser = new userModel({
      _id: new mongoose.Types.ObjectId(),
      publicKey: req.body.publicKey,
      code: req.body.code,
      name: req.body.name,
    });

    const result = await newuser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const code = req.body.code;
    const result = await userModel.deleteOne({ code });

    if (result.deletedCount === 1) {
      return res.json({
        deletedCount: result.deletedCount,
        message: "Xoá thành công.",
      });
    } else {
      return res.json({
        deletedCount: result.deletedCount,
        message: "Không tìm thấy giá trị để xoá.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Delete failed.",
      error: error.message,
    });
  }
}

module.exports = {
  saveUser,
  deleteUser,
};
