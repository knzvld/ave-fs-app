const mongoose = require('mongoose')
const schema = mongoose.Schema

const adminSсhema = new schema({
    login:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('admin', adminSсhema)