const router = require('express').Router()
const {
  registerUser,
  loginUser,
  patchUser,
  getAllUser,
  getUserById,
  deleteUser
} = require('../controller/c_users')
const { authorization_ } = require('../middleware/auth')

router.post('/register', registerUser)
router.patch('/patch:id', authorization_, patchUser)
router.post('/login', loginUser)
router.get('/user/', authorization_, getAllUser)
router.get('/user/:id', authorization_, getUserById)
router.delete('/delete/:id', authorization_, deleteUser)

module.exports = router
