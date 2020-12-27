const {
  getHistoryModel,
  postHistoryModel,
  postDetailhistoryModel,
  deleteHistoryModel
} = require('../model/m_history')
const helper = require('../helper/response')

module.exports = {
  getHistory: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getHistoryModel(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get History By Id', result)
      } else {
        return helper.response(res, 404, `History By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postHistory: async (req, res) => {
    try {
      const {
        history_id,
        history_invoices,
        history_payment_method,
        history_subtotal,
        // user_id,
        status
      } = req.body
      if (
        history_invoices == null ||
        history_payment_method == null ||
        history_subtotal == null ||
        // user_id == null ||
        status == null
      ) {
        console.log('All data must be filled in')
      } else {
        const setData = {
          history_id,
          history_invoices,
          history_payment_method,
          history_subtotal,
          //   user_id,
          history_created_at: new Date(),
          status
        }
        const result = await postHistoryModel(setData)
        return helper.response(res, 200, 'Success Post History', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postDetailhistory: async (req, res) => {
    try {
      console.log(req.body)
      const [
        { product_id, history_detail_qty, history_detail_total, history_id }
      ] = req.body
      const setData = {
        product_id,
        history_detail_qty,
        history_detail_total,
        history_id
        // history_created_at: new Date()
      }
      const result = await postDetailhistoryModel(setData)
      return helper.response(res, 200, 'Success Post Detail History', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteHistory: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deleteHistoryModel(id)
      if (result.length == null) {
        return helper.response(
          res,
          200,
          `Success Delete History By Id : History ${id} deleted`
        )
      } else {
        return helper.response(res, 404, `History By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
