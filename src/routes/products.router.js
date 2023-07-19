const {Router} = require ('express')
const { ProductManagerFile } = require('../managerDaos/productManager')
const { productModel } = require('../models/product.model')
const passport = require('passport')

const router = Router()

router.get('/', passport.authenticate('jwt', {session: false}),  async (req, res)=>{
    try {
        
        let products = await productModel.find({})
        console.log(products)
        res.send({
            status: 'success',
            payload: products
        })
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req, res)=>{
    try {
        let product = req.body

        const newProduct = {
            title: product.title, 
            description: product.description,
            price: product.price
        } 
        
        let result =  await productModel.create(newProduct) 

        
        res.status(200).send({result})
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router