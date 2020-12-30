const router = require('express').Router()
const {
  registerUser,
  loginUser,
  patchUser,
  getAllUser,
  getUserById,
  deleteUser
} = require('../controller/c_users')
const { isAdmin } = require('../middleware/auth')

router.post('/register', registerUser)
router.patch('/patch:id', isAdmin, patchUser)
router.post('/login', loginUser)
router.get('/user/', isAdmin, getAllUser)
router.get('/user/:id', isAdmin, getUserById)
router.delete('/delete/:id', isAdmin, deleteUser)

module.exports = router
