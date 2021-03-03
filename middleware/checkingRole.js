const jwt = require('jsonwebtoken');

// check  user role is "User" or not
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    const decoded = jwt.decode(token);
    if (decoded.role === "user") {
        next()
    } else {
        res.status(403).send(`You are a ${decoded.role}, only user can access this api`)
    }
}


// check  user role is "admin" or not
const checkAdmin = (req, res, next) => {
    const token = req.cookies.jwt
    const decoded = jwt.decode(token);
    if (decoded.role === "admin") {
        next()
    } else {
        res.status(403).send(`You are a ${decoded.role}, only admin can access this api`)
    }
}

// check  user role is "super admin" or not
const checkSuperAdmin = (req, res, next) => {
    const token = req.cookies.jwt
    const decoded = jwt.decode(token);
    if (decoded.role === "super admin") {
        next()
    } else {
        res.status(403).send(`You are a ${decoded.role}, only Super admin can access this api`)
    }
}

// export middleware
module.exports.checkUser = checkUser;
module.exports.checkSuperAdmin = checkSuperAdmin;
module.exports.checkAdmin = checkAdmin;