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

module.exports = {
  getProduct: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query
      limit = parseInt(limit)
      if (sort === undefined || sort === null || sort === '' || !sort) {
        if (search === '' || !search) {
          page = parseInt(page)
          const totalData = await getProductCountModel()
          const totalPage = Math.ceil(totalData / limit)
          const offSet = page * limit - limit
          const prevLink =
            page > 1
              ? qs.stringify({ ...req.query, ...{ page: page - 1 } })
              : null
          const nextLink =
            page < totalPage
              ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
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
          const result = await getProductModel(limit, offSet)
          return helper.response(
            res,
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
              ? qs.stringify({ ...req.query, ...{ page: page - 1 } })
              : null
          const nextLink =
            page < totalPage
              ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
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
            res,
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
              ? qs.stringify({ ...req.query, ...{ page: page - 1 } })
              : null
          const nextLink =
            page < totalPage
              ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
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
            res,
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
              ? qs.stringify({ ...req.query, ...{ page: page - 1 } })
              : null
          const nextLink =
            page < totalPage
              ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
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
            res,
            200,
            'Success Get Product By Name',
            result,
            pageInfo
          )
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
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
  postProduct: async (req, res) => {
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
      } = req.body

      const setData = {
        category_id,
        product_name,
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
      return helper.response(res, 200, 'Success Product Add', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (req, res) => {
    try {
      const { id } = req.params
      const {
        category_id,
        product_name,
        product_price,
        product_status
      } = req.body
      const setData = {
        category_id,
        product_name,
        product_price,
        product_updated_at: new Date(),
        product_status
      }
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchProductModel(id, setData)
        return helper.response(res, 200, 'Success Product Updated', result)
      } else {
        return helper.response(res, 404, `Product By Id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Product Not Updated', error)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        const result = await deleteProductModel(id)
        return helper.response(res, 200, 'Success Product Deleted', result)
      } else {
        return helper.response(res, 404, `Product By Id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', error)
    }
  }
}
