const {Router} = require ('express')
const { studentsModel } = require('../models/students.model')
//const {students} = require('../files/students')

const router = Router()

router.get('/',  async (req, res)=>{
    try {
        
        //Insertar ordenes
        //await studentsModel.insertMany(students)
        
        //AGRUPAR POR CALIFICACIÓN DE MAYOR A MENOR
        // let result = await studentsModel.aggregate([
        //     { $group: { _id: '$grade', students: { $push: "$$ROOT" } } },
        //     { $sort: { _id: -1 } }
        // ])
        // console.log(result);


        //AGRUPAR ESTUDIANTES POR GRUPO
        // let result = await studentsModel.aggregate([
        //     { $group: { _id: "$group", students: { $push: "$$ROOT" } } }
        // ])
        // console.log(result);

        //PROMEDIO ESTUDIANTES 1B
        // let result = await studentsModel.aggregate([
        //     { $match: { group: "1B" } },
        //     { $group: { _id: "1B", promedio: { $avg: "$grade" } } }
        // ])
        // console.log(result);

        //PROMEDIO DE ESTUDIANTES 1A
        // let result = await studentsModel.aggregate([
        //     { $match: { group: "1A" } },
        //     { $group: { _id: "1A", promedio: { $avg: "$grade" } } }
        // ])
        // console.log(result);

        //PROMEDIO GENERAL DE ESTUDIANTES.
        // let result = await studentsModel.aggregate([
        //     { $group: { _id: "Students", promedio: { $avg: "$grade" } } }
        // ])
        // console.log(result);


        //PROMEDIO SOLO HOMBRES
        // let result = await studentsModel.aggregate([
        //     {$match:{gender:"Male"}},
        //     {$group:{_id:"Hombres",promedio:{$avg:"$grade"}}}
        // ])
        // console.log(result);

        //PROMEDIO MUJERES

        // let result = await studentsModel.aggregate([
        //     {$match:{gender:"Female"}},
        //     {$group:{_id:"Mujeres",promedio:{$avg:"$grade"}}}
        // ])
        // console.log(result);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router

