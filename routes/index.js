const {Router} = require("express")
const {userRouter} = require("./userRouter")
const {wordRouter} = require("./wordsRouter")
const {dictRouter} = require("./dictRouter")
const router = new Router()

router.use("/user", userRouter)
router.use("/word", wordRouter)
router.use("/dictionary", dictRouter)

module.exports = {router}