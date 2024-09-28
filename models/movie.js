const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MovieSchema = new Schema({
    title: {type: String,required: true},
    genre: {type: String,required: true},
    director: {type: String,required: true},
    year: {type: Number,required: true},
    imageURL: {type: String,required: true},
    rating: {type: Number,required: true},
    description: {type: String,required: true},
    cast: {type: Schema.Types.ObjectId,required: false,ref: 'Cast'},
  });
const Movie = mongoose.model('Movie', MovieSchema)
module.exports = Movie