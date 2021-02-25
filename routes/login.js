var express = require('express');
var router = express.Router();
var usersModule = require('../modules/singUp')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    const email = req.body.email;
    let password = req.body.password
    const checkUser = usersModule.findOne({ email: email })
    checkUser.exec((err, data) => {
        if (err) throw err;
        const getId=data._id
        const getPassword = data.password
        if (bcrypt.compareSync(password, getPassword)) {
            var token = jwt.sign({ userId: getId }, 'loginToken');
            res.cookie("jwt", token)
            res.status(205)
            res.redirect('/')
            console.log('login successfully')
        } else {
            console.log('login field')
        }
        
    })

    
    
});

module.exports = router;
