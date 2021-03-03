var express = require('express');
var router = express.Router();
var productsModule = require('../modules/addProducts')
const checkLoginUser = require('../middleware/checkLoginUser')
const checkRole = require('../middleware/checkingRole')

// Post products
router.post('/', checkLoginUser, checkRole.checkSuperAdmin, async (req, res, next) => {

  // create products object
  const productsDetails = new productsModule(req.body)
  // save products in database
  try {
    const addProducts=await productsDetails.save()
      console.log('successfully added products');
      res.status(200).json(addProducts)

  } catch (error) {
    res.status(500).send(error)
  }
});

module.exports = router;