const queryFields = {
  house: {
    string: [
      'ref',
      'address_street_type',
      'address_street_name',
      'address_street_number',
      'address_floor',
      'address_door',
      'address_postcode',
      'address_city',
      'type'
    ],
    boolean: [
      'garage',
      'garden',
      'terrace'
    ],
    range: ['area', 'bathrooms', 'bedrooms', 'price']
  }
}

//remove fields ('itemsPerPage', 'firstIndex', 'sort', 'sortDirection') from criteria array.
function setCriteria (query) {
  const criteria = {...query}
  const notCriteria = ['itemsPerPage', 'firstIndex', 'sort', 'sortDirection']
  notCriteria.forEach(v => delete criteria[v])
  return criteria
}

//remove empty fields from criteria array and set format of criteria array fields.
function setSearch (model, criteria) {
  queryFields[model].string.forEach(criterion => {
    if (criteria[criterion]) {
      criteria = {...criteria, [criterion]: { $regex: criteria[criterion], $options: 'i' }}
    } else {
      delete criteria[criterion]
    }
  })

  queryFields[model].boolean.forEach(criterion => {
    if (criteria[criterion] === 'true') {
      criteria = {...criteria, [criterion]: true}
    } else if (criteria[criterion] === 'false') {
      criteria = {...criteria, [criterion]: false}
    } else {
      delete criteria[criterion]
    }
  })

  queryFields[model].range.forEach(criterion => {
    if (criteria[criterion + '_min'] && criteria[criterion + '_max']) {
      criteria = {...criteria, [criterion]: { $gte: criteria[criterion + '_min'], $lte: criteria[criterion + '_max'] }}
    } else if (criteria[criterion + '_min']) {
      criteria = {...criteria, [criterion]: { $gte: criteria[criterion + '_min'] }}
    } else if (criteria[criterion + '_max']) {
      criteria = {...criteria, [criterion]: { $lte: criteria[criterion + '_max'] }}
    } else {
      delete criteria[criterion]
    }
  })

  return criteria
}

//extract sort criteria from req.query
function setSort (query) {
  const sortField = query.sort
  const sortDirection = query.sortDirection
  const sort = {}
  sort[sortField] = sortDirection
  return sort
}

module.exports = {
  setCriteria,
  setSearch,
  setSort
}