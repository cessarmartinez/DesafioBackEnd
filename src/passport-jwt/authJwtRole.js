const authorization = role =>{
    return async (req,res,next)=>{
        console.log('role', role)
        console.log('user', req.user)
        if(!req.user) return res.status(401).send({status: 'error', error: 'Unauthorized'})
        if(req.user.user.role != role) return res.status(403).send({status: 'error', error: 'No tienes permisos'})
    }
}

module.exports = {
    authorization
}