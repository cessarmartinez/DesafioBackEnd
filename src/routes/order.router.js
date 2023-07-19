const { Router } = require('express')
const {orderModel} = require('../models/order.model')
//const {ordenes} = require('./ordenes')

const router = Router()

router.get('/',  async (req, res)=>{
    try {
        
        //Insertar ordenes
        //await orderModel.insertMany(ordenes)

        //solicitar ordenes
        //let result = await orderModel.find()
        //console.log(result)

        //ejemplo de stages
        /*const resultOrders = await orderModel.aggregate([
            {
                //paso 1
                $match: {size: 'medium'} //trae los mediums
            },
            {
                //paso 2
                $group: {_id: '$name', totalQuantity: {$sum: "$quantity"}, totalPrice: {$sum: "$price"}}
            }
        ])*/
        //ejemplo de stages 2
        const resultOrders = await orderModel.aggregate([
            {
                //paso 1
                $match: {size: 'medium'} //trae los mediums
            },
            {
                //paso 2
                $group: {_id: '$name', totalQuantity: {$sum: "$quantity"}}
            },
            {
                $sort: {totalQuantity: 1}
            },
            {
                $group: {_id: 1, orders: {$push: '$$ROOT'}}
            },
            {
                $project: {
                    "_id": 0,
                    orders: '$orders'
                }
            },
            {
                $merge: {
                    into: 'reports'
                }
            }
        ])
        console.log(resultOrders)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router