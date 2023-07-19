const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const passport = require('passport')
require('dotenv').config()

const FileStore = require ('session-file-store')
const {create} = require('connect-mongo')
const initPassport = require('./passport-jwt/passport.config')
//const { initPassport, initPassportGithub } = require('./config/passport.config')




const objetConfig = require('./config/ObjectConfig')
// import express from 'express'
const UserRouter = require ('./routes/newUser.router')
const productRouter = require('./routes/products.router')
const viewRouter = require('./routes/views.router')
const registerRouter = require ('./routes/register.router')
const chatRouter = require('./routes/chat.router')
const cartRouter = require('./routes/cart.router')
const orderRouter = require('./routes/order.router')
const studentsRouter = require('./routes/students.router')
const cookieRouter = require('./routes/cookie.router')
const sessionRouter = require('./routes/session.router')
const pruebaRouter = require('./routes/pruebas.router')
const { uploader } = require('./utils/multer.js')
const {Server} = require('socket.io')

const app = express()

const UsersRouter = new UserRouter()

const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const io = new Server(httpServer)

objetConfig.connectDB()

//---------CONFIGURACIÓN DE HANDLEBARS--------------------
const handlebars = require ('express-handlebars')
const { file } = require('server/reply')
const { addlogger } = require('./config/logger')


app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')
//-------------------------------


app.use(express.json()) // body-parser
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('palabrasecreta'))
app.use(addlogger)

app.use('/static', express.static(__dirname+'/public'))


//Middleware de tercero 1
/*app.use(session({
    secret: 'hola',
    resave: true,
    saveUninitialized: true
}))*/

//Middleware de tercero 2
/*const fileStore = FileStore(session)
app.use(session({
    store: new fileStore({
        ttl: 100000000*60,
        path: './session',
        retries: 0
    }),
    secret: 'hola',
    resave: true,
    saveUninitialized: true
}))*/

//Middleware de tercero 3
/*app.use(session({
    store: create({
        mongoUrl: 'mongodb+srv://cessarmart:390ljtiALsv7UcP8@cluster0.lr2zwx0.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 100,
    }),
    secret: 'hola',
    resave: true,
    saveUninitialized: true
}))*/

initPassport()
//initPassportGithub()
passport.use(passport.initialize())
//passport.use(passport.session())


app.use('/api/usuarios', UsersRouter.getRouter())
app.use('/api/products', productRouter)
app.use('/', viewRouter)
app.use('/register', registerRouter)
app.use('/chat', chatRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/students', studentsRouter)
app.use('/cookies', cookieRouter)
app.use('/session', sessionRouter)
app.use('/pruebas', pruebaRouter)




app.post('/single', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'succes',
        message: 'se subió correctamente'
    })
})

let messages = []
io.on('connection', socket =>{
    
    console.log('nuevo cliente conectado')
    socket.on('message', data => {
        messages.push(data)
        io.emit('messageLogs', messages)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })
})

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todomal')
})






