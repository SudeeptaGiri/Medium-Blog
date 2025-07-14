const express = require('express');
const router = express.Router();

const authcontroller = require('../controllers/auth.controller');

// Define routes for authentication
router.post('/signin', authcontroller.signIn);
router.post('/signup', authcontroller.signUp);

module.exports = router;