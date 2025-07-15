require('dotenv').config();

async function connectToDatabase() {
    const mongoose = require('mongoose');
    const dbURI = process.env.MONGO_URI || '';

    await mongoose.connect(dbURI)
        .then(() => console.log('Database connected successfully'))
        .catch(err => console.error('Database connection error:', err));
}

module.exports = {
    connectToDatabase
};