const { Router } = require("express");
const CartManager = require("../CartManager");

const router = Router();
const cartManager = new CartManager();

router.get("/:cId", async (req, res) => {
	try {
		const { cId } = req.params;
		if (parseInt(cId) <= 0) {
			const carts = await cartManager.getCarts();
			return res.status(200).send({ status: 200, payload: carts });
		}

		const cart = await cartManager.getCartById(cId);
		return res.status(200).send({ status: 200, payload: cart });

		res.status(200).send({ status: 200, payload: cart, payload2: carts });
	} catch (error) {
		res.status(404).send({ status: 404, error: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const carts = await cartManager.getCarts();
		return res.status(200).send({ status: 200, payload: carts });
	} catch (error) {
		res.status(404).send({ status: 404, error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const array = await cartManager.addCart(req.body);
		res.status(200).send({ status: 200, payload: array });
	} catch (error) {
		res.status(404).send({ status: 404, error: error.message });
	}
});

router.post("/:cId/product/:pId", async (req, res) => {
	try {
		const { cId, pId } = req.params;
		const getCartArray = await cartManager.addProductCart(cId, pId);

		res.status(200).send({ status: 200, payload: getCartArray });
	} catch (error) {
		res.status(404).send({ status: 404, error: error.message });
	}
});

module.exports = router;
