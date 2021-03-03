var express = require('express');
var router = express.Router();
var usersModule = require('../modules/User')
const checkLoginUser = require('../middleware/checkLoginUser')
const bcrypt = require('bcrypt');


/* Post User Update. */
router.patch('/', checkLoginUser, async (req, res, next) => {

    try {
        await usersModule.findByIdAndUpdate(req.userId, {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10) 
         })
        res.status(205).send('user update successfully')
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;
