const express = require('express');
const route = require('.');
const router = express.Router();
const AuthAdminController = require("../controllers/AuthAdminController"); 

router.post("/login", AuthAdminController.login) 

module.exports = router;