const { Router } = require('express')
const {cartModel} = require('../models/cart.model')

// obj
const router = Router()

router.get('/',  async (req, res)=>{
    try {
        // crear un carrito 
        //    await cartModel.create({
        //    products: []
        //  })

        //agregar productos
        //const cart = await cartModel.findById({_id: '648e200e7d6e8b99a3f889b7'})
        //cart.products.push({product: '648e27b3adcdc24922434701'})
        //let resp = await cartModel.findByIdAndUpdate({_id:'648e200e7d6e8b99a3f889b7'}, cart)
        const cart = await cartModel.findOne({_id: '648e200e7d6e8b99a3f889b7'})
        console.log(JSON.stringify(cart,null,2))
    } catch (error) {
        console.log(error)
    }
})

module.exports = router