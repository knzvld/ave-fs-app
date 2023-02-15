const express = require('express')
//const upload = require('../middleware/upload')
const positionController = require('../controllers/position')
//const passport = require('passport')
const router = express.Router()


router.get('/', positionController.getAll)
router.get('/byCategory/:categoryId', positionController.getByCategoryId)
router.get('/:id', positionController.getById)
router.post('/', positionController.create)
router.delete('/:id', positionController.delete)
router.patch('/:id', positionController.update)


module.exports = router