var express = require('express');
var router = express.Router();
var usersModule = require('../Schemas/userSchema')
const checkLoginUser = require('../middleware/checkLoginUser')
const bcrypt = require('bcrypt');
const checkRole = require('../middleware/checkingRole')


/* post sing up */
router.post('/create-user', async (req, res, next) => {
    try {
        // create user object
        const userDetails = new usersModule({
            ...req.body.userData,
            password: bcrypt.hashSync(req.body.userData.password, 10)
        })
        // Save user in database
        await userDetails.save()
        res.status(202).send(`Wow "${req.body.userData.name}" you successfully registered as ${req.body.userData.role}.`)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.post('/add-user', async (req, res, next) => {
    try {
        // create user object
        const userDetails = new usersModule({
            ...req.body.userData,
            password: bcrypt.hashSync(req.body.userData.password, 10)
        })
        // Save user in database
        await userDetails.save()
        res.status(202).send(`Wow  you successfully added "${req.body.userData.name}"  as "${req.body.userData.role}".`)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.get('/',
    async (req, res, next) => {
        try {
            // Find all users from database
            const users = await usersModule.find()
            res.status(200).send(users)
        } catch (error) {
            res.status(500).send(error)
        }
    }
)

/* Post User Update. */
router.patch('/update-user',
    checkLoginUser,
    async (req, res, next) => {
        console.log(req.body);
        try {
            await usersModule.findByIdAndUpdate(req.userId, {
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10)
            })

            res.send({ message: 'user update successfully', code: 200 })
        } catch (error) {
            res.send({ message: "This email already used" })
            res.status(500)
        }
    });

/* GET Delete. */
router.post('/delete-user',
    checkLoginUser,
    checkRole.checkSuperAdmin,
    async (req, res, next) => {
        try {
            const userId = req.body.userId
            console.log();
            // find user by id and delete
            const deleteUser = await usersModule.findByIdAndDelete(userId)
            if (deleteUser === null) {
                res.send('userId is not valid/already deleted')
            }
            const users = await usersModule.find()
            res.status(200).send({
                message: 'user deleted successfully',
                users
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
    });
router.patch('/update-role',
    checkLoginUser,
    checkRole.checkSuperAdmin,
    async (req, res, next) => {
        try {
            const userId = req.body.userId;
            const role = req.body.userRole;
            // Find user by user Id and update user Role
            await usersModule.findByIdAndUpdate(userId, { role })
            const users = await usersModule.find()
            res.send({ message: 'User role updated successfully', users })
        } catch (error) {
            res.status(500).send(error)
        }
    });



module.exports = router;
