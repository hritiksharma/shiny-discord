const express = require("express");
const { protect } = require("../middlewares/authMiddlewares");
const { createMember } = require("../controllers/memberCountrollers");
const router = express.Router();

router.post("/", protect, createMember);

module.exports = router;
