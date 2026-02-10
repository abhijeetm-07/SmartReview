const express = require("express");
const router = express.Router();
const { generateReview } = require("../controllers/aiController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/review", protect, generateReview);
module.exports = router;
