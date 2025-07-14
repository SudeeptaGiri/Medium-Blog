const express = require('express');
const router = express.Router();

const blogcontroller = require('../controllers/blog.controller');
const { authentication } = require('../middlewares/auth.middleware');

// Apply authentication middleware to all blog routes
router.use(authentication);

// Define routes for blog operations
router.post('/blog', blogcontroller.createBlog); // Create a new blog post
router.get('/blog', blogcontroller.getBlog); // Retrieve one blog post
router.put('/blog', blogcontroller.updateBlog); //update blog post

module.exports = router;