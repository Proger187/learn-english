const Router = require('express');
const wordRouter = new Router()
const wordController = require('../controllers/WordController');
const checkRole = require('../middleware/checkRole');

wordRouter.post('/', checkRole("ADMIN"), wordController.create)
wordRouter.get('/', wordController.getAll)
wordRouter.get('/:id', wordController.getById)
wordRouter.put("/:id", checkRole("ADMIN"), wordController.update)
wordRouter.delete("/:id", checkRole("ADMIN"), wordController.delete)

module.exports = {wordRouter}
