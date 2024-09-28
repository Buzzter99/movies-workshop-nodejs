const Cast = require('../models/Cast');

async function createCast(cast) {
    const newCast = await Cast.create(cast);
    await newCast.save();
}


module.exports = {createCast}