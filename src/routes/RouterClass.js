const {Router} = require ('express')
const jwt = require('jsonwebtoken')
class RouterClass {
    constructor(){
        this.router = Router()
        this.init()
    }
    getRouter(){
    return this.router
    }
    init (){}
    applyCallBacks(callbacks){
        //params = [req(0), res(1),next(2)]
        return callbacks.map(callback => async(...params)=>{
            try {
                //apply ejecutará la función callback apuntando directamente a una instancia de la clase, por ello, colocamos this para que utilice solo el contexto de este router, los parámetros son internos de cada callback, sabemos que los params de un callback corresponden a req, res, next
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send
            }
            
        })
    }

    generateCustomResponse = (req, res, next)=>{
        res.sendSuccess = payload => res.send({status: 'success', payload})
        res.sendServerError = error => res.send({status: 'error', error})
        res.sendUserError = error => res.send({status: 'error', error})
        next()
    }

    handlePolicies = policies => (req, res, next)=>{
        if(policies[0] == 'PUBLIC') return next()
        const authHeader = req.headers.authorization
        if(!authHeader) return res.send({status:'error', error:'No Autorizado'})
        const token = authHeader.split('')[1]
        const user = jwt.verify(token, 'CoderSecreto')
        if (!policie.includes(user.role.toUpperCase())) return res.status(403)({status: 'error', error:'not permision'})
        req.user = user
        next()
    }

    get(path, policies, ...callback){
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallBacks(callback))
    }
    post(path, policies, ...callback){
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallBacks(callback))
    }
    put(path, policies, ...callback){
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallBacks(callback))
    }
    delete(path, policies, ...callback){
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallBacks(callback))
    }
}


module.exports = RouterClass