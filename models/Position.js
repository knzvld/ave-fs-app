const mongoose = require('mongoose')
const Schema = mongoose.Schema



const Position = new Schema({
   name: {
    type: String,
    required: true
   },
   category: {
    ref: 'categories',
    type: Schema.Types.ObjectId 
   },
   sizes: [
    {
        size: {
            type: String
        },
        quantity: {
            type: Number
        }
    }
   ],
   description: {
    type: String,
    required: false
   },
   price: {
    type: Number,
    required: true
   },
   imageSrc: {
    type: String
   },
   inList : {
    type: Boolean,
    'default': false
   }
})

module.exports = mongoose.model('positions', Position)