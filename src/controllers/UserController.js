const mongoose = require('mongoose'); 
const User = require("../model/User");


async function saveUser (req, res) { 
    await User.find({publicKey: req.body.publicKey})
    .then(async data=>{
        console.log(data);
        if(data.length == 0) {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                publicKey: req.body.publicKey,
                code: req.body.code 
              });
              
              try {
                  const newUser = await user
                      .save();
                  return res.status(201).json({
                      success: true,
                      message: 'New cause created successfully',
                      user: newUser,
                  });
              } catch (error) {
                  console.log(error);
                  res.status(500).json({
                      success: false,
                      message: 'Server error. Please try again.',
                      error: error.message,
                  });
              }
        }
    }) 
}

module.exports = {
    saveUser 
}