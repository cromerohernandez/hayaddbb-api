const queryFields = {
  house: {
    string: ['ref', 'address', 'address_postcode', 'address_city'],
    number: [],
    range: ['area', 'price']
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
    if(criteria[criterion]) {
      criteria = {...criteria, [criterion]: { $regex: criteria[criterion], $options: 'i' }}
    } else {
      delete criteria[criterion]
    }
  })

  queryFields[model].range.forEach(criterion => {
    if(criteria[criterion + '_min'] && criteria[criterion + '_max']) {
      criteria = {...criteria, [criterion]: { $gte: criteria[criterion + '_min'], $lte: criteria[criterion + '_max'] }}
    } else if(criteria[criterion + '_min']) {
      criteria = {...criteria, [criterion]: { $gte: criteria[criterion + '_min'] }}
    } else if(criteria[criterion + '_max']) {
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