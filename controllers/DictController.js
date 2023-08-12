const {Dictionary, DictionaryWord, Word} = require("../models/Models")

class DictController{
    async getById(req, res) {
        let {id} = req.params
        let data = await Dictionary.findOne({
            where:{id},
            include:[{model: DictionaryWord, as:"words"}]
        })
        return res.status(200).json({data})
    }
    async create(req, res){
        try {
            const {name} = req.body;
            const dict = await Dictionary.create({name, userId: req.user.id})
            return res.status(200).json({dict})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    async change_name(req, res){
        try {
            const {name} = req.body;
            const dictionary = req.dict;
            await dictionary.set({
                name
            })
            return res.status(200).json({dictionary})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    async addWord(req, res){
        try{
            const {id} = req.params;
            const {wordId} = req.body;
            const dictionary = req.dict;
            const word = await Word.findByPk(wordId);
            if (!dictionary) {
                return res.status(404).json({message:'Словарь не найден.'});
              }
            if (!word) {
                return res.status(404).json({message:'Слово не найдено.'});
            }
            const item = await DictionaryWord.create({ dictionaryId: dictionary.id, wordId: word.id });

            return res.status(200).json({item})
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }
    async removeWord(req, res){
        try {
            const {id} = req.params;
            
            const word = await DictionaryWord.findOne({where:{id}})
            // Удаляем связанные DictionaryWord
        
            // Удаляем сам словарь
            await word.destroy();
        
            return res.status(200).json({message:"Успешно удалено", deleted_id: word.id})
          } catch (error) {
            return res.status(500).json({message: error.message})
          }
    }
    async deleteDict(req, res){
        try {
            const {id} = req.params
            const dictionary = req.dict;
        
            if (!dictionary) {
                return res.status(404).json({message:'Словарь не найден.'});
            }
        
            // Удаляем связанные DictionaryWord
            await DictionaryWord.destroy({ where: { dictionaryId: dictionary.id } });
        
            // Удаляем сам словарь
            await dictionary.destroy();
        
            return res.status(200).json({message:"Успешно удалено", deleted_id: dictionary.id})
          } catch (error) {
            return res.status(500).json({message: error.message})
          }
    }
}

module.exports = new DictController()