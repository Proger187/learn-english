const {Router} = require("express")
const {userRouter} = require("./userRouter")
const {wordRouter} = require("./wordsRouter")
const router = new Router()

router.use("/user", userRouter)
router.use("/word", wordRouter)

module.exports = {router}