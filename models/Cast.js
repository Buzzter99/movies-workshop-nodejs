const mongoose = require('mongoose')
const Schema = mongoose.Schema
const castSchema = new Schema({
    name: {type: String,required: true},
    age: {type: Number,required: true},
    born: {type: String,required: true},
    nameInMovie: {type: String,required: true},
    castImage: {type: String,required: true},
    movie: {type: Schema.Types.ObjectId,required: false,ref: 'Movie'},
  });
const cast = mongoose.model('Cast', castSchema)
module.exports = Cast