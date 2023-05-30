function userLog (req, res, next) {
    if (!req.session?.user) {
        return res.status(401).send("Usuario No logueado")
    }
    next()
}

module.exports = userLog
