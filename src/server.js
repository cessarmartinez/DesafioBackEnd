const express = require("express");
const routerServer = require("./routes/index");
const configObj = require("./config/configServer");
const logger = require("morgan");

const app = express();
const PORT = 8080;
configObj.connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use(logger("dev"));

app.use(routerServer);

app.listen(PORT, (err) => {
	if (err) console.log("error en el servidor", err);
	console.log(`Escuchando el puerto N: ${PORT}`);
});
