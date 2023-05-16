const { Router } = require("express");

const router = Router();

// GET
router.get("/", (req, res) => {
	res.status(200).send("BIENVENIDOS A USERS");
});

module.exports = router;
