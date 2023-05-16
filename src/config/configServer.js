const { connect } = require("mongoose");

//en vez de usar localhost usamos 127.0.0.1 en la ruta
module.exports = {
	connectDb: () => {
		connect("mongodb://127.0.0.1:27017/comision39750");
		console.log("base de datos conectada");
	},
};
