const {Router} = require ('express')
const passport = require('passport')
const {userModel} = require('../models/user.model')
const {createHash, isValidPassword} = require('../utils/bcryptHash')
const { generateToken } = require('../utils/jwt')
const router = Router()

const {auth} = require('../middlewares/autenticacion.middlewares')
const passportCall = require('../passport-jwt/passpotCall')
const { authorization } = require('../passport-jwt/authJwtRole')



router.post('/login', async (req, res)=>{
    try {

        const {email, password} = req.body

        //const userDB = await userModel.findOne({email})

        //if(!userDB) return res.send({status:'error', message:'No existe ese usuario BOLUUUDOOO'})

        //valdiar password
        /*if (!isValidPassword(password, userDB)) return res.status(401).send({
            status: 'error',
            message: 'El usuario o la contraseña no es la correcta'
        })*/
        
        
        /*req.session.user = {
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            password: userDB.password,
            role: 'admin'
        }*/
        
        const access_token = generateToken({
            first_name: 'Cesar',
            last_name: 'Martinez',
            email: 'cm@gmail.com',
            role:'admin'
        })

        res
        .cookie('cookieToken', access_token, {
            maxAge: 60*60*100
        })
        .send({status: 'login success', 
        message: 'login success', 
        access_token
        //session: req.session.user
        })
    } catch (error) {
        console.log(error)
    }
})
router.post('/register', async (req, res)=>{
    try {
        const {username, first_name, last_name, email, password} = req.body

        //const existUser = await userModel.findOne({username})
        //if(existUser)return res.send({status: 'error', message: 'El Username ya existe'})

        /*const newUser = {
            username,
            first_name,
            last_name, 
            email,
            password: createHash(password)
        }
        let resultUser = await userModel.create(newUser) */  

        const Token = generateToken({
            first_name: 'juajuas',
            last_name: 'LA CONCHA DE LA LORA',
            email: req.email.email,
            role: 'admin'
        })
        res.status(200).send({
            status: 'success',
            message:'Usuario creado corretamente',
            Token
        })
    } catch (error) {
        console.log(error)
    }
})
    

router.get('/current', passportCall('jwt'), authorization('admin'), (req, res)=>{
    res.send(req.user)
})

/*router.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), async (req,res)=>{
    if(!req.user) return res.status(401).send({status: 'error', message: 'Invalid Credencial'})
    req.session.user={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email
    }
    res.send({status: 'success', message: 'User registered'})
})*/
/*router.post('/register', passport.authenticate('register', {failureRedirect: '/failRegister'}), async (req,res) => {
    try {
        res.send({status: 'success', message: 'User registered'})
    } catch (error) {
        console.log(error)
    }
})*/
/*router.get('/failLogin', async(req, res)=>{
    console.log('Fallo la respuesta')
    res.send({status: 'error', error: 'falló de autenticación'})
})

router.get('/failRegister', async(req, res)=>{
    console.log('Faillo las respuesta')
    res.send({status: 'error', error: 'falló de autenticación'})
})*/
/*router.get('/github', passport.authenticate('github', {scope: ['user:email']}), ()=>{})
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/views/login'}), async (req, res)=>{
     req.session.user = req.user
     res.redirect('/api/products')
})*/





router.post('/restaurarpass', async (req, res)=>{
    try {
        const {email, password} = req.body;
        const userDB = await userModel.findOne({ email })
        if(!userDB){
            return res.status(401).send({status: 'error', message: 'El usuario no existe'})
        }  
        
        userDB.password = createHash(password)
        await userDB.save()

        res.status(200).json({status: 'success', message:'contraseña actualizada correctamente'})
        
    } catch (error) {
        console.log(error)
    }

    
})







router.get('/counter', (req, res)=>{
    if(req.session.counter){
        req.session.counter ++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})

router.get('/privada', auth, (req, res)=>{
    res.send('pagina de admins')
})
router.post('/',(req, res)=>{
    const {username, password} = req.body
    if(username!='cesar' || password!="cesar123"){
        return res.send('login failed')
    }
    req.session.user = username
    req.session.admin = true
    console.log(req.session)
    res.send('login success')
})

router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err){
            return res.send({status: 'error', error: err})
        } else {
            res.send('logout ok')
        }
    })
})

module.exports = router