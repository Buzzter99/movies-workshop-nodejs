const jwt = require('jsonwebtoken');
const JWT_KEY = 'secret';
async function authenticationMiddleware(req,res,next) {
    const token = req.cookies?.auth;
    if(!token) {
        return next();
    }
    let payload;
    try {
        payload = jwt.verify(token, JWT_KEY);
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/users/login');
        return next();
    }
    res.user = payload;
    res.locals.user = payload;
    return next();
}
async function privateEndpoint(req,res,next) {
    const isLoggedIn = res.user;
    if(!isLoggedIn) {
        res.redirect('/users/login');
        return;
    }
    return next();
}
module.exports = {authenticationMiddleware,privateEndpoint}