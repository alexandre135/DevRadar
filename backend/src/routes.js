const { Router } = require('express')
const controller = require('./controllers/user')
const controllerSearch = require('./controllers/search')

const routes = Router()

routes.get('/users', controller.getAll)
routes.post('/users', controller.saveUser)

routes.get('/search', controllerSearch.search)


module.exports = routes