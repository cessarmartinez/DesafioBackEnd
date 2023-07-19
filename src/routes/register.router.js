const {Router} = require ('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('registerForm', {
        style: 'index.css'
    })
})

module.exports = router