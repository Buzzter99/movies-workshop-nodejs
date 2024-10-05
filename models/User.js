const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true,min: 6,max: 20}
  });
  userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
const User = mongoose.model('User', userSchema)

module.exports = User