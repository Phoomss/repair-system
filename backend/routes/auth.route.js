const authController = require('../controllers/auth.controller')
const authRouter = require('express').Router()

// post
authRouter.post('/register', authController.register);

authRouter.post('/login', authController.login)

authRouter.post('/create-admin', authController.createAdmin)
module.exports = authRouter