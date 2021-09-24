const express = require('express')
const router = express.Router()

const housesController = require('../controllers/houses.controller')

router.post('/houses/new', housesController.create)
router.get('/houses/:id', housesController.get)
router.patch('/houses/:id', housesController.update)
router.delete('/houses/:id', housesController.delete)

module.exports = router