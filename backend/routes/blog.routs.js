const express = require('express');
const router = express.Router();

const blogcontroller = require('../controllers/blog.controller');
const { authentication } = require('../middlewares/auth.middleware');

// Apply authentication middleware to all blog routes
router.use(authentication);

// Define routes for blog operations
router.post('/blog', blogcontroller.createBlog); // Create a new blog post
router.get('/blog', blogcontroller.getBlogs); // Retrieve one blog post
router.put('/blog/:id', blogcontroller.updateBlog); //update blog post
router.get('/blog/:id', blogcontroller.getBlog); // Retrieve single blog posts

module.exports = router;