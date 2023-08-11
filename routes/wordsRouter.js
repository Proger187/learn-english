const Router = require('express');
const wordRouter = new Router()
const wordController = require('../controllers/WordController');
const checkRole = require('../middleware/checkRole');

wordRouter.post('/', checkRole("ADMIN"), wordController.create)
wordRouter.get('/', wordController.getAll)
wordRouter.get('/:id', wordController.getById)

module.exports = {wordRouter}
