const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MovieSchema = new Schema({
    title: {type: String,required: true},
    genre: {type: String,required: true},
    director: {type: String,required: true},
    year: {type: Number,required: true,min: 1900,max: 2100},
    imageURL: {type: String,required: true,match: /^(http|https):\/\/.*\.(jpg|jpeg)$/},
    rating: {type: Number,required: true,min:1,max:5},
    description: {type: String,required: true},
    cast: [{
      NameInMovie: {type: String,required: false},
      ref:{type: Schema.Types.ObjectId,required: false,ref: 'Cast'},_id: false
    },
  ],
  });
const Movie = mongoose.model('Movie', MovieSchema)
module.exports = Movie