const mongoose = require('mongoose');
const env = require('dotenv').config();
async function OpenDbConnection() {
    mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017/Movies?authSource=admin`)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Error connecting to MongoDB', err));
}
module.exports = {OpenDbConnection};
