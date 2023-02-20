const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Size = new Schema({
   size: {
      type: String
   },
   value: {
      type: String
   }
})


const Position = new Schema({
   name: {
    type: String,
    required: true
   },
   category: {
    ref: 'categories',
    type: Schema.Types.ObjectId 
   },
   sizes: [Size],
   description: {
    type: String,
    required: false
   },
   price: {
    type: Number,
    required: true
   },
   imageSrc: [{
    type: String
   }],
   inList : {
    type: Boolean,
    'default': false
   }
})

module.exports = mongoose.model('positions', Position)