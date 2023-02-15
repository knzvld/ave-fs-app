require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const positionRoute = require('./routes/position')
const categoryRoute = require('./routes/category')


require('./db')


const app = express()
app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev')) 
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoute)
app.use('/api/category', categoryRoute)




module.exports = app