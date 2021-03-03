var express = require('express');
var router = express.Router();
var usersModule = require('../modules/User')
const bcrypt = require('bcrypt');
/* post sing up */
router.post('/', async (req, res, next) => {
    // create user object
    const userDetails = new usersModule({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    // Save user in database
    try {
        await userDetails.save()
        res.status(202).send(`Wow "${req.body.name}" you successfully registered.`)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router;
