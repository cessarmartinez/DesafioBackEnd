const {promises} = require("fs")
const fsP = promises
const fs = require("fs")


const products = []
const path = "DB.json"

class ProductManager {

constructor(path) {
    this.products = products
    this.path = path
}

async addProduct(product) {
    try {
    const productsFile = await fsP.readFile(this.path, "utf-8")
    let products = JSON.parse(productsFile)

    if(!product.title ||
    !product.description ||
    !product.price ||
    !product.thumbnail ||
    !product.code ||
    !product.status ||
    !product.stock) return console.log("Every fields are request")


    products.push({id: products.length+1, ...product})
    return fsP.writeFile(this.path, JSON.stringify(products, null, 2))
    } catch (err) {
        console.log(err)
    }
}

async deleteProduct(pid) {
    try {
    const data = await fsP.readFile(this.path,"utf-8")
    const products = JSON.parse(data)
    const index = products.findIndex(product => product.id === pid)
    if(index !== -1) {
        products.splice(index, 1)
    } else {
        console.log(`Product with id ${pid} not found`)
        return
    }
    return fsP.writeFile(this.path, JSON.stringify(products, null, 2),"utf-8")
    } catch(err) {
        console.log(err)
    }
}

getProducts = async(limit)=> {
    try {
    let data = await fsP.readFile(this.path,"utf-8")
    const parseData = JSON.parse(data)            
    return parseData
    } catch (err) {
        return []
    }
}

async updateProduct (pid, newProduct) {
    try {
    const data = await fsP.readFile(this.path, "utf-8")
    const products = JSON.parse(data)
    const index = products.findIndex(product => product.id === pid)
    if (index !== -1) {
        newProduct.id = pid
        products[index] = newProduct
    } else {
        console.log(`Product with id ${pid} not found`)
    }
    return fsP.writeFile(this.path, JSON.stringify(products, null, 2))
    } catch (error){
        console.log(error)
    }
}


async getProductById(pid) {
    try {
    const contenido = await fsP.readFile(this.path, "utf-8")

    let product = JSON.parse(contenido)
    let productId = product.find(prod => prod.id === pid)
    
    if(!product) return "Product not found" 
    
    return productId
    } catch(err) {
    console.log(err)
    }
}

}

module.exports = ProductManager;


