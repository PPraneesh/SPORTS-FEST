const express = require("express");
const {register, success} = require("../controllers/paymentController");
const {getStats} = require("../controllers/statsController");
const {Category} = require("../controllers/categoryController");

const router = express.Router();

router.post("/register", register);
router.post("/success", success);
router.get("/stats",getStats)
router.get('/teams/:category',Category)
module.exports = router;