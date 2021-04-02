var express = require('express');
var router = express.Router();
var usersModule = require('../Schemas/userSchema')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()

// Post user email and password for login
router.post('/login', async (req, res, next) => {
    console.log('object');
    console.log(req.body.userObj.password);
    try {
        const email = req.body.userObj.email;
        let password = req.body.userObj.password
        console.log(email);
        // Find user by user email 
        const findUser = await usersModule.findOne({ email })
        if (findUser === null) {
            res.send({
                    "message":'Please send valid email'
                })
        } else {
            const getId = findUser._id
            const getPassword = findUser.password
            // check user password and compare 
            if (bcrypt.compareSync(password, getPassword)) {

                // Set jwt token in cookie
                var token = jwt.sign({ userId: getId, role: findUser.role }, process.env.SECRET_TOKEN);
                res.cookie("jwt", token)
                res.cookie('__session', token);
                res.status(202).send({
                    isLogIn:true,
                    token: token,
                    "user":findUser,
                    "message":`login successfully as: ${findUser.role}`,
                    code:202
                })
            } else {
               res.send({
                    "message":`User password Is not Valid`
               })    
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
});

/* GET logout  */
router.get('/logout', (req, res, next) => {
    res.clearCookie('jwt');
    res.status(202).send('logout successfully')
});

module.exports = router;
