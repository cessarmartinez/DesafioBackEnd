const fs = require("fs");

class CartManager {
	constructor(path) {
		this.path = path || "./src/cart.json";
		this.cart = [];
	}

	async validateCart(newArray) {
		let validationResult = true;

		if (!Array.isArray(newArray)) {
			throw new Error("It is not an array");
			return (validationResult = false);
		}
		return validationResult;
	}

	async getCarts() {
		try {
			const data = await fs.promises.readFile(this.path, "utf-8");
			this.cart = JSON.parse(data);

			return this.cart;
		} catch (error) {
			throw new Error(`No se pudo obtener todos los carts: ${error.message}`);
		}
	}

	async getCartById(cartId) {
		try {
			const data = await fs.promises.readFile(this.path, "utf-8");
			this.cart = JSON.parse(data);

			if (parseInt(cartId) > this.cart.length || parseInt(cartId) <= 0) {
				throw new Error("No hay un cart con ese id");
			}

			const filteredCart = this.cart.find(
				(cart) => cart.id === parseInt(cartId)
			);

			return filteredCart;
		} catch (error) {
			throw new Error(`No se pudo obtener el cart: ${error.message}`);
		}
	}

	async addCart(newCartArray) {
		try {
			const validationResult = await this.validateCart(newCartArray);
			const CartArray = await this.getCarts();
			console.log(validationResult);

			if (!validationResult) {
				throw new Error(`Error al validar campos`);
			}

			const arrayObject = { id: "", products: newCartArray };
			arrayObject.id = CartArray.length === 0 ? 1 : CartArray.length + 1;

			CartArray.push(arrayObject);

			await fs.promises.writeFile(
				this.path,
				JSON.stringify(CartArray),
				"utf-8"
			);

			return CartArray;
		} catch (error) {
			throw new Error(`No se pudo agregar el cart: ${error.message}`);
		}
	}

	async addProductCart(cartId, productId) {
		try {
			const allCarts = await this.getCarts();

			if (cartId <= 0 || cartId >= allCarts.length) {
				throw new Error(`No existe un cart con ese Id`);
			}
			if (productId <= 0) {
				throw new Error(`No existe un producto con ese Id`);
			}

			const cartById = await this.getCartById(cartId);

			const productsFromCart = cartById.products.find(
				(product) => product.product === parseInt(productId)
			);
			productsFromCart
				? productsFromCart.quantity++
				: cartById.products.push({ product: parseInt(productId), quantity: 1 });

			const cartFound = allCarts.find((cart) => cart.id === cartById.id);

			cartFound
				? (cartFound.products = cartById.products)
				: allCarts.push(cartById);

			await fs.promises.writeFile(this.path, JSON.stringify(allCarts), "utf-8");

			return allCarts;
		} catch (error) {
			throw new Error(`No se pudo agregar el cart: ${error.message}`);
		}
	}
}

module.exports = CartManager;