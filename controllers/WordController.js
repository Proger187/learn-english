const {Word, User} = require("../models/Models")

class WordController{
    async getAll(req, res){
        let {page, count} = req.query;
        try {
            let data = await Word.findAndCountAll({
                where:{},
                offset: page,
                limit: count
            })
            return res.json({data, successful: true})
        } catch (error) {
            res.json({message:e.message, successful: false})
        }

    }
    async getById(req, res) {
        try {
            let {id} = req.params
            let data = await Word.findOne({
                where:{id}})
            return res.json({data, successful: true})
        } catch (error) {
            res.json({message:e.message, successful: false})
        }

    }
    async create(req, res){
        try {
            const {english, russian, kyrgyz} = req.body;
            if(!english || !russian || !kyrgyz){
                return res.json({message:"Не все значения были введены"})
            }
            const word = await Word.create({english, russian, kyrgyz})
            return res.json({word, successful: true})
        } catch (error) {
            return res.json({message: error.message, successful: false})
        }
    }
    async update(req, res){
        try{
            let {id} = req.params;
            const {english, russian, kyrgyz} = req.body;
            const item = await Word.findOne({
                where:{id}})
            await item.set({
                english,
                russian,
                kyrgyz
            })
            return res.json({item, successful: true})
        }
        catch(error){
            return res.json({message: error.message, successful: false})
        }
    }
    async delete(req, res){
        let {id} = req.params;
        // удаляем по id 
        const word = await Word.findOne({
            where:{id}})
        await word.destroy();
        if(word) return res.json({message:"Успешно удалено", item_id:id, successful: true});
        return res.json({message:"Непредвиденная ошибка", successful: false});
    }
}

module.exports = new WordController()