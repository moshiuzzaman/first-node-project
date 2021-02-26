var express = require('express');
var router = express.Router();
var usersModule = require('../modules/singUp')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Post user email and password for login
router.post('/', function (req, res, next) {
    const email = req.body.email;
    let password = req.body.password
    // Find user by user email in database
    const checkUser = usersModule.findOne({ email: email })
    // console.log(checkUser)
    checkUser.exec((err, data) => {
        if (err) throw err;
        if ( data === null) {
            console.log('Please send valid email and password')
            res.sendStatus(403).end()
        } else {
            const getId = data._id
            const getPassword = data.password
            // check user password and compare 
            if (bcrypt.compareSync(password, getPassword)) {

                // Set jwt token in cookie
                var token = jwt.sign({ userId: getId, role: data.role }, 'loginToken');
                res.cookie("jwt", token)
                console.log('login successfully')
                res.sendStatus(202).end()
            } else {
                console.log('your Password is not valid');
                res.sendStatus(403).end()
            }
        }

    })



});

module.exports = router;
