const Router = require('express');
const router = new Router()
const wordController = require('../controllers/WordController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole("ADMIN"), wordController.create)
router.get('/', wordController.getAll)
router.get('/:id', wordController.getById)

module.exports = {wordRouter}