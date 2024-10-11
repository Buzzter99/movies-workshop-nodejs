const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {type: String,required: [true,'Email field is required'],
      unique: true,
      min:[10,'Email must be at least 10 characters'],
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,'Email must be valid']
    },
    password: {type: String,required: [true,'Password field is required'],
      min: [6,'Password must be at least 6 characters'],
      match: [/^[a-zA-Z0-9]+$/,'Password must be alphanumeric']
    }
  });


  userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
const User = mongoose.model('User', userSchema)

module.exports = User