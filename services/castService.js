const Cast = require('../models/Cast');
async function createCast(cast) {
    const newCast = await Cast.create(cast);
    await newCast.save();
}
async function getAllCasts(...args) {
    return await Cast.find({}, ...args).lean();
}
async function findByIdAndUpdateCast(castId, movieId) {
    const cast = await Cast.findById(castId);
    cast.movie.push(movieId);
    await cast.save();
}
async function getAllCastsExcept(movieId){
    return await Cast.find({ movie: { $nin: [movieId] } }).lean();
}
async function getCastById(id) {
    return await Cast.findById(id).lean();
}
module.exports = {
    createCast, 
    getAllCasts, 
    findByIdAndUpdateCast,
    getCastById,
    getAllCastsExcept
}