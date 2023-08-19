//const cartManager = require("../managerDaos/mongo/cart.mongo.js");
//const productManager = require("../managerDaos/mongo/product.mongo.js");
const { cartService, productService } = require("../service/index.js");
const { verifyCid, verifyPid } = require("../utils/cartValidator.js");
const jwt = require("jsonwebtoken");
const { codeGenerator } = require("../utils/codeGenerator.js");
require("dotenv").config();

class cartController {
    /*Creacion del carrito*/ 
    createCart = async (req, res) => {
        try {
            let result = await cartService.createCart(); 

            if (!result || result.status === "error") {
                return res.status(404).send({
                    status: "error",
                    error: result,
                });
            }

            res.status(200).send({
                status: "success",
                payload: result,
            });
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al crear el carrito",
            });
            return error;
        }
    };

    addProduct = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const token = req.cookies.coderCookieToken;
            let user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

            const isValidCid = await verifyCid(cid);
            if (!isValidCid) {
                return res.status(404).send({ status: "error", error: `No existe el carrito id ${cid}` });
            }
            const isPidValid = await verifyPid(pid); 
            if (!isPidValid) {
                return res.status(404).send({
                    status: "error",
                    error: `No existe el producto id ${pid}`,
                });
            }

            let product = await productService.getProduct(pid);

            if (user.user.role === "premium") {
                if (user.user.email === product.owner) {
                    return res.status(404).send({
                        status: "error",
                        error: `el producto id ${pid} pertenece al usuario.`,
                    });
                }
            }

            let result = await cartService.addProduct(cid, pid);
            res.status(200).send({
                status: "success",
                payload: result,
            });
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al crear el carrito",
            });
            return error;
        }
    };

    getCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const isValidCid = await verifyCid(cid);
            if (!isValidCid) {
                return res.status(404).send({ status: "error", error: `No existe el carrito id ${cid}` });
            }
            let cart = await cartService.getCartById(cid); 
            return res.status(200).send({
                status: "success",
                payload: cart,
            });
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al obtener el carrito",
            });
            return error;
        }
    };

    getCarts = async (req, res) => {
        try {
            let carts = await cartService.getCarts();
            return res.status(200).send({
                status: "success",
                payload: carts,
            });
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al obtener el carrito",
            });
            return error;
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const { cid, pid } = req.params;

            const isValidCid = await verifyCid(cid);
            if (!isValidCid) {
                return res.status(404).send({ status: "error", error: `No existe el carrito id ${cid}` });
            }
            const isPidValid = await verifyPid(pid); 
            if (!isPidValid) {
                return res.status(404).send({
                    status: "error",
                    error: `No existe el producto id ${pid}`,
                });
            }
            const cart = await cartService.getCartById(cid);
            const products = cart.product.find((producto) => producto.idProduct._id == pid);
            if (!products) {
                return res.status(404).send({
                    status: "error",
                    error: `No existe el producto id ${pid} en el carrito ${cid}`,
                });
            }
            const result = await cartService.deleteProduct(cid, pid);

            res.status(200).send({
                status: "success",
                payload: result,
            });
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al borrar  el producto",
            });
        }
    };

    emptyCart = async (req, res) => {
        try {
            const { cid } = req.params;

            const isValidCid = await verifyCid(cid);
            if (!isValidCid) {
                return res.status(404).send({ status: "error", error: `No existe el carrito id ${cid}` });
            }

            const result = await cartService.deleteProducts(cid);

            res.status(200).send({
                status: "success",
                payload: result,
            });
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al borrar  el producto",
            });
        }
    };

    updateProducts = async (req, res) => {
        try {
            const { cid } = req.params;
            const products = req.body;
            const token = req.cookies.coderCookieToken;
            let user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

            for (const product of products) {
                const validPid = await productService.getProduct(product.idProduct);
                if (!validPid || validPid.status === "error") {
                    return res.status(404).send({ status: "error", error: `No existe el producto id ${product.idProduct}` });
                }

                if (user.user.role === "premium") {
                    if (user.user.email === validPid.owner) {
                        return res.status(403).send({
                            status: "error",
                            error: `el producto id ${product.idProduct} pertenece al usuario.`,
                        });
                    }
                }
            }

            const isValidCid = await verifyCid(cid);
            if (!isValidCid) {
                return res.status(404).send({ status: "error", error: `No existe el carrito id ${cid}` });
            }

            const result = await cartService.updateProducts(cid, products);

            res.status(200).send({
                status: "success",
                payload: result,
            });
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al borrar  el producto",
            });
        }
    };

    updateProduct = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const isValidCid = await verifyCid(cid);
            if (!isValidCid) {
                return res.status(404).send({ status: "error", error: `No existe el carrito id ${cid}` });
            }

            const isPidValid = await verifyPid(pid); 
            if (!isPidValid) {
                return res.status(404).send({
                    status: "error",
                    error: `No existe el producto id ${pid}`,
                });
            }
            const cart = await cartService.getCartById(cid); 
            const products = cart.product.find((producto) => producto.idProduct._id == pid);
            if (!products) {
                return res.status(404).send({
                    status: "error",
                    error: `No existe el producto id ${pid} en el carrito ${cid}`,
                });
            }
            const result = await cartService.updateProduct(cid, pid, quantity);

            res.status(200).send({
                status: "success",
                payload: result,
            });
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al borrar  el producto",
            });
        }
    };

    purchase = async (req, res) => {
        try {
            const { cid } = req.params;
            const token = req.cookies.coderCookieToken;
            let tokenUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

            const isValidCid = await verifyCid(cid);
            if (!isValidCid) {
                return res.status(404).send({ status: "error", error: `No existe el carrito id ${cid}` });
            }

            let cart = await cartService.getCartById(cid);
            let productsUnavailable = []; //Aux para ingresar productos sin stock

            if (cart.product.length == 0) {
                return res.status(405).send({ status: "error", error: `No hay productos el carrito id ${cid}` }); 
            }
            for (const product of cart.product) {
                let stock = product.idProduct.stock;
                let pid = product.idProduct._id;
                if (stock >= product.quantity) {
                    product.idProduct.stock -= product.quantity;
                    await productService.updateProduct(pid, product.idProduct);
                } else {
                    productsUnavailable.push(product);
                }
            }
            const ProductsAvailable = cart.product.filter(
                (product) => !productsUnavailable.some((productUnavailable) => productUnavailable.idProduct._id === product.idProduct._id)
            );

            if (ProductsAvailable.length > 0) {
                //Generacion de ticket
                const ticket = {
                    code: codeGenerator(),
                    purchaseDateTime: new Date(),
                    amount: ProductsAvailable.reduce((total, product) => total + product.quantity * product.idProduct.price, 0),
                    purchaser: tokenUser.user.email,
                };
                const createdTicket = await cartService.generateTicket(ticket);
                await cartService.updateProducts(cid, productsUnavailable);

                if (productsUnavailable.length > 0) {
                    return res.status(202).send({
                        status: "success",
                        message: "Compra exitosa. algunos producto no tienen stock. revisar carrito!",
                        ticket: createdTicket,
                        productsUnavailable,
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        message: "Compra exitosa.",
                        ticket: createdTicket,
                    });
                }
            } else {
                return res.status(404).send({ status: "error", error: `Productos sin stock`, productsUnavailable });
            }
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al realizar la compra",
            });
        }
    };
}

module.exports = new cartController();
