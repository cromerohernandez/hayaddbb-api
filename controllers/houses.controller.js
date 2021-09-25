const createError = require('http-errors')

const House = require('../models/house.model')

module.exports.create = (req, res, next) => {
  const { address, area, description, features, price } = req.body

  const house = new House({
    address: {
      city: address.city,
      door: address.door,
      floor: address.floor,
      street_type: address.street_type,
      street_name: address.street_name,
      street_number: address.street_number,
    },
    area: area,
    description: description,
    features: {
      bathrooms: features.bathrooms,
      bedrooms: features.bedrooms,
      garden: features.garden,
      terrace: features.terrace,
      type: features.type,
    },
    price: price,
  })

  house.save()
    .then(house => res.status(201).json(house))
    .catch(next)
}

module.exports.get = (req, res, next) => {
  House.find({})
    .then(houses => {
      if (!houses) {
        throw createError(404, 'houses not found')
      } else {
        res.status(200).json(houses)
      }
    })
    .catch(next)
}

module.exports.getDetail = (req, res, next) => {

  House.findOne({ _id: req.params.id })
    .then(house => {
      if (!house) {
        throw createError(404, 'house not found')
      } else {
        res.status(200).json(house)
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {  
  House.findOne({ _id: req.params.id })
    .then(house => {
      if (!house) {
        throw createError(404, 'house not found')
      } else {
        ['address', 'area', 'description', 'features', 'price'].forEach(key => {
          if (req.body[key]) {
            house[key] = req.body[key]
          }
        })
        house.save()
          .then(updatedHouse => {
            res.status(200).json(updatedHouse)
          })
      }
    })
    .catch(next)
}

module.exports.delete = (req, res ,next) => {
  House.findByIdAndDelete(req.params.id)
    .then(house => {
      if (!house) {
        throw createError(404, 'house not found')
      } else {
        res.status(204).json()
      }
    })
    .catch(next)
}