const express = require("express")
const protect = require('../middlewares/authMiddlewares')
const router = express.Router()
const {sendMessage} = require("../controllers/MessageControllers")
const {AllMessages} = require("../controllers/MessageControllers")
router.route("/").post(protect,sendMessage)
router.route("/:chatId").get(protect,AllMessages)

module.exports = router