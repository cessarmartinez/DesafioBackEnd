const { Router } = require("express");
const ProductManagerMongo = require("../Managers/mongo/product.mongo.js");

const router = Router();
const productManager = new ProductManagerMongo();

// GET
// productos
router.get("/", async (req, res) => {
	try {
		const products = await productManager.getProducts();
		res.status(200).send({
			status: "success",
			payload: products,
		});
	} catch (error) {
		throw new Error("router.get/products" + error.message);
	}
});
// producto
router.get("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		const onlyProduct = await productManager.getProductsById(pid);

		res.status(200).send({
			status: "success",
			payload: onlyProduct,
		});
	} catch (error) {
		throw new Error("router.get/products" + error.message);
	}
});

// POST
router.post("/", async (req, res) => {
	try {
		const newProduct = req.body;
		const result = await productManager.AddProduct(newProduct);

		res.status(200).send({
			status: "success",
			payload: result,
		});
	} catch (error) {
		throw new Error("router.post" + error.message);
	}
});

// PUT
router.put("/:pid", (req, res) => {
	res.status(200).send("ACTUALIZAR PRODUCTO");
});

// DELETE
router.delete("/:pid", (req, res) => {
	res.status(200).send("BORRAR PRODUCTO");
});

module.exports = router;
