const express = require('express')
const upload = require('../middleware/upload')
const categoryController = require('../controllers/category')
//const passport = require('passport')
const router = express.Router()


router.get('/', categoryController.getAll)
router.post('/', upload.single('imageSrc'), categoryController.create)
router.get('/:id', categoryController.getById)
router.delete('/:id', categoryController.delete)
router.patch('/:id', upload.single('imageSrc'), categoryController.update)


module.exports = router