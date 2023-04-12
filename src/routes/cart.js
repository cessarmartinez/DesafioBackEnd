const {Router} = require("express")
const CartManager = require ("../CartManager")


const cart = new CartManager("cart.json")
const router = Router()

router.post("/api/carts", async (req, res)=> {
    cart.createCart()
    return res.status(200).send({status: "success", message: "Carrito creado"})
})

router.get("/api/carts/:cid", async (req, res)=>{
    const {cid} = req.params
    const cartProduct = await cart.getProducts(cid)
    return res.status(200).send(cartProduct)
})

router.post("/:cid/productos/:pid", async (req, res)=> {
    const {cid} = req.params
    const {pid} = req.params
    const product = req.body
    return res.status(200).send({status: "success", message: "params", cid, pid, product})
})

module.exports = router 