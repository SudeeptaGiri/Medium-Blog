const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    posts:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Blog'
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;