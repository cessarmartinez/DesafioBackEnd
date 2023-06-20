const productManager = require("../managerDaos/mongo/product.mongo.js");
const { cartService } = require("../service");

const verifyCid = async (cid) => {
    const cart = await cartService.getCartById(cid);
    if (!cart || cart.status === "error") {
        return false;
    }
    return true;
};

const verifyPid = async (pid) => {
    const product = await productManager.getProductById(pid);
    if (!product || product.status === "error") {
        return false;
    }
    return true;
};

module.exports = {
    verifyCid,
    verifyPid,
};
