const passport = require('passport')
const jwt = require('passport-jwt')
const objetConfig = require('../config/ObjectConfig')

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req =>{
    let token = null
    if(req && req.cookies){
        token = req.cookies['cookieToken']
    }
    return token
}

const initPassport = () =>{
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: objetConfig.jwt_secret_key
    }, async (jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
        
    }))
}

module.exports = initPassport