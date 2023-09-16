const express = require("express");
const { register } = require("../controllers/userControllers")
const router = express.Router()


router.post("/signup", register);
// router.post("/signin", login)

module.exports = router


