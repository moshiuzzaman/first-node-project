
const jwt = require('jsonwebtoken');
require('dotenv').config()

// create middleware for check login user from jwt token
const checkLoginUser = (req, res, next) => {
   const token= req?.headers["token"];
   console.log(token);
    if (typeof token !== "undefined") {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if (err) {
                res.send({
                    message:"You Have to login first",
                    authorized:false
                });
            } else {
                req.userId = user.userId;
                req.role = user.role
                next();
            }
        });
    } else {
        res.status(403).send('you have to login first')
    }

}
module.exports = checkLoginUser;
