// check  user role is "User" or not
const checkUser = (req, res, next) => {
    if (req.role === "user") {
        next()
    } else {
        res.send({
            message:`You are a ${req.role}, Please LogIn as User and try again`,
            authorized:false
        });
    }
}


// check  user role is "admin" or "Super admin" or not
const checkAdminOrSuperAdmin = (req, res, next) => {
    if (req.role === "admin" || req.role === "super admin") {
        next()
    } else {
         res.send({
            message:`You are a ${req.role}, Please LogIn as Admin or super admin and try again`,
            authorized:false
        });
    }
}

// check  user role is "admin" or not
const checkAdmin = (req, res, next) => {
    if (req.role === "admin") {
        next()
    } else {
         res.send({
            message:`You are a ${req.role}, Please LogIn as Admin and try again`,
            authorized:false
        });
    }
}

// check  user role is "super admin" or not
const checkSuperAdmin = (req, res, next) => {
    if (req.role === "super admin") {
        next()
    } else {
         res.send({
            message:`You are a ${req.role}, Please LogIn as Super Admin and try again`,
            authorized:false
        });
    }
}

// export middleware
module.exports.checkUser = checkUser;
module.exports.checkSuperAdmin = checkSuperAdmin;
module.exports.checkAdmin = checkAdmin;
module.exports.checkAdminOrSuperAdmin = checkAdminOrSuperAdmin;