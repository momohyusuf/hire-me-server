const { completeProfileSetup } = require("../controllers/profileController");
const { authenticationMiddleware } = require("../middleware/authMiddleware");

const express = require("express");

// Create an Express router
const router = express.Router();

router.post("/setup", authenticationMiddleware, completeProfileSetup);

module.exports = router;
