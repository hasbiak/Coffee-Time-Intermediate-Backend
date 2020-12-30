const {
  getProductModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  deleteProductModel,
  getProductCountModel,
  getProductByNameModel,
  getProductCountNameModel,
  getproductByNameSorting,
  getProductNameSorting
} = require('../model/m_product')
const helper = require('../helper/response')
const qs = require('querystring')
const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')

module.exports = {
  getProduct: async (request, response) => {
    try {
      let { page, limit, search, sort } = request.query
      limit = parseInt(limit)
      if (sort === undefined || sort === null || sort === '' || !sort) {
        if (search === '' || !search) {
          page = parseInt(page)
          const totalData = await getProductCountModel()
          const totalPage = Math.ceil(totalData / limit)
          const offSet = page * limit - limit
          const prevLink =
            page > 1
              ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
              : null
          const nextLink =
            page < totalPage
              ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
              : null

          const pageInfo = {
            page,
            totalPage,
            limit,
            totalData,
            nextLink:
              nextLink &&
              `http://localhost:${process.env.PORT}/product?${nextLink}`,
            prevLink:
              prevLink &&
              `http://localhost:${process.env.PORT}/product?${prevLink}`
          }
          const result = await getProductModel(limit, offSet, search, sort)
          const newData = { result, pageInfo }
          client.setex(
            `getproduct:${JSON.stringify(request.query)}`,
            3600,
            JSON.stringify(newData)
          )
          return helper.response(
            response,
            200,
            'Success Get Product',
            result,
            pageInfo
          )
        } else {
          const totalData = await getProductCountNameModel(search)
          const totalPage = Math.ceil(totalData / limit)
          if (totalData.length > limit) {
            page = parseInt(page)
          } else {
            page = 1
          }
          const offSet = page * limit - limit
          const prevLink =
            page > 1
              ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
              : null
          const nextLink =
            page < totalPage
              ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
              : null

          const pageInfo = {
            page,
            totalPage,
            limit,
            totalData,
            nextLink:
              nextLink &&
              `http://localhost:${process.env.PORT}/product/?${nextLink}`,
            prevLink:
              prevLink &&
              `http://localhost:${process.env.PORT}/product/?${prevLink}`
          }
          const result = await getProductByNameModel(search, limit, offSet)
          return helper.response(
            response,
            200,
            'Success Get Product',
            result,
            pageInfo
          )
        }
      } else {
        if (search === '' || !search) {
          page = parseInt(page)
          const totalData = await getProductCountModel()
          const totalPage = Math.ceil(totalData / limit)
          const offSet = page * limit - limit
          const prevLink =
            page > 1
              ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
              : null
          const nextLink =
            page < totalPage
              ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
              : null

          const pageInfo = {
            page,
            totalPage,
            limit,
            totalData,
            nextLink:
              nextLink &&
              `http://localhost:${process.env.PORT}/product?${nextLink}`,
            prevLink:
              prevLink &&
              `http://localhost:${process.env.PORT}/product?${prevLink}`
          }
          const result = await getProductNameSorting(sort, limit, offSet)
          return helper.response(
            response,
            200,
            'Success Get Product',
            result,
            pageInfo
          )
        } else {
          const totalData = await getProductCountNameModel(search)
          const totalPage = Math.ceil(totalData / limit)
          console.log(totalData)
          if (totalData.length >= limit) {
            page = parseInt(page)
          } else {
            page = 1
          }
          const offSet = page * limit - limit
          const prevLink =
            page > 1
              ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
              : null
          const nextLink =
            page < totalPage
              ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
              : null

          const pageInfo = {
            page,
            totalPage,
            limit,
            totalData,
            nextLink:
              nextLink &&
              `http://localhost:${process.env.PORT}/product/?${nextLink}`,
            prevLink:
              prevLink &&
              `http://localhost:${process.env.PORT}/product/?${prevLink}`
          }
          const result = await getproductByNameSorting(
            search,
            sort,
            limit,
            offSet
          )
          return helper.response(
            response,
            200,
            'Success Get Product By Name',
            result,
            pageInfo
          )
        }
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
        client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success Get Product By Id ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Product By Id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    if (
      request.body.category_id === undefined ||
      request.body.category_id === null ||
      request.body.category_id === ''
    ) {
      return helper.response(response, 404, 'category_id must be filled')
    } else if (
      request.body.product_name === undefined ||
      request.body.product_name === null ||
      request.body.product_name === ''
    ) {
      return helper.response(response, 404, 'product_name must be filled')
    } else if (
      request.body.product_price === undefined ||
      request.body.product_price === null ||
      request.body.product_price === ''
    ) {
      return helper.response(response, 404, 'product_price must be filled')
    } else if (
      request.body.product_status === undefined ||
      request.body.product_status === null ||
      request.body.product_status === ''
    ) {
      return helper.response(response, 404, 'product_status must be filled')
    }
    try {
      const {
        category_id,
        product_name,
        product_price,
        product_stock,
        product_description,
        product_order_delivery,
        product_dine_in,
        product_take_away,
        product_status
      } = request.body

      const setData = {
        category_id,
        product_name,
        product_image: request.file === undefined ? '' : request.file.filename,
        product_price,
        product_stock,
        product_description,
        product_order_delivery,
        product_dine_in,
        product_take_away,
        product_created_at: new Date(),
        product_status
      }
      const result = await postProductModel(setData)
      return helper.response(response, 200, 'Success Product Add', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const {
        category_id,
        product_name,
        product_price,
        product_stock,
        product_description,
        product_order_delivery,
        product_dine_in,
        product_take_away,
        product_status
      } = request.body
      const setData = {
        category_id,
        product_name,
        product_image: request.file === undefined ? '' : request.file.filename,
        product_price,
        product_stock,
        product_description,
        product_order_delivery,
        product_dine_in,
        product_take_away,
        product_updated_at: new Date(),
        product_status
      }
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        const image = checkId[0].product_image
        await fs.unlink(`./uploads/product/${image}`, (err) => {
          if (!err) {
            console.log(
              `successfully updated ${image} with ${setData.product_image}`
            )
          } else {
            console.log('image does not exist')
          }
        })
        const result = await patchProductModel(setData, id)
        return helper.response(response, 200, 'Succeed Updated Product', result)
      } else {
        return helper.response(
          response,
          404,
          `Product with id : ${id} is not found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        if (checkId[0].product_image === '') {
          const result = await deleteProductModel(id)
          return helper.response(
            response,
            200,
            'Success Product Deleted',
            result
          )
        } else {
          const path = `./uploads/product/${checkId[0].product_image}`
          fs.unlink(path, (err) => {
            if (err) {
              console.log(err)
            }
          })
          const result = await deleteProductModel(id)
          return helper.response(
            response,
            200,
            'Success Product Deleted',
            result
          )
        }
      } else {
        return helper.response(response, 404, `Product By Id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 404, 'Bad Request', error)
    }
  }
}
