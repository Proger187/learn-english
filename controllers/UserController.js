const {User} = require("../models/Models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const generateJTW = (user) => {
    const {id, login, role} = user
    const {name, last_name} = user.full_name
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
                return res.status(404).json({message:"Введите логин и пароль"})
            }
            const condidate = await User.findOne({where:{login}})
            if (condidate) {
                return res.status(404).json({message:"Пользователь с таким именем уже существует"})
            }
            const hashPassword = await bcrypt.hash(password, 5)
            if(!full_name || !full_name.name || !full_name.last_name){
                return res.status(404).json({message:"Нужно полное имя пользователя"})
            }
            const user = await User.create({login:login,role:userRole, password: hashPassword, full_name: full_name})
            const token = generateJTW(user)
            return res.status(200).json({token})
        }
        catch(e){
            res.status(500).json({message:e.message})
        }
    }
    async login(req, res){
        try{
            const {login, password} = req.body
            const user = await User.findOne({where:{login}})
            if (!user) {
                return res.status(404).json({message:"Такого пользователя не существует"})
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.status(404).json({message:"Неверный пароль"})
            }
            const token = generateJTW(user)
            return res.status(200).json({token})
        }
        catch(e){
            res.status(500).json({message:e.message})
        }
    }
    async check(req, res, next){
        try{
            const token = generateJTW(req.user)
            return res.status(200).json({token})
        }
        catch(e){
            res.status(500).json({message:e.message})
        }
    }
}


module.exports = new UserController()