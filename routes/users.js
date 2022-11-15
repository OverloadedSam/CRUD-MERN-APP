const express = require('express');
const router = express.Router();
const verifyId = require('../middlewares/verifyId');
const protect = require('../middlewares/protect');
const {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
} = require('../controllers/users');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/customer/:id', verifyId('id'), protect, getUserById);
router.put('/updateCustomer/:id', verifyId('id'), protect, updateUserById);

module.exports = router;
