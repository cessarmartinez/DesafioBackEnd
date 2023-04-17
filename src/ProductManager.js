const fs = require("fs");

class ProductManager {
	constructor(path) {
		this.products = [];
		this.path = path || "DB.json";
	}

	async getProducts() {
		try {
			const data = await fs.promises.readFile(this.path, "utf-8");
			this.products = JSON.parse(data);
			return this.products;
		} catch (error) {
			throw new Error(`No se pudo obtener los productos: ${error.message}`);
		}
	}

	async validateProduct(newProduct) {
		const productKeys = [
			"title",
			"description",
			"code",
			"price",
			"status",
			"stock",
			"category",
			"thumbnails",
		];

		let validationResult = true;
		const data = await fs.promises.readFile(this.path, "utf-8");
		this.products = JSON.parse(data);

		Object.keys(newProduct).forEach((key) => {
			if (key !== "thumbnails") {
				if (
					newProduct[key] === "" ||
					newProduct[key] === 0 ||
					newProduct[key].length === 0
				) {
					console.error("Error, por favor agregue un producto completo");
					return (validationResult = false);
				}
			}
		});


		if (this.products.some((product) => product.code === newProduct.code)) {
			console.error("El código ya existe");
			return (validationResult = false);
		}


		for (let key in newProduct) {
			if (!productKeys.includes(key)) {
				console.error(`El dato ${key} es requerido`);

				return (validationResult = false);
			}
		}
		return validationResult;
	}

	async validateProductId(productId) {
		let validationResult = true;
		const data = await fs.promises.readFile(this.path, "utf-8");
		this.products = JSON.parse(data);
		if (
			parseInt(productId) === 0 ||
			parseInt(productId) > this.products.length
		) {
			console.error("Producto no encontrado");
			return (validationResult = false);
		}
		return validationResult;
	}

	async addProduct(product) {
		try {
			const newProduct = { ...product };
			const validationResult = await this.validateProduct(newProduct);
			const productsArray = await this.getProducts();

			if (validationResult) {
				newProduct.id =
					productsArray.length === 0 ? 1 : this.products.length + 1;

				productsArray.push(newProduct);

				await fs.promises.writeFile(
					this.path,
					JSON.stringify(productsArray),
					"utf-8"
				);
				return newProduct;
			}
		} catch (error) {
			throw new Error(`No se pudo agregar el producto: ${error.message}`);
		}
	}

	async getProductById(productId) {
		try {
			const validationResult = this.validateProductId(productId);
			if (validationResult) {
				const data = await fs.promises.readFile(this.path, "utf-8");
				this.products = JSON.parse(data);

				const filteredProduct = this.products.find(
					(product) => product.id === productId
				);

				return filteredProduct;
			}
		} catch (error) {
			throw new Error(
				`No se pudo obtener el producto por ID: ${error.message}`
			);
		}
	}

	async updateProduct(productId, updatableProduct) {
		try {
			const validationResult = await this.validateProductId(productId);
			if (validationResult) {
				const data = await fs.promises.readFile(this.path, "utf-8");
				this.products = JSON.parse(data);

				const product = this.products.find((p) => p.id === parseInt(productId));
				const newProduct = { ...product, ...updatableProduct };
				const updatedArray = this.products.map((product) =>
					product.id === newProduct.id ? (product = newProduct) : product
				);

				await fs.promises.writeFile(
					this.path,
					JSON.stringify(updatedArray),
					"utf-8"
				);
				return updatedArray;
			}
		} catch (error) {
			throw new Error(
				`No se pudo actualizar el producto por ID: ${error.message}`
			);
		}
	}

	async deleteProduct(productId) {
		try {
			const validationResult = await this.validateProductId(
				parseInt(productId)
			);
			if (validationResult) {
				const data = await fs.promises.readFile(this.path, "utf-8");
				this.products = JSON.parse(data);

				const newArray = this.products.filter(
					(product) => product.id !== parseInt(productId)
				);
				await fs.promises.writeFile(
					this.path,
					JSON.stringify(newArray),
					"utf-8"
				);
				return newArray;
			}
		} catch (error) {
			throw new Error(
				`No se pudo eliminar el producto por ID: ${error.message}`
			);
		}
	}
}
module.exports = ProductManager;