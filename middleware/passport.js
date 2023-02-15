const passport = require('passport')
const mongoose = require('mongoose')
const Admin = mongoose.model('admin')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}


module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await Admin.findById(payload.userId).select('login id')
                if(user){
                    done(null, user)
                } else {
                    done(null, false)
                }     
            } catch (error) {
                console.log(error)
            }
        })
    )
}