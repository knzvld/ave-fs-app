const Category = require('../models/Category')
const Position = require('../models/Position')

module.exports.getAll = async (req, res) => {
    await Category.find()
    .then((categories) => {
        if(!categories){
            return res.status(404).json({
                message:"Категории не найдены."
            })
        }
        res.send(categories)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

module.exports.getById = async (req, res) => {
    await Category.findById(req.params.id)
    .then((category) => {
        if(!category){
            return res.status(404).json({
                message:"Категория с данным идентификатором не найдена."
            })
        }
        res.status(200).json(category)
    }).catch((err) => {
        res.status(500).send(err)
    })
}


module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name,
        path: req.body.path,
        published: req.body.published,
        set: req.body.set,       
    }   
    if(req.file){
        updated.imageSrc = req.file.path.replace('\\', '/')
    }
    await Category.findOneAndUpdate(
        {_id: req.params.id},
        {$set: updated},
        {new: true}
    ).then((category) => {
        if(!category){
            return res.status(404).json({
                message:"Категория с данным идентификатором не найдена."                    
            })
        }
        res.status(200).json(category)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

module.exports.delete = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            if(!category){
                return res.status(404).json({
                    message:"Категория с данным идентификатором не найдена."                    
                })
            }
            Position.deleteMany({category: category._id}, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.status(200).json({
                            message: `Категория удалена! Наименование категории - ${category.name}. Количество позиций ${result.deletedCount}.`
                        })
                    } 
                }    
            )
        }).catch((err) => {
            res.status(500).send(err)
        })
}



module.exports.create = async (req, res) => {
    try {
        const category = await new Category({
            name: req.body.name,
            path: req.body.path,    
            imageSrc: req.file ? req.file.path.replace("\\", "/") : '',
            published: req.body.published,
            set: req.body.set
        }).save()
        res.status(201).json(category)
    } catch (error) {
        res.send(error)
    }
}