function auth(req, res, next) {
    if (req.session?.user?.role !== "admin") {
        if (req.session.user) {
            return res.redirect("/profile");
        } else {
            return res.redirect("/login");
        }
        //return res.status(401).send("error de autenticacion");
    }
    next();
}

module.exports = {
    auth,
};
