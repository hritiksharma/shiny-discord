const express = require("express");
const { protect } = require("../middlewares/authMiddlewares");
const {
  createCommunity,
  getAllCommunities,
  getAllMembers,
} = require("../controllers/communityControllers");

const router = express.Router();
router.post("/", protect, createCommunity);
router.get("/", protect, getAllCommunities);
router.get("/:id/members", getAllMembers);

module.exports = router;
