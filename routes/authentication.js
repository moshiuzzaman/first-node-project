var express = require('express');
var router = express.Router();
var usersModule = require('../Schemas/userSchema')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Post user email and password for login
router.get('/login', async (req, res, next) => {
    const email = req.body.email;
    let password = req.body.password

    try {
        // Find user by user email 
        const findUser = await usersModule.findOne({ email })
        if (findUser === null) {
            res.status(403).send('Please send valid email')
        } else {
            const getId = findUser._id
            const getPassword = findUser.password
            // check user password and compare 
            if (bcrypt.compareSync(password, getPassword)) {

                // Set jwt token in cookie
                var token = jwt.sign({ userId: getId, role: findUser.role }, 'loginToken');
                res.cookie("jwt", token)
                res.status(202).send(`login successfully as: ${findUser.role}`)
            } else {
                res.status(403).send('your Password is not valid')
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
});

/* GET logout  */
router.get('/logout', (req, res, next)=> {
    res.clearCookie('jwt');
    res.status(202).send('logout successfully')
  });

module.exports = router;
