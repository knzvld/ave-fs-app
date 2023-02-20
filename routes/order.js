const express = require('express')
const orderController = require('../controllers/order')
const passport = require('passport')
const router = express.Router()


router.get('/', orderController.getAll)
router.get('/:id', orderController.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), orderController.delete)
router.patch('/:id', passport.authenticate('jwt', {session: false}), orderController.updateStatus)
router.post('/', passport.authenticate('jwt', {session: false}), orderController.create)


module.exports = router