const { Router } = require("express");
const productRouter = require("./products.router");
const userRouter = require("./user.router");
const { uploader } = require("../utils/multer");

const router = Router();

// router.use("/", (req, res) => {
// 	res.send("hola mundo");
// });

router.use("/api/productos", productRouter);

router.use("/api/usuarios", userRouter);

//multer post
router.post("/upload", uploader.single("myFile"), (req, res) => {
	res.send({
		status: "success",
		mensaje: "archivo subido con exito",
	});
});
module.exports = router;
