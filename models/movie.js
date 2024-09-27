const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MovieSchema = new Schema({
    title: String,
    genre: String,
    director: String,
    year: Number,
    imageURL: String,
    rating: Number,
    description: String
  });
const Movie = mongoose.model('Movie', MovieSchema)
module.exports = Movie