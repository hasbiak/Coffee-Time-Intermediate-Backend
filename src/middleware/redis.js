const helper = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          'Success Get Product By Id',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  getProductRedis: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          console.log('data ada di dalam redis')
          const newResult = JSON.parse(result)
          return helper.response(
            response,
            200,
            'Success Get Product',
            newResult.result,
            newResult.pageInfo
          )
        } else {
          next()
        }
      }
    )
  },
  clearDataProductRedis: (request, response, next) => {
    client.keys('getproduct*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getcategorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          'Success Get Category By Id',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  }
}
