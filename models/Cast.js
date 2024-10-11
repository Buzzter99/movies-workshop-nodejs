const mongoose = require('mongoose')
const Schema = mongoose.Schema
const castSchema = new Schema({
    name: {type: String,required: [true,'Name field is required'],
    match:[/^[a-zA-Z0-9\s]{5,}$/,'Name must be at least 5 characters']},
    age: {type: Number,required: [true,'Age field is required'],
    min: [1,'Age must be between 1 and 120'],max: [120,'Age must be between 1 and 120']},
    born: {type: String,required: [true,'Born field is required'],
    match:[/^[a-zA-Z0-9\s]{10,}$/,'Born must be at least 10 characters']},
    castImage: {type: String,required: [true,'Cast image field is required'],
    match: [/^(http|https):\/\/.*\.(jpg|jpeg)$/,'Cast image must be valid']},
    movie: [
     {type: Schema.Types.ObjectId,required: false,ref: 'Movie'}
    ],
  });
const Cast = mongoose.model('Cast', castSchema)
module.exports = Cast