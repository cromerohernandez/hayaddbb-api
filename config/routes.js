const express = require('express')
const router = express.Router()

const housesController = require('../controllers/houses.controller')

router.post('/houses/new', housesController.create)
router.get('/houses', housesController.get)
router.get('/houses/:id', housesController.getDetail)
router.patch('/houses/:id', housesController.update)
router.delete('/houses/:id', housesController.delete)

module.exports = router