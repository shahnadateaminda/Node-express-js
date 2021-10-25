const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/userController')

/* GET home page. */
router.post('/login', loginCtrl.login);

module.exports = router;