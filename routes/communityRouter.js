const express = require("express");
const { protect } = require("../middlewares/authMiddlewares");
const { createCommunity,getAllCommunities } = require("../controllers/communityControllers");

const router = express.Router();
router.post("/", protect, createCommunity);
router.get("/", protect, getAllCommunities);


module.exports = router;
