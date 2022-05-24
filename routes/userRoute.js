const express = require('express');
const { getLogin, getRegister, postRegister, postLogin, logout } = require('../controllers/userController');
const { checkLogin } = require('../middleware/checkAuth');
const upload = require('../controllers/avatarUpload')
const router = express.Router();

router.route('/').get(checkLogin,getLogin).post(postLogin);
router.route('/register').get(checkLogin,getRegister).post(upload.single('avatar'),postRegister)
router.route('/logout').get(logout)


module.exports = router
