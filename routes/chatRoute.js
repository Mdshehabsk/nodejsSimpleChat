const express = require("express");
const { getChat, postMessage, getSignleChat } = require("../controllers/chatController");
const {checkAuth} = require("../middleware/checkAuth");
const router = express.Router()

router.route('/chat').get(checkAuth,getChat)
router.route('/chat/:id').get(checkAuth,getSignleChat)
router.route('/message').post(checkAuth,postMessage)


module.exports = router;