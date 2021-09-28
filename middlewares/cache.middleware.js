const mcache = require('memory-cache')

module.exports.cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
   
    if (cachedBody) {   
      res.send(cachedBody)
      return
    } else { 
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}

module.exports.delKeyDetailCache = (req, _, next) => {
  let key  = '__express__/houses/' + req.params.id
  mcache.del(key)
  next()
}

module.exports.delAllKeysBasicsCache = (req, _, next) => {
  let keysCache = mcache.keys()

  keysCache.forEach(key => {
    if (key.includes('?')) {
      mcache.del(key)
    }
  })
  next()
}

module.exports.clearCache = (req, _, next) => {
  mcache.clear()
  next()
}