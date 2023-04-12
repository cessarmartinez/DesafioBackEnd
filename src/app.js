const express = require ("express")
const productRouter = require("./routes/products")
const cartRouter = require("./routes/cart")

const port = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", productRouter)
app.use('/api/productos', productRouter)
app.use("/", cartRouter)

app.listen(port, ()=>{
    console.log(`Listen on port ... ${port}`)
})