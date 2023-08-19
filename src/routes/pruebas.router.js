const { Router } = require("express"); // Importo Router de express
const { auth } = require("../middlewares/authentication.middleware");
const { fork } = require("child_process");
const { generateUser } = require("../utils/generateUserFaker");
const { generateProduct } = require("../utils/generateProductFaker");
const compression = require("express-compression");

const router = Router();
//router.use(compression()); gzip
//brotli
router.use(
    compression({
        brotli: {
            enabled: true,
            zlib: {},
        },
    })
);

/*router.get("/logger", (req, res) => {
    req.logger.debug("Logger debug");
    req.logger.http("Logger http");
    req.logger.info("Logger info");
    req.logger.warning("Logger warning");
    req.logger.error("Logger error");
    req.logger.fatal("Logger fatal");
    res.send({ message: "Prueba de logger" });
});*/



router.get('/params/:nombre([a-zA-Z%C3%A1%C3%81%C3%A9%C3%89%C3%AD%C3%8D%C3%B3%C3%93%C3%BA%C3%9A]+)', (req,res)=>{
    res.send({
        message: req.params.nombre
    })
})

router.put('/params/:nombre([a-zA-Z%C3%A1%C3%81%C3%A9%C3%89%C3%AD%C3%8D%C3%B3%C3%93%C3%BA%C3%9A]+)', (req,res)=>{
    res.send({
        message: req.params.nombre
    })
})

router.delete('/params/:nombre([a-zA-Z%C3%A1%C3%81%C3%A9%C3%89%C3%AD%C3%8D%C3%B3%C3%93%C3%BA%C3%9A]+)', (req,res)=>{
    res.send({
        message: req.params.nombre
    })
})

router.get("/mocks", (req, res) => {
    let users = [];
    for (let i = 0; i < 100; i++) {
        users.push(generateUser());
    }
    res.send({ status: "success", payload: users });
});

router.get("/mockingProducts", (req, res) => {
    let products = [];
    let code = 1;
    let prefijo = "00";
    for (let i = 0; i < 100; i++) {
        if (code > 9 && code < 100) {
            prefijo = "0";
        }
        if (code >= 100) {
            prefijo = "";
        }
        products.push(generateProduct(prefijo, code));
        code++;
    }
    res.send({ status: "success", payload: products });
});


router.get("/block", (req, res) => {
    const result = operacionCompleja();
    res.send(`El resultado dela operación es:  ${result}`);
});

router.get("/noblock", (req, res) => {
    const child = fork("./src/utils/operacionCompleja.js");
    child.send("Inicia el proceso de calculo");
    child.on("message", (result) => {
        res.send(`El resultado es:  ${result}`);
    });
});


// Sessions

router.get("/session", (req, res) => {
    if (req.session.counter) {
        console.log(req.session);
        req.session.counter++;
        return res.send(`${req.session.user} ah visitado el sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        return res.send(`Bienvenido ${req.session.user}`);
    }
});

router.post("/session", (req, res) => {
    const { userName, password } = req.body;
    if (userName !== "lautaro" || password !== "prueba123") {
        return res.send("Usuario y/o contraseña incorrecta");
    }
    req.session.user = userName;
    req.session.admin = true;
    console.log(req.session);
    return res.send("login exitoso");
});

router.get("/privada", auth, (req, res) => {
    res.send("todo lo que esta aca solo lo ve admin logeado");
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send({ status: "error", error: err });
        } else {
            return res.send("logout ok");
        }
    });
});
module.exports = router;
