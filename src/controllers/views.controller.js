const { productService, cartService } = require("../service/index.js");
const { loged } = require("../middlewares/loged.middleware.js");
const { notLoged } = require("../middlewares/notLoged.middleware.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const productManager = require("../managerDaos/mongo/product.mongo.js");
const cartManager = require("../managerDaos/mongo/cart.mongo.js");

class viewsController {
    home = async (req, res) => {
        try {
            let loged = false;
            const { payload } = await productService.getProducts(15);
            if (req.cookies.coderCookieToken) {
                loged = true;
            }
            const token = req.cookies.coderCookieToken;
            let tokenUser = "";
            if (token) {
                tokenUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            }
            const role = tokenUser.user?.role === "admin" ? true : false;
            //console.log(payload);
            const object = {
                style: "index.css",
                title: "Productos",
                loged,
                role,
                products: payload,
            };
            res.render("home", object);
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });
        }
    };

    products = async (req, res) => {
        try {
            const { page } = req.query;
            let loged = false;
            //console.log(req.user);
            const { payload, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = await productService.getProducts(undefined, page);
            if (page && (page > totalPages || page <= 0 || !parseInt(page))) {
                return res.status(400).send({ status: "error", error: "Pagina inexistente" });
            }
            if (req.cookies.coderCookieToken) {
                loged = true;
            }
            const token = req.cookies.coderCookieToken;
            let tokenUser = "";
            if (token) {
                tokenUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            }
            const role = tokenUser.user?.role === "admin" ? true : false;
            const object = {
                style: "index.css",
                title: "Productos",
                products: payload,
                //user: req.user,
                role: role,
                loged,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
            };
            res.render("products", object);
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });
        }
    };

    carts = async (req, res) => {
        try {
            const { cid } = req.params;
            let loged = false;
            //const role = req.user?.role === "admin" ? true : false;
            const cart = await cartService.getCartById(cid);
            if (!cart) return res.sendServerError("Carrito inexistente");
            if (req.cookies.coderCookieToken) {
                loged = true;
            }
            const token = req.cookies.coderCookieToken;
            let tokenUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            const role = tokenUser.user?.role === "admin" ? true : false;
            const object = {
                style: "index.css",
                title: "Productos",
                //user: req.user,
                role: role,
                products: cart?.product,
                id: cart?._id,
                loged,
            };
            res.render("carts", object);
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });
        }
    };

    chat = async (req, res) => {
        try {
            let loged = false;
            if (req.cookies.coderCookieToken) {
                loged = true;
            }
            const token = req.cookies.coderCookieToken;
            let tokenUser = "";
            if (token) {
                tokenUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            }
            const role = tokenUser.user?.role === "admin" ? true : false;
            res.render("chat", { style: "index.css", loged, role });
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });
        }
    };

    realTimeProducts = async (req, res) => {
        try {
            let loged = false;
            const { payload } = await productService.getProducts(20);
            if (req.cookies.coderCookieToken) {
                loged = true;
            }
            const token = req.cookies.coderCookieToken;
            let tokenUser = "";
            if (token) {
                tokenUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            }
            const role = tokenUser.user?.role === "admin" ? true : false;
            const object = {
                style: "index.css",
                title: "Productos en tiempo real",
                user: req.user,
                loged,
                role,
                products: payload,
            };
            res.render("realTimeProducts", object);
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });
        }
    };

    login = async (req, res) => {
        try {
            const object = {
                style: "index.css",
                title: "Login",
                //products: payload,
            };
            res.render("login", object);
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });
        }
    };

    recoveryPass = async (req, res) => {
        try {
            const object = {
                style: "index.css",
                title: "Recovery Password",
                //products: payload,
            };
            res.render("recoveryPassword", object);
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });
        }
    };

    recovery = async (req, res) => {
        try {
            const { token } = req.params;
            const currentTimestamp = Math.floor(Date.now() / 1000);

            let user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

            if (currentTimestamp > user.exp) {
                return res.redirect("/recoveryPassword");
            }
            const object = {
                style: "index.css",
                title: "Recovery Password",
            };
            res.cookie("recoveryToken", token, {
                maxAge: 3600000,
                httpOnly: true,
            }).render("recovery", object);
        } catch (error) {
            //res.redirect("/recoveryPassword");
            /*res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });*/
        }
    };

    register = async (req, res) => {
        try {
            const object = {
                style: "index.css",
                title: "register",
            };
            res.render("registerForm", object);
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });
        }
    };

    profile = async (req, res) => {
        try {
            let loged = false;
            if (req.cookies.coderCookieToken) {
                loged = true;
            }
            const token = req.cookies.coderCookieToken;
            let tokenUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            const role = tokenUser.user?.role === "admin" ? true : false;
            const object = {
                style: "index.css",
                title: "Login",
                user: tokenUser.user, //req.user,
                role,
                loged,
            };
            res.render("profile", object);
        } catch (error) {
            res.status(500).send({
                status: "ERROR",
                error: "Ha ocurrido un error al cargar la vista.",
            });
        }
    };
}

module.exports = new viewsController();
