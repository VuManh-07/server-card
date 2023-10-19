// const mongoose = require('mongoose'); 
const connectDB = require("../db/mongodb");

const login = async (req, res) => {
    const {username, password} =req.body;
    const db = await connectDB('Card');
    const collection = db.collection("admin");
    try {
        const admin = await collection.findOne({ username, password })
        console.log(admin)
        if (!admin) {
          res.status(401).json({
            message: "Login not successful",
            error: "User not found",
          })
        } else {
          res.status(200).json({
            message: "Login successful",
            admin,
          })
        }
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        })
      }
}

module.exports = {
    login
}