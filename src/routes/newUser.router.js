const RouterClass = require('./RouterClass')

class UserRouter extends RouterClass{
    init(){
        this.get('/', async (req,res)=>{
            try {
                res.send('holaa')
            } catch (error) {
                res.sendServerError(error)
            }
            
        })
        this.get('/current',/*['PUBLIC'],*/ async (req,res)=>{
            try {
                res.send('validar')
            } catch (error) {
                res.sendServerError(error)
            }
            
        })
    }
}

module.exports = UserRouter