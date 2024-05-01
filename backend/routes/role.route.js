const roleController = require('../controllers/role.controller')
const roleRouter = require('express').Router()

// post 
roleRouter.post('/create', roleController.createRole)

module.exports = roleRouter