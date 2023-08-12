const {Word, User} = require("../models/Models")

class WordController{
    async getAll(req, res){
        let {page, count} = req.query;
        let data = await Word.findAndCountAll({
            where:{},
            offset: page,
            limit: count
        })
        return res.status(200).json({data})
    }
    async getById(req, res) {
        let {id} = req.params
        let data = await Word.findOne({
            where:{id}})
        return res.status(200).json({data})
    }
    async create(req, res){
        try {
            const {english, russian, kyrgyz} = req.body;
            if(!english || !russian || !kyrgyz){
                return res.status(404).json({message:"Не все значения были введены"})
            }
            const word = await Word.create({english, russian, kyrgyz})
            return res.status(200).json({word})
        } catch (error) {
            return res.status(500).json({message: error.message})
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
            return res.status(200).json({item})
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }
    async delete(req, res){
        let {id} = req.params;
        // удаляем по id 
        const word = await Word.findOne({
            where:{id}})
        await word.destroy();
        if(word) return res.status(200).json({message:"Успешно удалено", item_id:id});
        return res.status(500).json({message:"Непредвиденная ошибка"});
    }
}

module.exports = new WordController()