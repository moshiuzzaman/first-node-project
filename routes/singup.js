var express = require('express');
var router = express.Router();
var usersModule = require('../modules/singUp')
const bcrypt = require('bcrypt');
/* post sing up */
router.post('/', function (req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    // password bcrypt
    let password = bcrypt.hashSync(req.body.password,10)
    // create user object
    const userDetails = new usersModule({
        name:name, 
        email:email, 
        role:role.toLowerCase(), 
        password:password
    })
    // Save user in database
    userDetails.save((err,doc)=>{
        if (err) throw err
        console.log('successfully registered')
        res.sendStatus(200).end();
    })
    
});

module.exports = router;
