const userModel = require('../Models/userModels');
const UserModel = require('../Models/userModels')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
    const { email, password } = req.body
    // bcrypt.compare(password, users.password).then((res)=>{

    // }).catch((err)=>{
        
    // })
    const user = new userModel({ email, password })
    user.loginValidate({ email, password }).then(([rows, fieldData]) => {
        if (rows?.length) {
            const token = jwt.sign({ email }, 'my_secret_key');
            res.status(200).send({ data: rows[0], message: 'Logged In Successfully', status: 200, token });
        } else {
            res.status(404).send('Not Found')
        }
    }).catch((error) => {
        res.status(500).send('Internal Server Error')

    })
}