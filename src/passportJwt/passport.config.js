const passport = require("passport");
const jwt = require("passport-jwt");
require("dotenv").config();

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {token = req.cookies["coderCookieToken"];}
    return token;
};

const initPassport = () => {
    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: process.env.JWT_PRIVATE_KEY,
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload.user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

module.exports = {
    initPassport,
};
