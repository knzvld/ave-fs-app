const Position = require('../models/Position')

module.exports.getAll = async (req, res) => {
    await Position.find()
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
    const body = req.body
    if(req.body.sizes){
        body.sizes = JSON.parse(JSON.stringify(req.body.sizes))
    }  
    await Position.findOneAndUpdate(
        {_id: req.params.id},
        {$set: body},
        {new: true}
    ).then((position) => {
        if(!position){
            return res.status(404).json({
                message:"Элемент с данным идентификатором не найден."
            })
        }
        console.log(req.body.key)
        res.status(200).json(position)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

module.exports.create = async (req, res) => {
    try {
        const imgsArr = []
        for(var i = 0; i < req.files.length; i++){
            imgsArr.push(req.files[i].path.replace('\\', '/'))
        }
        const position = await new Position({
            name: req.body.name,
            category: req.body.category,
            sizes: JSON.parse(req.body.sizes),
            description: req.body.description,
            price: req.body.price,
            imageSrc: imgsArr,
            inList: req.body.inList
        }).save()
        console.log(JSON.parse(req.body.sizes))
        res.status(201).json(position)
    } catch (error) {
        console.log(JSON.parse(req.body.sizes))
        res.send(error)
    }
}