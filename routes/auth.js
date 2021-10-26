const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController')

/*  POST LOGIN */
router.post('/login', userCtrl.login);


/* POST SIGNUP */
router.post('/signup', userCtrl.signUp);

module.exports = router;