const fs = require("fs");

class ProductDaoFile {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8"); 
            this.products = JSON.parse(data); 
            return this.products;
        } catch (error) {
            return [];
        }
    };

    getProductById = async (id) => {
        try {
            await this.getProducts();
            const codeValue = this.products.findIndex((prod) => prod.id === id); 
            if (codeValue >= 0) {
                return this.products[codeValue];
            }
        } catch (error) {
            console.log(error);
        }
    };

    addProduct = async (product) => {
        try {
            await this.getProducts();
            let codProd = this.products.find((prod) => prod.code === product.code);
            let prodId = 0;
            if (this.products.length === 0) {
                prodId = 1;
            } else {
                prodId = this.products[this.products.length - 1].id + 1;
            }
            if (
                !product.name || 
                !product.description ||
                !product.price ||
                !product.stock ||
                !product.code ||
                !product.category
            )
                return { status: "error", message: "Todos los campos son requeridos!" };

            if (product.image === undefined) {
                product.image = [];
            }
            if (product.status === undefined) {
                product.status = true;
            }
            if (codProd) return { status: "error", message: "Code repetido!" };
            this.products.push({ id: prodId, ...product });
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, "utf-8", "\t"));
            console.log(product);
            return `Se ah agregado el producto ${product.name}`;
        } catch (error) {
            return error;
        }
    };

    updateProduct = async (id, prod) => {
        try {
            await this.getProducts();
            let producto = this.products.find((prod) => prod.id === id);
            producto.name = prod.name ? prod.name : producto.name; 
            producto.description = prod.description ? prod.description : producto.description;
            producto.price = prod.price ? prod.price : producto.price;
            producto.image = prod.image ? prod.image : producto.image;
            producto.stock = prod.stock ? prod.stock : producto.stock;
            producto.code = prod.code ? prod.code : producto.code;
            producto.category = prod.category ? prod.category : producto.category;
            producto.status = prod.status === undefined ? producto.status : prod.status;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, "utf-8", "\t")); 
            console.log(producto);
            return "Producto Actualizado";
        } catch (error) {
            return error;
        }
    };

    deleteProduct = async (idDelete) => {
        try {
            await this.getProducts();
            const remove = this.products.filter((prod) => prod.id !== idDelete);
            if (!remove) return "Id no encontrado";
            await fs.promises.writeFile(this.path, JSON.stringify(remove, "utf-8", "\t")); 
            await this.getProducts(); 
            return `Producto id ${idDelete} Eliminado`; 
        } catch (error) {
            return error;
        }
    };
}

module.exports = ProductDaoFile;
