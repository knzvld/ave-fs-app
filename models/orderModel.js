const mongoose = require('mongoose')
const schema = mongoose.Schema

const orderItem = new schema({
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    size: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        'default': 1
    },
    price: {
        type: Number,
        required: true
    }
})

const orderModel = new schema({
    name: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    kaspiPhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    orderItems: [orderItem],
    totalPrice: {
        type: Number,
        required: true
    }, 
    status: {
        type: String,
        required: true,
        'default': 'Новый заказ'
    },
    date: {
        type: String
    }
})

module.exports = mongoose.model('order', orderModel)