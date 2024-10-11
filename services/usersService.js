const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
async function registerUser({email, password,repeatPassword}) {
    if(User.findOne({email})) {
        throw new Error('Email already in use!');
    }
    if(password !== repeatPassword) {
        throw new Error('Passwords do not match');
    }
    const existing = await User.findOne({email});
    if(existing) {
        throw new Error('Email already in use');
    }
    await new User({email, password}).save();
}
async function loginUser({email, password}) {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('No such user');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        throw new Error('Wrong password');
    }
    const payload = {email: user.email, _id: user._id};
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});
    return token;
}
module.exports = {registerUser,loginUser}