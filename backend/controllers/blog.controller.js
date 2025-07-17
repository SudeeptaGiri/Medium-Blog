const Blog = require('../models/blogs.model');
const User = require('../models/user.model');

async function createBlog(req, res) {
  const { title, content, published } = req.body;
  // Validate input
  if (!title || !content ) {
    return res.status(400).send({ message: 'All fields are required' });
  }
  try{
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const author = user.name;
    const authorId = user._id;
    console.log(authorId);
    // Create a new blog post
    const newBlog = {
      title,
      content,
      author,
      authorId,
      published
    };
    // Check if the authorId is valid
    const authorExists = await User.findById(authorId);
    if (!authorExists) {
      return res.status(404).send({ message: 'Author not found' });
    }
    // Save the blog post to the database
    const blog = await Blog.create(newBlog);
    if (!blog) {
      return res.status(500).send({ message: 'Failed to create blog' });
    }
    return res.status(201).send({ message: 'Blog created successfully', blog });
  }catch(err){
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}

//TO-DO: Add Pagination
async function getBlogs(req, res) {
  // Logic to retrieve all blog posts
  try{
    const blogs = await Blog.find();
    if (!blogs) {
      return res.status(404).send({ message: 'No blogs found' });
    }
    if (blogs.length === 0) {
      return res.status(200).send({ message: 'No blogs available' });
    } 
    return res.status(200).send({ message: 'Blogs retrieved successfully', blogs });
  }catch(err){
    return res.status(500).send({ message: 'Internal Server Error' });
  }
  

}

async function updateBlog(req, res) {
  // Logic to update a blog post
  const blogId = req.params.id;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send({ message: 'Title and content are required' });
  }
  try{
    
    // Update the blog post in the database
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send({ message: 'Blog not found' });
    }
    const updatedBlog = {
      title,
      content,
      author: blog.author,
      authorId: blog.authorId,
    };
    const updated = await Blog.updateOne({ _id: blogId }, updatedBlog);
    if (updated.nModified === 0) {
      return res.status(500).send({ message: 'Failed to update blog' });
    }
    // Return the updated blog post
    const updatedBlogData = await Blog.findById(blogId);
    return res.status(200).send({ message: 'Blog updated successfully',updatedBlog: updatedBlogData });
    
  }
  catch(err){
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function getBlog(req, res) {
  // Logic to retrieve a blog post by ID
  const blogId = req.params.id;
  if (!blogId) {
    return res.status(400).send({ message: 'Blog ID is required' });
  }
  try{
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send({ message: 'Blog not found' });
    }
    return res.status(200).send({ message: 'Blog retrieved successfully', blog });
  }
  catch(err){
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}

module.exports = {
  createBlog, getBlogs, updateBlog, getBlog
};