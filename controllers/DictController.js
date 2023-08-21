const {Dictionary, DictionaryWord, Word} = require("../models/Models")

class DictController{
    async getById(req, res) {
        try {
            let {id} = req.params
            const data = await Dictionary.findOne({
                where: { id },
                include: [
                    {
                        model: DictionaryWord,
                        as: "words",
                        include: [
                            {
                                model: Word, // Assuming Word is the model name for the associated Word
                                as: "word"   // You can use any alias you prefer
                            }
                        ]
                    }
                ]
            });
                 
            return res.json({data, successful: true})
        } catch (error) {
            res.json({message:e.message, successful: false})
        }
    }
    async getByUserId(req, res){
        try {
            let userId = req.user.id;
            let data = await Dictionary.findAndCountAll({
                where:{userId},
                include:[{model: DictionaryWord, as:"words"}]
            })
            return res.json({data, successful: true}) 
        } catch (error) {
            res.json({message:e.message, successful: false})
        }

    }
    async create(req, res){
        try {
            const {name} = req.body;
            const dict = await Dictionary.create({name, userId: req.user.id})
            return res.json({dict, successful: true})
        } catch (error) {
            return res.json({message: error.message, successful: false})
        }
    }
    async change_name(req, res){
        try {
            const {name} = req.body;
            const dictionary = req.dict;
            await dictionary.set({
                name
            })
            return res.json({dictionary, successful: true})
        } catch (error) {
            return res.json({message: error.message, successful: false})
        }
    }
    async addWord(req, res){
        try{
            const {id} = req.params;
            const {wordId} = req.body;
            const dictionary = req.dict;
            const word = await Word.findByPk(wordId);
            if (!dictionary) {
                return res.json({message:'Словарь не найден.', successful: false});
              }
            if (!word) {
                return res.json({message:'Слово не найдено.', successful: false});
            }
            const condidate =await DictionaryWord.findOne({where:{
                dictionaryId: dictionary.id,
                wordId:wordId
            }})
            if(condidate){
                return res.json({message:"Уже добавлено", successful: false})
            }
            const item = await DictionaryWord.create({ dictionaryId: dictionary.id, wordId: word.id });

            return res.json({item, successful: true})
        }
        catch(error){
            return res.json({message: error.message, successful: false})
        }
    }
    async removeWord(req, res){
        try {
            const {wordId} = req.body
            const word = await DictionaryWord.findOne({where:{id:wordId}})
            // Удаляем связанные DictionaryWord
        
            // Удаляем сам словарь
            await word.destroy();
        
            return res.json({message:"Успешно удалено", deleted_id: word.id, successful: true})
          } catch (error) {
            console.log(error);
            return res.json({message: error.message, successful: false})
          }
    }
    async deleteDict(req, res){
        try {
            const {id} = req.params
            const dictionary = req.dict;
        
            if (!dictionary) {
                return res.json({message:'Словарь не найден.', successful: false});
            }
        
            // Удаляем связанные DictionaryWord
            await DictionaryWord.destroy({ where: { dictionaryId: dictionary.id } });
        
            // Удаляем сам словарь
            await dictionary.destroy();
        
            return res.json({message:"Успешно удалено", deleted_id: dictionary.id, successful: true})
          } catch (error) {
            return res.json({message: error.message, successful: false})
          }
    }
}

module.exports = new DictController()