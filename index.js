require("dotenv").config()
const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.PORT
const url = process.env.URL
const mongoose = require("./DB")
const {router} = require("./routes/index")

app.use(cors())
app.use(express.json())
app.use("/api", router)

async function start(){
    try {
        await mongoose.connect(url)
        app.listen(port, () => console.log(`Started`))
    } catch (error) {
        console.log(error);
    }
    }
start()