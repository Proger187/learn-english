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

const Word = sequelize.define('word', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    english: {type:DataTypes.STRING},
    russian: {type:DataTypes.STRING},
    kyrgyz: {type:DataTypes.STRING}
})

const Dictionary = sequelize.define("dictionary", {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type:DataTypes.STRING, defaultValue:"Избранное"}
})

const DictionaryWord = sequelize.define("dictionary-word", {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

User.hasMany(Dictionary)
Dictionary.belongsTo(User)

Dictionary.hasMany(DictionaryWord, {as:"words"})
DictionaryWord.belongsTo(Dictionary)

Word.hasMany(DictionaryWord)
DictionaryWord.belongsTo(Word)

module.exports = {Word, User, Dictionary, DictionaryWord}
