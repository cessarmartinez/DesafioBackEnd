const {promises} = require("fs")
const fsP = promises
const fs = require("fs")


const products = []
const path = "./DB.json"

class ProductManager {
    constructor(path) {
        this.products = products
        this.path = path
    }

    //Método para agregar productos
    addProducts(product){
    //valida que todos los campos estén completos
        if(!product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock) return console.log("Every fields are request")
        
        // valida el código del producto, si ya existe lo reporta por consola
        let productPushed = this.products.find(prod => prod.code === product.code)
        if(productPushed) return console.log(`This products was already pushed, here's the code:"${product.code}"`)

        //le asigna un id al producto agregado
        return this.products.push({id: this.products.length+1, ...product})
    }

    // Método que elimina un producto con el ID desde el JSON
    deleteProduct(pid) {
        fsP.readFile(this.path,"utf-8",(err, data)=> {
            if(err){
                console.log(err)
                return
            }
        const product = JSON.parse(data)
        const index = product.findIndex(product => product.id === pid)
        if(index !== -1) {
            product.splice(index, 1)
        } else {
            console.log(`Product with id ${id} not found`)
            return
        }
        fs.writeFile(path, JSON.stringify(product, null, 2),"utf-8" , err => {
            if (err){
                console.log(err)
            } else {
                console.log(`Product with id ${id} succesfully removed`)
            } 
        }) 
        }
    )}

    // Método que crea el archivo "DB.json"
    createJsonFile =  (path)=> {
        fsP.writeFile(path,JSON.stringify([...product.products],null,2),"utf-8", (err)=> {
            if(err) return console.log(err)
        })
    }

    // Traer productos desde el JSON pero con PROMISES.}
    getProducts = async()=> {
        try {
            let data = await fsP.readFile(this.path,"utf-8")
            const parseData = JSON.parse(data)            
            return parseData
        } catch (err) {
            return []
        }
    }
    // Actualizar/modificar productos
    updateProduct(pid, newProduct) {
        fsP.readFile(this.path, "utf-8", (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            const products = JSON.parse(data)
            const index = products.findIndex(product => product.id === pid)
            if (index !== -1) {
                products[index] = { ...newProduct, pid }
            } else {
                console.log(`Product with id ${id} not found`)
                return
            }
            fsP.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8", err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Product with id ${id} successfully modified`)
                }
            })
        })
    }
    
    // Trae producto con ID desde JSON
    async getProductById(pid) {
        const contenido = await fsP.readFile(this.path, "utf-8")
        
        let product = JSON.parse(contenido)
        let productId = product.find(prod => prod.id === pid)
        
        if(!product) return "Product not found" 
        
        return productId
    }
        
}
const product = new ProductManager("./DB.json")
product.createJsonFile("./DB.json")

product.addProducts({
    title: "Tan cerca, Tan cerca",
    description: "Cuentos",
    price: 300,
    thumbnail: "public/images/tanC.png",
    code: "TanC123",
    stock: 4
})
product.addProducts({
    title: "Tan cerca, Tan cerca",
    description: "Cuentos",
    price: 300,
    thumbnail: "public/images/tanC.png",
    code: "SJAKSJA",
    stock: 4
})
product.getProducts().then(response => console.log(response))

module.exports = ProductManager
