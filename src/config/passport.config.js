const passport = require('passport')
const GithubStrategy = require('passport-github2')
const local = require('passport-local')
const { userModel } = require('../models/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptHash')


const LocalStrategy = local.Strategy

const initPassport = ()=>{
    //config registro
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
    }, async (req, username, password, done)=>{
        const {first_name, last_name} = req.body
        try {
            let userDB = await userModel.findOne({email: username})
            if(userDB) return done(null, false)

            let newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }

            let result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) {
            return done('error al obtener el usuario'+error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async (id,done)=>{
        try {
            let user = await userModel.findOne({_id:id})
            done(null,user)
        } catch (error) {
            return done(error)
        }
    })


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done)=>{
        try {
            const userDB = await userModel.findOne({email: username})
            if(!userDB) return done (null, false)

            if(!isValidPassword(password, userDB)) return done(null, false)
            return done(null, userDB)
        } catch (error) {
            return done(error)            
        }
    }))
}

const initPassportGithub = ()=>{
    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('Profile', profile)
        try {
            let user = await userModel.findOne({email: profile._json.email})
            // if(user)
            if(!user){
                let newUser = {
                    firts_name: profile.username,
                    last_name: profile.username,
                    email: 'fede@gmail.com',
                    password: ''
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            }
            return done(null, user)
        } catch (error) {
            console.log(error)
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userModel.findOne({_id:id})
        done(null, user)
    })

}

module.exports = {
    initPassport,
    initPassportGithub
}