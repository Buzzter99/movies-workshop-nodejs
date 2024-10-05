const User = require('../models/User');
async function registerUser({email, password,repeatPassword}) {
    if(password !== repeatPassword) {
        throw new Error('Passwords do not match');
    }
    const existing = await User.findOne({email});
    if(existing) {
        throw new Error('Email already in use');
    }
    await new User({email, password}).save();
}
module.exports = {registerUser}