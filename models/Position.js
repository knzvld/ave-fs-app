const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Sizes = new Schema({
   size: {
      type: String
   },
   value: {
      type: Number
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
   sizes: [Sizes],
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