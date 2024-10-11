const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MovieSchema = new Schema({
    title: {type: String,required: [true,'Title field is required'],
    match:[/^[a-zA-Z0-9\s]{5,}$/,'Title must be at least 5 characters'],
    },
    genre: {type: String,required: [true,'Genre field is required'],
    match:[/^[a-zA-Z0-9\s]{5,}$/,'Genre must be at least 5 characters']
    },
    director: {type: String,required: [true,'Director field is required'],
    match:[/^[a-zA-Z0-9\s]{5,}$/,'Director must be at least 5 characters']
    },
    year: {type: Number,required: [true,'Year field is required'],min: [1900,'Year must be between 1900 and 2024'],max: [2024,'Year must be between 1900 and 2024']},
    imageURL: {type: String,required: [true,'Image URL field is required'],
      match: [/^(http|https):\/\/.*\.(jpg|jpeg)$/,'Image URL must be valid']},
    rating: {type: Number,required: [true,'Rating field is required'],
      min:[1,'Rating must be between 1 and 5'],max:[5,'Rating must be between 1 and 5']},
    description: {type: String,required: [true,'Description field is required']},
    match:[/^[a-zA-Z0-9\s]{20,}$/,'Description must be at least 20 characters'],
    cast: [{
    NameInMovie: {type: String,required: false,
    match:[/^[a-zA-Z0-9\s]{5,}$/,'Name in movie must be at least 5 characters']
      },
    ref:{type: Schema.Types.ObjectId,required: false,ref: 'Cast'},_id: false
    },
  ],
  ownerId: {type: Schema.Types.ObjectId,required: [true,'Owner field is required'],ref: 'User'},
  });
const Movie = mongoose.model('Movie', MovieSchema)
module.exports = Movie