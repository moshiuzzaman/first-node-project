
const jwt = require('jsonwebtoken');
// create middleware for check login user from jwt token
const checkLoginUser = (req, res, next) => {
    const token =req.cookies.jwt
    const decoded = jwt.decode(token);
    if(typeof token!=="undefined"){
        req.userId = decoded.userId;
        req.role = decoded.role
        next()
    }else{
        res.status(403).send('you have to login first')
    }
    
}
module.exports=checkLoginUser;
