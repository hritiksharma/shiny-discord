const express = require("express");
const { protect } = require("../middlewares/authMiddlewares");

const router = express.Router();

const { createCommunity } = require("../controllers/communityControllers");

router.post("/", protect, createCommunity);

module.exports = router;
