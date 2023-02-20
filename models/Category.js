const mongoose = require('mongoose')
const Schema = mongoose.Schema



const Category = new Schema({
   name: {
    type: String,
    required: true
   },
   path: {
      type: String,
      required: true
   },
   imageSrc: {
    type: String,
    'default': ''
   },
   published: {
      type: Boolean,
      'default': false
   },
   set: {
      type: Boolean,
      'default': false
   }
})

module.exports = mongoose.model('categories', Category)