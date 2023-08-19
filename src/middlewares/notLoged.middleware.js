
function notLoged(req, res, next) {
    if (!req.cookies.coderCookieToken) {
        return res.redirect("/login");
    }
    next();
}

module.exports = {
    notLoged,
};
