const fs = require("fs");

class CartDaoFile {
    constructor(path) {
        this.carts = [];
        this.path = path;
    }

    getCarts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8"); 
            this.carts = JSON.parse(data); 
            return this.carts;
        } catch (error) {
            return [];
        }
    };

    getCartById = async (id) => {
        try {
            await this.getCarts(); 
            const codeValue = this.carts.findIndex((prod) => prod.id === id); 
            if (codeValue >= 0) {
                return this.carts[codeValue].products;
            }
        } catch (error) {
            console.log(error);
        }
    };
    createCart = async (cart) => {
        try {
            await this.getCarts(); 
            this.carts.push(cart); 
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, "utf-8", "\t"));
            console.log(cart); 
            return `Se ah agregado el Carrito id ${cart.id}`;
        } catch (error) {
            return error;
        }
    };

    addProduct = async (id, idProd) => {
        try {
            await this.getCarts();
            let cart = this.carts.find((cart) => cart.id === id); 
            console.log("carrito filtrado: ", cart);
            const productRepeated = cart.products.findIndex((prod) => prod.product === idProd);
            console.log("Producto Repetido", productRepeated);
            if (productRepeated >= 0) {
                cart.products[productRepeated].quantity += 1;
            } else {
                cart.products.push({ product: idProd, quantity: 1 });
            }
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, "utf-8", "\t")); 
            return "Producto Actualizado";
        } catch (error) {
            return error;
        }
    };

    deleteProducts = () => {};

    deleteProduct = () => {};

    updateProducts = () => {};

    updateProduct = () => {};

    generateTicket = () => {};
}

module.exports = CartDaoFile;
