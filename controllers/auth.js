const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')

module.exports.login = async function(req, res){
    const candidate = await Admin.findOne({
        login: req.body.login
    })

    if(candidate){
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, process.env.SECRET_KEY, {expiresIn: 3600})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else{
            res.status(401).json({
                message: 'Incorrect password'
            })
        }
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
}
