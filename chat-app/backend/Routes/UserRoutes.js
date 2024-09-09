const app = require('express')
const {RegisterUser}=require('../controllers/userControllers')
const {authUser} = require('../controllers/userControllers')
const {AllUsers} = require("../controllers/userControllers")
const protect = require('../middlewares/authMiddlewares')  
const Router = app.Router()

// Router.route('/').post()
Router.route('/').post(RegisterUser).get(protect,AllUsers)
Router.route('/login').post(authUser)
module.exports=Router