const {Router} = require("express")
const UserController = require("../controllers/UserController")
const authMiddleware = require("../middleware/authMiddleware")
const userRouter = new Router()

userRouter.post("/registration", UserController.registration)
userRouter.post("/login", UserController.login)
userRouter.get("/auth", authMiddleware,  UserController.check)

module.exports = {userRouter}