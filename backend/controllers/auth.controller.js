const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

async function signIn(req, res) {
  const { email, password } = req.body;
  // validate input
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try{
    //check email present or not
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //check password is correct or not
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const response = {
      name: user.name,
      email: user.email,
      id: user._id,
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return res.status(200).json({ message: "Sign in successful",token,response });
  }catch(err){
    return res.status(500).json({message:"Internal Server Error"});
  }
  
  
}

async function signUp(req, res) {
  const {name,email,password} = req.body;
  // validate input
  if(!name || !email || !password){
    return res.status(400).json({message:"All fields are required"});
  }
  // check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    return res.status(400).json({message:"Invalid email format"});
  }
  // check if password is strong
  if(password.length < 6){
    return res.status(400).json({message:"Password must be at least 6 characters long"});
  }
  // check if name is valid
  if(name.length < 3){
    return res.status(400).json({message:"Name must be at least 3 characters long"});
  }
  try{
    //check is email exist in the data base
    const user = await User.findOne({email:email});
    console.log(user);
    if(user){
      return res.status(200).json({message:"Email already registered"});
    }
    //hashpassword 
    const hashedPassword = await bcrypt.hash(password,10);
    //save data to database
    const userSaved = await User.create({name,email,password:hashedPassword});
    const response = {
      name: userSaved.name,
      email: userSaved.email,
      id: userSaved._id,
    };
    const token = jwt.sign({ id: userSaved._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    //return saved response
    return res.status(201).json({message:"User Registered Succesfully",token,response});

  }catch(err){
    return res.status(500).json({message:"Internal Server Error"});
  }
}

module.exports = { signIn, signUp }