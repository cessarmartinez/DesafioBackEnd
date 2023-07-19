const {Schema, model} = require('mongoose')

const collection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: String,
    price: Number
})



const productModel = model(collection, productSchema)

module.exports = {
    productModel
}