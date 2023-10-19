const mongoose = require("mongoose");
const connectDB = require("../db/mongodb");

async function saveUser(req, res) {
  const db = await connectDB(req.params.db);
  const colection = db.collection("userSV");
  const data = await colection.find({ publicKey: req.body.publicKey });
  console.log(data);
  if (data == null) {
    const newuser = {
      _id: new mongoose.Types.ObjectId(),
      publicKey: req.body.publicKey,
      code: req.body.code,
    };

    try {
      const result = await collection.insertOne(newuser);
      return res.status(201).json({
        success: true,
        message: "New cause created successfully",
        user: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    }
  }
}

module.exports = {
  saveUser,
};
