const express = require('express')
const router = express.Router()

const housesController = require('../controllers/houses.controller')

const cacheMiddleware = require('../middlewares/cache.middleware')

router.post('/houses/new', cacheMiddleware.clearCache, housesController.create)
router.get('/houses', cacheMiddleware.cache(1 * 60), housesController.getBasics)
router.get('/houses/:id', cacheMiddleware.cache(1 * 60), housesController.getDetail)
router.patch('/houses/:id', cacheMiddleware.delKeyDetailCache, cacheMiddleware.delAllKeysBasicsCache, housesController.update)
router.delete('/houses/:id', cacheMiddleware.clearCache, housesController.delete)

module.exports = router