const multer = require('multer')
const helper = require('../helper/response')

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './uploads/product/')
  },
  filename: (request, file, callback) => {
    callback(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    )
  }
})
const fileFilter = (request, file, callback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true)
  } else {
    return callback(new Error('Only images files are allowed'), false)
  }
}
const limits = { fileSize: 1024 * 1024 }
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
}).single('product_image')

const uploadFilter = (request, response, next) => {
  upload(request, response, function (error) {
    if (error instanceof multer.MulterError) {
      return helper.response(response, 400, error.message)
    } else if (error) {
      return helper.response(response, 400, error.message)
    }
    next()
  })
}

module.exports = uploadFilter
