const express = require('express');
const route = require('.');
const router = express.Router();
const UserController = require("../controllers/UserController"); 

router.post("/saveUser", UserController.saveUser) 

module.exports = router;