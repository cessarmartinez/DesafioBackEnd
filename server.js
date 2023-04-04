const express = require('express')

const app = express()

const ProductManager = require("./ProductManager.js")
const product = new ProductManager("./data.json")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/',(request, response)=>{
    response.send('Hola')
})

app.get("/products", async (req, res)=>{
    try {
        const { limit } = req.query
        const products = await product.getProducts()        
        if(!limit) {
            return res.send({
                status: 'success',
                products
            })            
        }
        return res.send({
            status: 'success',
            products: products.slice(0, limit)
        })   
    }catch (error){
        console.log(error)
    }
})
app.get('/products/:idProduct', async (req, res)=>{
    try {
        const {idProduct}= req.params

        const ProductoEncontrado = await product.getProductsById(parseInt(idProduct))
        if (!ProductoEncontrado) {
            return res.send({status: 'error', error: 'product not found'})
        }
        res.send({ProductoEncontrado})
    }catch (error){
        console.log(error)
    }
})


app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
})
