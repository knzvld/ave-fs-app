const Order = require('../models/orderModel')
const moment = require('moment')

module.exports.getAll = async (req, res) => {
    try {
        const all = await Order.find().sort({date: -1})
        res.send(all)
    } catch (error) {
        res.status(500).send()
    }
}

module.exports.getById = async (req, res) => {
    await Order.findById(req.params.id)
        .then((order) => {
            if(!order){
                return res.status(404).send()
            }
            res.send(order)
        }).catch((err) => {
            res.status(500).send(err)
        })
}

module.exports.delete = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
            .then((order) => {
                if(!order){
                    return res.status(404).send()
                }
                res.send(order)
            }).catch((err) => {
                res.status(500).send(err)
            })
    } catch (error) {
        res.send(error)
    }
}

module.exports.create = async (req, res) => {
    try {
        const newOrder = await new Order({
            name: req.body.name,
            contactPhone: req.body.contactPhone,
            kaspiPhone: req.body.kaspiPhone,
            address: req.body.address,
            orderItems: req.body.orderItems,
            totalPrice: req.body.totalPrice,
            date: moment().format("DD-MM-YYYY / HH:mm")
        })
        await newOrder.save()
        res.send(newOrder)
    } catch (error) {
        res.send(error)
    }
}

module.exports.updateStatus = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then((order) => {
                if(!order){
                    return res.status(404).send()
                }
                res.send(order)
            }).catch((err) => {
                res.status(500).send(err)
            })
    } catch (error) {
        res.send(error)
    }
}