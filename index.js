require("dotenv").config()
const express = require('express')
const app = express()
const cors = require("cors")
const {router} = require("./routes/index")
const port = process.env.PORT
const sequelize = require("./DB")
// const {router} = require("./routes/index")

app.use(cors())
app.use(express.json())
app.use("/api", router)
// app.use("/api", router)

async function start(){
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log(`Started`))
    } catch (error) {
        console.log(error);
    }
    }
start()