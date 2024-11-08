const express = require("express");
const router = express.Router();
// const { jwtAuthMiddleware } = require("../middlewares/jwtMiddleware"); // Using `require`
const {
    registerUser,
    loginUser
} = require("../controllers/userControllers");

router.post("/register", registerUser);
// router.post("/login", jwtAuthMiddleware, loginUser);
router.post("/login", loginUser);

module.exports = router;
