function auth(req, res, next){
    if(req.session.user?.first_name != 'cesarname' || !req.session.admin){
        return res.status(401).send('NO SOS ADMIN')
    }
    next()
}

module.exports = {
    auth
}