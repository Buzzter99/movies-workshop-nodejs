const mongoose = require('mongoose')
const Schema = mongoose.Schema
const castSchema = new Schema({
    name: {type: String,required: true},
    age: {type: Number,required: true,min: 10,max: 90},
    born: {type: String,required: true},
    //nameInMovie: {type: String,required: true},
    castImage: {type: String,required: true,match: /^(http|https):\/\/.*\.(jpg|jpeg)$/},
    movie: [{type: Schema.Types.ObjectId,required: false,ref: 'Movie'}],
  });
const Cast = mongoose.model('Cast', castSchema)
module.exports = Cast