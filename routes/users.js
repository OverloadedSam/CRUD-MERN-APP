const express = require('express');
const router = express.Router();
const verifyId = require('../middlewares/verifyId');
const protect = require('../middlewares/protect');
const {
  registerUser,
  loginUser,
  getUserById,
} = require('../controllers/users');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/customer/:id', verifyId('id'), protect, getUserById);

module.exports = router;
