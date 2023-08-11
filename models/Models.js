const sequelize = require("../DB")
const {DataTypes} = require('sequelize');


const User = sequelize.define('user', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    login:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING, defaultValue:"USER"},
    name:{type:DataTypes.STRING},
    lastname:{type:DataTypes.STRING}
})

const Word = new Schema({
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    english: {type:DataTypes.STRING},
    russian: {type:DataTypes.STRING},
    kyrgyz: {type:DataTypes.STRING}
})

module.exports = {
    User,
    Word
}