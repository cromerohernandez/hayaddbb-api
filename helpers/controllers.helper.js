const queryFields = {
  house: ['address_city', 'area', 'description', 'price']
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
  queryFields[model].forEach(criterion => {
    if(criteria[criterion]) {
      criteria = {...criteria, [criterion]: { $regex: criteria[criterion], $options: 'i' }}
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