const mongoose = require("mongoose");
const connectDB = require("../db/mongodb");

async function saveUser(req, res) {
  const db = await connectDB('Card');
  const collection = db.collection("students");
  const data = await collection.findOne({ publicKey: req.body.publicKey });
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

async function deleteUser(req, res){
  const code = req.body.code;
  const db = await connectDB('Card');
  const collection = db.collection("students");

  await collection.deleteOne({ code })
  .then((result) => {
    if (result.deletedCount === 1) {
      console.log("Xoá thành công");
      res.json({ message: "Xoá thành công." });
    } else {
      console.log("Không tìm thấy giá trị để xoá");
      res.json({ message: "Không tìm thấy giá trị để xoá." });
    }
  })
  .catch((error) => {
    console.log(error);
    res.json({message: "Delete fail."})
  })
}

module.exports = {
  saveUser,
  deleteUser
};
