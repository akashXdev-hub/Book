const express = require("express");
const { userSignup, userLogin } = require("../controllers/userController");
const { validateSignup, validateLogin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup',validateSignup, userSignup);
router.post('/login', validateLogin,userLogin);

module.exports = router;
