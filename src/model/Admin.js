const mongoose = require('mongoose');  

mongoose.Promise = global.Promise;

const AdminSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      required: true,
    },
    role_details: {
        type: String, 
        required: true,
      },
  })

module.exports =  mongoose.model('Admin', AdminSchema);