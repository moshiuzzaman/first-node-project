var express = require('express');
var router = express.Router();
var usersModule = require('../modules/singUp')
const checkLoginUser = require('../middleware/checkLoginUser')
const bcrypt = require('bcrypt');


/* Post User Update. */
router.patch('/', checkLoginUser, function (req, res, next) {
    const userId = req.userId
    const name=req.body.name;
    const email=req.body.email;
    const password= bcrypt.hashSync(req.body.password,10)
    const updateUser=usersModule.findByIdAndUpdate(userId,{name,email,password})
    updateUser.exec((err, doc) => {
        if (err) throw err
        console.log('user update successfully')
        res.sendStatus(205).end()
    })     
    
});

module.exports = router;
