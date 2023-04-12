const {Router} = require("express")
const ProductManager = require("../ProductManager")

const product = new ProductManager("DB.json")
const router = Router()

router.get("/", async (req, res)=>{
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
})

router.get("/:pid", async (req, res)=>{
    const {pid}= req.params
    const productDb = await product.getProductById(parseInt(pid))
    if (!productDb) {
        return res.send({status: 'error', error: 'product not found'})
    }
    res.send({productDb})
})

router.post("/", async (req, res)=>{
    const user = req.body
    console.log(user)
    const pushDB = await product.addProduct(user)
    if(!pushDB) {
        return res.status(400).send({status: "error", message: "Every fields are request"})
    }
    res.status(200).send({status: "OK", message: "Product added succesfully"})
})

router.put("/:pid", async (req, res)=>{
    const {pid} = req.params
    const newProduct = req.body
    const productUpdate = await product.updateProduct(parseInt(pid), newProduct)
    
    if(productUpdate) return res.status(400).send("Product not found")
    res.status(200).send("Producto actualizado")
})

router.delete("/:pid", async (req, res)=>{
    const {pid} = req.params
    const productDelete = await product.deleteProduct(parseInt(pid))

    if(productDelete !== undefined) {
    res.status(200).send("Product succesfully deleted")
    }else {
    res.status(400).send("Product not found") 
    }
}) 

module.exports = router