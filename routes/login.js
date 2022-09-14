const express = require('express');
const { registerView, loginView, registerUser, loginUser } = require('../controllers/loginController');
const { dashboardView, dashboardLogout } = require("../controllers/dashboardController");
const { protectRoute } = require('../auth/protect');

const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);

// dashboard
router.get("/dashboard", protectRoute, dashboardView);

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/logout", dashboardLogout);

module.exports = router;