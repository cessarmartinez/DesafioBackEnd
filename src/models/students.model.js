const {Schema, model} = require('mongoose')

const collection = 'students'

const studentsSchema = new Schema({
    firts_name: String,
    last_name: String,
    email: String,
    gender: String,
    grade: Number,
    group: String
})



const studentsModel = model(collection, studentsSchema)

module.exports = {
    studentsModel
}