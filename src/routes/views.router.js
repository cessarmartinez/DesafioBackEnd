const {Router} = require('express')

const router = Router()

router.get('/login', (req, res)=>{
  res.render('login', {})
})

router.get('/register', (req, res) => {
  res.render('registerForm', {
      style: 'index.css'
  })
})
















const users = [
    {
      nombre: 'Juan',
      apellido: 'Pérez',
      edad: 25,
      correo: 'juanperez@gmail.com',
      role: 'admin'
    },
    {
      nombre: 'María',
      apellido: 'García',
      edad: 30,
      correo: 'mariagarcia@gmail.com',
      role: 'user'
    },
    {
      nombre: 'Pedro',
      apellido: 'López',
      edad: 20,
      correo: 'pedrolopez@gmail.com',
      role: 'admin'
    },
    {
      nombre: 'Ana',
      apellido: 'Ramírez',
      edad: 35,
      correo: 'anaramirez@gmail.com',
      role: 'user'
    },
    {
      nombre: 'Luis',
      apellido: 'Fernández',
      edad: 40,
      correo: 'luisfernandez@gmail.com',
      role: 'admin'
    }
  ];


const food= [
    {name:'hamborguer', price: 65},
    {name:'pisa', price: 78},
    {name:'fideo', price: 74},
    {name:'milanesa', price: 52},
    {name:'papa', price: 45},
]

router.get('/', (req, res)=>{

    let user = users[Math.floor( Math.random() * users.length )]

    let testUser = {
        title: 'que controlas',
        user,
        food,
        isAdmin: user.role == 'admin',
        style: 'index.css'
    }

    res.render('index', testUser)
})

module.exports = router