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

    addProduct(product){
        if(!product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock) return console.log("Every fields are request")
        
        let productPushed = this.products.find(prod => prod.code === product.code)
        if(productPushed) return console.log(`This products was already pushed, here's the code:"${product.code}"`)

        return this.products.push({id: this.products.length+1, ...product})
    }

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

    createJsonFile =  (path)=> {
        fsP.writeFile(path,JSON.stringify([...product.products],null,2),"utf-8", (err)=> {
            if(err) return console.log(err)
        })
    }

    getProducts = async()=> {
        try {
            let data = await fsP.readFile(this.path,"utf-8")
            const parseData = JSON.parse(data)            
            return parseData
        } catch (err) {
            return []
        }
    }

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


module.exports = ProductManager;


