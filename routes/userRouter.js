const express = require("express");
const { register } = require("../controllers/userControllers")
const router = express.Router()


router.post("/signup", register);


module.exports = router