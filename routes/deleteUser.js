var express = require('express');
var router = express.Router();
var usersModule = require('../modules/User')
const checkLoginUser = require('../middleware/checkLoginUser')
const checkRole = require('../middleware/checkingRole')


/* GET Delete. */
router.delete('/', checkLoginUser, checkRole.checkSuperAdmin, async (req, res, next) => {
    const userId = req.body.userId
    // find user by id and delete
    try {
        const deleteUser = await usersModule.findByIdAndDelete(userId)
        if (deleteUser === null) {
            res.send('userId is not valid/already deleted')
        }
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;

