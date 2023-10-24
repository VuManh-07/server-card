// const mongoose = require('mongoose'); 
const connectDB = require("../db/mongodb");

const login = async (req, res) => {
    const {username, password} =req.body;
    const db = await connectDB('Card');
    const collection = db.collection("admin");
    try {
        const admin = await collection.findOne({ username, password });
        if (!admin) {
          res.json({
            message: "Login not successful",
            error: "User not found",
            admin: ""
          })
        } else {
          res.json({
            message: "Login successful",
            admin,
            error: ""
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