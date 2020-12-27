const {
  getCouponModel,
  getCouponByIdModel,
  postCouponModel,
  patchCouponModel,
  deleteCouponModel
} = require('../model/m_coupon')
const helper = require('../helper/response')

module.exports = {
  getCoupon: async (req, res) => {
    try {
      const result = await getCouponModel()
      return helper.response(res, 200, 'Success Get Category', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getCouponById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getCouponByIdModel(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Category By Id', result)
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postCoupon: async (req, res) => {
    try {
      const {
        coupon_name,
        coupon_discount,
        coupon_description,
        coupon_status
      } = req.body
      if (
        coupon_name == null ||
        coupon_discount == null ||
        coupon_description == null ||
        coupon_status == null
      ) {
        console.log('All data must be filled in')
      } else {
        const setData = {
          coupon_name,
          coupon_discount,
          coupon_description,
          coupon_updated_at: new Date(),
          coupon_status
        }
        const result = await postCouponModel(setData)
        return helper.response(res, 200, 'Success Post Product', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  patchCoupon: async (req, res) => {
    try {
      const { id } = req.params
      const {
        coupon_name,
        coupon_status,
        coupon_description,
        coupon_discount
      } = req.body
      if (
        coupon_name == null ||
        coupon_discount == null ||
        coupon_description == null ||
        coupon_status == null
      ) {
        console.log('All data must be filled in')
      } else {
        const setData = {
          coupon_name,
          coupon_discount,
          coupon_description,
          coupon_created_at: new Date(),
          coupon_status
        }
        const checkId = await getCouponByIdModel(id)
        if (checkId.length > 0) {
          // proses update data
          const result = await patchCouponModel(setData, id)
          return helper.response(res, 200, 'Success Patch Promo Code', result)
        } else {
          return helper.response(res, 404, `Product By Id : ${id} Not Found`)
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteCoupon: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deleteCouponModel(id)
      if (result.length == null) {
        return helper.response(
          res,
          200,
          `Success Delete Promo Code By Id : Promo Code ${id} deleted`
        )
      } else {
        return helper.response(res, 404, `Promo Code By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
