const {Word} = require("../models/Models")

class WordController{
    async getAll(req, res){
        let {page, count} = req.params;
        
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
    // async update(req, res){
        
    // }
    // async delete(req, res){
    //     const {id} = req.params;
    //     // удаляем по id 
    //     const word = await Word.findByIdAndDelete(id);
    //     if(word) return res.status(200).json({word});
    //     return res.status(500).json({message:"Непредвиденная ошибка"});
    // }
}

module.exports = new WordController()