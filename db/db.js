const mongoose = require('mongoose');
const env = require('dotenv').config();
async function OpenDbConnection() {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING || 'mongodb://localhost:27017/Movies');
    console.log('Connected to MongoDB!');
}
module.exports = {OpenDbConnection};
