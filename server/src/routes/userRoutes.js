const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Route for admin to create new users
router.post('/create', protect, admin, createUser);

// Route for users to login
router.post('/login', loginUser);

module.exports = router;
