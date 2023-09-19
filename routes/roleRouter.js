const express = require("express");

const router = express.Router();
const { createRole, getAllRoles } = require("../controllers/roleControllers");

router.post("/", createRole);
router.get("/", getAllRoles);

module.exports = router;
