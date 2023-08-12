const {Dictionary, DictionaryWord} = require("../models/Models")

module.exports = async function (req, res, next) {
    try {
        const user = req.user;
        const {id} = req.params;
        let data = await Dictionary.findOne({
            where:{id}})
        if(data.userId !== user.id){
            return res.status(403).json({message:"Не тот пользователь"})
        }
        req.dict = data
        next()
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}