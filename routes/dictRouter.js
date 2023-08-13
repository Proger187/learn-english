const Router = require('express');
const dictRouter = new Router()
const dictController = require('../controllers/DictController');
const authMiddleware = require("../middleware/authMiddleware")
const wrongUserMiddleware = require("../middleware/wrongUserMiddleware")

dictRouter.post('/', authMiddleware, dictController.create)
dictRouter.get('/:id', dictController.getById)
dictRouter.get("/", authMiddleware, dictController.getByUserId)
dictRouter.put("/add-word/:id", authMiddleware, wrongUserMiddleware, dictController.addWord)
dictRouter.put("/remove-word/:id", authMiddleware, wrongUserMiddleware, dictController.removeWord)
dictRouter.delete("/:id", authMiddleware, wrongUserMiddleware, dictController.deleteDict)

module.exports = {dictRouter}
