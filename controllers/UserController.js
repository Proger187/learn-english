const {User} = require("../models/Models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const generateJTW = (user) => {
    const {id, login, role, name, last_name} = user
    return jwt.sign(
        {id, login, role, name, last_name}, 
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class UserController{
    async registration(req, res){
        try{
            const {login, role, password, name, last_name} = req.body
            if(!login || !password){
                return res.json({message:"Введите логин и пароль", successful: false})
            }
            const condidate = await User.findOne({where:{login}})
            if (condidate) {
                return res.json({message:"Пользователь с таким именем уже существует", successful: false})
            }
            const hashPassword = await bcrypt.hash(password, 5)
            if(!name || !last_name){
                return res.json({message:"Нужно полное имя пользователя", successful: false})
            }
            const user = await User.create({login:login,role:role, password: hashPassword, name:name, last_name:last_name})
            const token = generateJTW(user)
            return res.json({token, successful: true})
        }
        catch(e){
            res.json({message:e.message, successful: false})
        }
    }
    async login(req, res){
        try{
            const {login, password} = req.body
            const user = await User.findOne({where:{login}})
            if (!user) {
                return res.json({message:"Такого пользователя не существует", successful: false})
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.json({message:"Неверный пароль", successful: false})
            }
            const token = generateJTW(user)
            return res.json({token, successful: true})
        }
        catch(e){
            res.json({message:e.message, successful: false})
        }
    }
    async check(req, res, next){
        try{
            const token = generateJTW(req.user)
            return res.json({token, successful: true})
        }
        catch(e){
            res.json({message:e.message, successful: false})
        }
    }
}


module.exports = new UserController()