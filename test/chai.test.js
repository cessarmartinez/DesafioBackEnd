const mongoose = require("mongoose");
const ProductDao = require("../src/managerDaos/mongo/product.mongo");
const chai = require("chai");

mongoose.connect("mongodb+srv://cessarmart:390ljtiALsv7UcP8@cluster0.lr2zwx0.mongodb.net//test?retryWrites=true&w=majority");
const expect = chai.expect;

describe("set de test Product en chai", () => {
    before(function () {
        this.productDao = new ProductDao();
    });
    beforeEach(function () {
        //mongoose.connection.collections.products.drop();
        this.timeout(4000);
    });
    it("El dao debe poder obtener todos los productos en un array", async function () {
        const result = await this.productDao.getProducts();
        console.log(result);
        expect(Array.isArray(result.payload)).to.be.ok;
    });
    /*it("El dao debe crear un producto correctamente de la basde datos", async function () {
        let productMock = {
            "category": "nike",
            "name": "AIR JORDAN 1 LOW ROYAL YELLOW",
            "price": 74799,
            "image": "https://raw.githubusercontent.com/cessarmartinez/DesafioJS/main/assets/img/lowroyalyellow.png",
            "stock": 56,
            "code": 253,
            "description": "zapatilla air jordan 1 low royal yellow"
        };

        const result = await this.productDao.createProduct(productMock);

        const product = await this.productDao.getProductBy({ title: result.title });
        console.log("guardado", result);
        console.log("Traido", product);
        assert.strictEqual(typeof product, "object", true);
    });*/

    it("El dao debe modificar un producto correctamente de la basde datos", async function () {
        const _id = "64d3a5f4609060822a128d35";
        let productUpdate = {
            title: "i9 12gen",
        };

        const result = await this.productDao.updateProduct(_id, productUpdate);

        const product = await this.productDao.getProductById(_id);
        console.log("editado", result);
        console.log("Traido", product);
        expect(product).to.have.property("title", productUpdate.title);
    });

    it("El dao debe borrar un producto correctamente de la basde datos", async function () {
        let productMock = {
            category: "nike",
            name: "AIR JORDAN 1 LOW ROYAL YELLOW",
            price: 74799,
            image: "https://raw.githubusercontent.com/cessarmartinez/DesafioJS/main/assets/img/lowroyalyellow.png",
            stock: 56,
            code: 253,
            description: "zapatilla air jordan 1 low royal yellow",
            status: true,
            stock: 10,
            owner: "usuario@gmail.com",
        };

        const result = await this.productDao.createProduct(productMock);

        console.log("creado", result);

        const resultDelete = await this.productDao.deleteProduct(result._id);

        console.log("Borrado", resultDelete);

        expect(resultDelete.deletedCount).to.deep.equal(1);
    });
});
