var express = require('express');
var router = express.Router();
var usersModule = require('../modules/singUp')
const checkLoginUser = require('../middleware/checkLoginUser')

/* GET Delete. */
router.get('/', checkLoginUser, function (req, res, next) {
    const userRole = req.role;
    const userId = req.body.userId
    // check user role
    if (userRole === "super admin") {
        // find user by id and delete
        const deleteUser = usersModule.findByIdAndDelete(userId, (err, doc) => {
            if (err) {
                console.log(err)
                res.sendStatus(204).end()
            } else if(doc===null) {
                console.log('userId is not valid/already deleted')
                res.sendStatus(204).end()
            }else{
                console.log('deleted successfully' + doc)
                res.sendStatus(200).end()
            }
        })

    } else {
        console.log('admin or user are not able to access this page')
        res.sendStatus(403).end()
    }
});

module.exports = router;
