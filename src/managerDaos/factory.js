const config = require("../config/objectConfig.js");
let UserDao;
let ProductDao;
let ContactDao;
let CartDao;
let MessageDao;

switch (config.persistence) {
    case "MONGO":
        config.connectDB();
        const ProductDaoMongo = require("./mongo/product.mongo.js");
        const UserDaoMongo = require("./mongo/user.mongo");
        const ContactDaoMongo = require("./mongo/contact.mongo.js");
        const CartDaoMongo = require("./mongo/cart.mongo.js");
        const MessagesDaoMongo = require("./mongo/messsage.mongo.js");

        UserDao = UserDaoMongo;
        ProductDao = ProductDaoMongo;
        ContactDao = ContactDaoMongo;
        CartDao = CartDaoMongo;
        MessageDao = MessagesDaoMongo;
        break;

    case "FILE":
        const ProductDaoFile = require("./file/product.file.js");
        const UserDaoFile = require("./file/user.file.js");
        const CartDaoFile = require("./file/cart.file.js");
        const MessagesDaoFile = require("./file/message.file.js");

        UserDao = UserDaoFile;
        ProductDao = ProductDaoFile;
        CartDao = CartDaoFile;
        MessageDao = MessagesDaoFile;
        break;

    case "MEMORY":
        break;

    default:
        break;
}

module.exports = {
    UserDao,
    ProductDao,
    ContactDao,
    CartDao,
    MessageDao,
};
