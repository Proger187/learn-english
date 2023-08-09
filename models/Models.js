const mongoose = require("../DB")
const Schema = mongoose.Schema


const userScheme = new Schema({
    login:String,
    password:String,
    role:String,
    full_name: Object
}, {    
    timestamps:true
})

const User =  mongoose.model("Users", userScheme)

module.exports = {
    User
}