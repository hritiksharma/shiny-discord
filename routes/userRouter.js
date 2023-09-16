const express = require("express");
const { register, signIn,getUserDetail } = require("../controllers/userControllers")
const router = express.Router()


router.post("/signup", register);
router.post("/signin", signIn);
router.get("/me",getUserDetail)

module.exports = router


