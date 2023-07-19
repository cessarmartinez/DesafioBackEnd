const {Router} = require ('express')

const router = Router()
const nombres = ['fede','juan']
//practicar de nuevo
router.param('nombre', (req,res, next, nombre)=>{
    if(!nombres.includes(nombre)){
        req.nombre = null
    }else{
        req.nombre = nombre
    }
    next()
})

router.get('/logger', (req, res)=>{
    //req.logger.error('alerta')
    //res.send({message: 'prueba de logger'})
    req.logger.debug("Logger debug");
    req.logger.http("Logger http");
    req.logger.info("Logger info");
    req.logger.warn("Logger warning");
    req.logger.error("Logger error");
    req.logger.fatal("Logger fatal");
    res.send({ message: "Prueba de logger" });
})

router.get('/params/:nombre([a-zA-Z%C3%A1%C3%81%C3%A9%C3%89%C3%AD%C3%8D%C3%B3%C3%93%C3%BA%C3%9A]+)', (req,res)=>{
    res.send({
        message: req.params.nombre
    })
})

router.put('/params/:nombre([a-zA-Z%C3%A1%C3%81%C3%A9%C3%89%C3%AD%C3%8D%C3%B3%C3%93%C3%BA%C3%9A]+)', (req,res)=>{
    res.send({
        message: req.params.nombre
    })
})

router.delete('/params/:nombre([a-zA-Z%C3%A1%C3%81%C3%A9%C3%89%C3%AD%C3%8D%C3%B3%C3%93%C3%BA%C3%9A]+)', (req,res)=>{
    res.send({
        message: req.params.nombre
    })
})


router.get('*', async(req,res)=>{
    res.status(404).send('404 Not Found')
})
module.exports = router
