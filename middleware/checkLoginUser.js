
const jwt = require('jsonwebtoken');
// create middleware for check user from jwt token
const checkLoginUser = (req, res, next) => {
    const token =req.cookies.jwt
    const decoded = jwt.decode(token);
    if(typeof token!=="undefined"){
        console.log('got token')
        req.userId = decoded.userId;
        req.role = decoded.role
        next()
    }else{
        console.log('you have to login first')
        res.sendStatus(403)
    }
    
}
module.exports=checkLoginUser;
