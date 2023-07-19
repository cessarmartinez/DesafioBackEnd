const {Router} = require ('express')

const router = Router()


router.post('/setcookieuser', (req, res)=> {
    const {username, email} = req.body
    
    res.cookie(username, email, {maxAge: 1000000,signed: true}).send({mensaje: 'seteado'})
})

router.get('/setCookies', (req, res) => {
    res.cookie('CesarCookie', 'Esta es una cookie', {maxAge: 100000000000000}).send('cookie seteada')
})

router.get('/setSignedCookies', (req, res) => {
    res.cookie('SignedCookie', 'Esta es una cookie', {maxAge: 100000000000000, signed: true}).send('cookie seteada')
})
router.get('/getCookies', (req, res) => {
    res.send(req.cookies)
})
router.get('/getSignedCookies', (req, res) => {
    res.send(req.signedCookies)
})
router.get('/deleteCookie', (req, res)=>{
    res.clearCookie('CesarCookie').send('cookie borrada')
})



module.exports = router