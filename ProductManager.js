let products = [];

const fs = require ('fs');

class ProductManager {
    constructor(){
        this.products = products
        this.path = './data.json'
    }

    archivoJson = async () => {
        try {
            const toJson = JSON.stringify(this.products, 'null', 2)
            await fs.promises.writeFile(this.path, toJson, 'utf-8')
        }
        catch (err) { return console.log(err) }
    }

    addProducts = (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if(this.products.length === 0){
            product.id = 1
        } else {
            product.id = this.products[this.products.length - 1].id + 1
        }

        if (Object.values(product).every(value => value)){
            this.products.push(product)
            this.archivoJson()
        } else {
            return console.log('Todos los campos son obligatorios')
        }
    }

    getProducts = async () => {
        try {
            const readFile = await fs.promises.readFile(this.path, 'utf-8');
            return console.log(readFile)
        }
        catch (err) { return console.log(err) }
    }

    getProductsById = async (id) => {
        try {
            const readFile = await fs.promises.readFile(this.path, 'utf-8')
            const obj = JSON.parse(readFile)
            const find = obj.find(product => product.id === id)
            return find ? find : console.log('No products found')
        }
        catch (err) { return console.log(err) }
    }

    updateProduct = async (id, obj) => {
        try {
            const readFile = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(readFile)

            const returnObj = Object.assign(products[id-1], obj)
            console.log(products[id-1])
            this.products = products
            this.archivoJson()
        }
        catch (err) { return console.log(err) }
    }

    deleteProduct = async (id) => {
        try { 
            const readFile = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(readFile)
            console.log(products.splice(id-1, 1), 'Producto eliminado')
            this.products = products
            this.archivoJson()
        }
        catch (err) { return console.log(err) }
    }
}


const product = new ProductManager()

product.addProducts(
    'Producto',
    'Descripcion',
    1500,
    'thumbnail',
    001,
    6
);
product.addProducts(
    'Producto',
    'Descripcion',
    1500,
    'thumbnail',
    002,
    6
);



console.log(product.getProducts());

//console.log(product.getProductsById(1))

//product.deleteProduct();
