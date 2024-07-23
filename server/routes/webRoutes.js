const express= require('express')
const userRoute =express()
userRoute.set('view engine','ejs')
userRoute.set('views','./views')
userRoute.use(express.static('public'))

const userController = require('../controllers/userController')
userRoute.get('/verify-email', userController.verifyEmail)

module.exports  = userRoute;