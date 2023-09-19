const express = require("express");
const { protect } = require("../middlewares/authMiddlewares");
const {
  createCommunity,
  getAllCommunities,
  getAllMembers,
  getMyOwnedCommunity,
  getMyJoinedCommunity,
} = require("../controllers/communityControllers");

const router = express.Router();
router.post("/", protect, createCommunity);
router.get("/", protect, getAllCommunities);
router.get("/:id/members", getAllMembers);
router.get("/me/owner", protect, getMyOwnedCommunity);
router.get("/me/member", protect, getMyJoinedCommunity);

module.exports = router;
