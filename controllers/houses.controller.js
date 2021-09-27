const createError = require('http-errors')

const House = require('../models/house.model')

const { setCriteria, setSearch, setSort } = require('../helpers/controllers.helper')

module.exports.create = (req, res, next) => {
  const { 
          address_city,
          address_door,
          address_floor,
          address_postcode,
          address_rest,
          address_street_type,
          address_street_name,
          address_street_number,
          area,
          bathrooms,
          bedrooms,
          description,
          garage,
          garden,
          terrace,
          type,
          price,
          ref
        } = req.body

  const house = new House({
    address_city: address_city,
    address_door: address_door,
    address_floor: address_floor,
    address_postcode: address_postcode,
    address_rest: address_rest,
    address_street_type: address_street_type,
    address_street_name: address_street_name,
    address_street_number: address_street_number,
    area: area,
    bathrooms: bathrooms,
    bedrooms: bedrooms,
    description: description,
    garage: garage,
    garden: garden,
    terrace: terrace,
    type: type,
    price: price,
    ref: ref
  })

  house.save()
    .then(house => res.status(201).json(house))
    .catch(next)
}

module.exports.getBasics = (req, res, next) => {
  const criteria = setCriteria(req.query)
  const criteriaAndSearch = setSearch('house', criteria)
  const sort = setSort(req.query)
  const firstIndex = parseInt(req.query.firstIndex)
  const itemsPerPage = parseInt(req.query.itemsPerPage)

  Promise.all([
    House.find(criteriaAndSearch).countDocuments(),
    House.find(criteriaAndSearch).sort(sort).skip(firstIndex - 1).limit(itemsPerPage)
  ])
    .then(data => {
      const houses = data[1]
      if (!houses) {
        throw createError(404, 'houses not found')
      } else {
        const housesBasic = houses.map(house => {
          const houseBasic = {
            id: house.id,
            ref: house.ref,
            address_door: house.address_door,
            address_floor: house.address_floor,
            address_postcode: house.address_postcode,
            address_rest: house.address_rest,
            address_street_type: house.address_street_type,
            address_street_name: house.address_street_name,
            address_street_number: house.address_street_number,
            address_city: house.address_city,
            area: house.area,
            price: house.price,
          }
          return houseBasic
        })

        const housesResponse = {
          housesBasic: housesBasic,
          firstIndex: firstIndex,
          totalNumber: data[0]
        }
        res.status(200).json(housesResponse)
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
        [ 
          'address_city',
          'address_door',
          'address_floor',
          'address_postcode',
          'address_rest',
          'address_street_type',
          'address_street_name',
          'address_street_number',
          'area',
          'bathrooms',
          'bedrooms',
          'description',
          'garage',
          'garden',
          'terrace',
          'type',
          'price'
        ].forEach(key => {
          if (req.body[key] || typeof(req.body[key]) === 'boolean') {
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