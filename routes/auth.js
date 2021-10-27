const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController')

/*  POST LOGIN */
router.post('/login', userCtrl.login);


/* POST SIGNUP */
router.post('/signup', userCtrl.signUp);

// UPDATE USER
router.put('/updateUser', userCtrl.updateUser)

// DELETE USER
router.delete('/deleteUser', userCtrl.deleteUser)



module.exports = router;