const Position = require('../models/Position')

module.exports.getAll =  (req, res) => {
    Position.find()
    .populate("category")
    .exec((err, positions) => {
        if(!positions){
            res.status(404).json({
                message:"Позиции не найдены."
            })
        }
        res.status(200).json(positions)
    })
}

module.exports.getById = async (req, res) => {
    await Position.findById(req.params.id)
    .then((position) => {
        if(!position){
            return res.status(404).json({
                message:"Элемент с данным идентификатором не найден."
            })
        }
        res.send(position)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

module.exports.getByCategoryId = async (req, res) => {
    await Position.find({
        category: req.params.categoryId
    }).then((positions) => {
        if(!positions){
            return res.status(404).json({
                message:"Элемент в данной категории не найден."
            })
        }
        res.status(200).json(positions)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

module.exports.getById = async (req, res) => {
    await Position.findById(req.params.id)
    .then((positions) => {
        if(!positions){
            return res.status(404).json({
                message:"Элемент с данным идентификатором не найден."
            })
        }
        res.status(200).json(positions)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

module.exports.delete = async (req, res) => {
    await Position.findByIdAndDelete(req.params.id)
        .then((position) => {
            if(!position){
                return res.status(404).json({
                    message:"Элемент с данным идентификатором не найден."
                })
            }
            res.status(200).json({
                message: "Элемент был успешно удалён."
            })
        }).catch((err) => {
            res.status(500).send(err)
        })
}


module.exports.update = async (req, res) => {   
    await Position.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true}
    ).then((position) => {
        if(!position){
            return res.status(404).json({
                message:"Элемент с данным идентификатором не найден."
            })
        }
        res.status(200).json(position)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

module.exports.create = async (req, res) => {
    try {
        const position = await new Position({
            name: req.body.name,
            category: req.body.category,
            sizes: req.body.sizes,
            description: req.body.description,
            price: req.body.price,
            imageSrc: req.body.imageSrc,
            inList: req.body.inList
        }).save()
        res.status(201).json(position)
    } catch (error) {
        res.send(error)
    }
}