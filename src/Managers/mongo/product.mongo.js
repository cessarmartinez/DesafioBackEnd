const { productModel } = require("../mongo/model/product.model");

class ProductManagerMongo {
	constructor() {
		this.productModel = productModel;
	}
	async getProducts() {
		try {
			return await productModel.find({});
		} catch (error) {
			throw new Error(" ProductManagerMongo.getProducts " + error.message);
		}
	}
	async getProductsById(pid) {
		try {
			return await productModel.findOne({ _id: pid });
		} catch (error) {
			throw new Error(" ProductManagerMongo.getProductsById " + error.message);
		}
	}
	async AddProduct(newProduct) {
		try {
			return await productModel.create(newProduct);
		} catch (error) {
			throw new Error(" ProductManagerMongo.AddProduct " + error.message);
		}
	}
	async updateProduct(pid) {
		try {
		} catch (error) {
			throw new Error(" ProductManagerMongo.updateProduct " + error.message);
		}
	}
	async deleteProduct(pid) {
		try {
		} catch (error) {
			throw new Error(" ProductManagerMongo.deleteProduct " + error.message);
		}
	}
}

module.exports = ProductManagerMongo;
