var express = require('express');
var router = express.Router();
var usersModule = require('../modules/singUp')
const bcrypt = require('bcrypt');
/* GET home page. */
router.post('/', function (req, res, next) {
    res.render('index', { title: 'singup' });
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    let password = bcrypt.hashSync(req.body.password,10)
    const userDetails = new usersModule({
        name:name, 
        email:email, 
        role:role, 
        password:password
    })
    userDetails.save((err,doc)=>{
        if (err) throw err
        // res.render('index',{title:'singup rendered'})
        console.log('successfully registered')
    })
});

module.exports = router;
