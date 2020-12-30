const router = require('express').Router()
const uploadImage = require('../middleware/multer')
const { authorization, isAdmin } = require('../middleware/auth')
const {
  getProductRedis,
  getProductByIdRedis,
  clearDataProductRedis
} = require('../middleware/redis')
const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct
} = require('../controller/c_product')

router.get('/', authorization, getProductRedis, getProduct)
router.get('/:id', authorization, getProductByIdRedis, getProductById)
router.post(
  '/',
  authorization,
  isAdmin,
  clearDataProductRedis,
  uploadImage,
  postProduct
)
router.patch(
  '/:id',
  authorization,
  isAdmin,
  clearDataProductRedis,
  uploadImage,
  patchProduct
)
router.delete(
  '/:id',
  authorization,
  isAdmin,
  clearDataProductRedis,
  deleteProduct
)

module.exports = router
