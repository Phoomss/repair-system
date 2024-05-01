const roleController = require('../controllers/role.controller')
const roleRouter = require('express').Router()

// post 
roleRouter.post('/create', roleController.createRole)

// get 
roleRouter.get('/get-all', roleController.getAllRoles)

module.exports = roleRouter