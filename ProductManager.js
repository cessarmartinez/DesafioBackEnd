let productos = []
class ProductManager {
    constructor (){
        this.product = productos
    }
    addProducts(newProduct){
        if(!newProduct.title || 
            !newProduct.description || 
            !newProduct.price || 
            !newProduct.thumbnail || 
            !newProduct.code || 
            !newProduct.stock) return 'Todos los campos son necesarios'
        
        let products = this.product.find(prod => prod.code == newProduct.code)
        if(products) return 'Un producto con este código ya fue ingresado'
        return this.product.push({id: this.product.length+1,...newProduct})
    }
    getProducts(){
        return this.product
    }
    getProductsById(id){
        let product = this.product.find(prod => prod.id == id)
        if (!product) return 'Not Found'
        return product
    }
}

const product = new ProductManager();

product.addProducts({
    title: 'hProducto',
    description: "descripción",
    price: 1500,
    thumbnail: 'link',
    code: 001,
    stock: 12
})
console.log(product.addProducts({
    title: 'Producto 2',
    description: "descripción",
    price: 1500,
    thumbnail: 'link',
    code: 34,
    stock: 12
}))
console.log(product.getProducts());
console.log(product.getProductsById());