const checkLoginUser = (req, res, next) => {
    const token =req.cookies.jwt
    try {
        var decoded = jwt.verify(token, 'loginToken');
    } catch (err) {
        console.log('you have to login first')
        res.redirect('/')
    }
    next()
}

module.exports=checkLoginUser;
