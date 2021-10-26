const userModel = require('../Models/userModels');
const UserModel = require('../Models/userModels')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// login post
exports.login = (req, res, next) => {
    const { email, password } = req.body
    const user = new userModel({ email, password })
    user.loginValidate({ email, password }).then(([rows, fieldData]) => {
        if (rows?.length) {
            // bcrypt.compare(password, rows[0].password).then((res) => {
            // }).catch((err) => {
            // })
            const token = jwt.sign({ email }, 'my_secret_key');
            res.status(200).send({ data: rows[0], message: 'Logged In Successfully', status: 200, token });
        } else {
            res.status(404).send('Not Found')
        }
    }).catch((error) =>
        res.status(500).send({ error: error?.message })
    )
}


// signup
exports.signUp = (req, res, next) => {
    const { email, password, gender } = req.body
    const user = new userModel()
    user.findOne({ email: email }).then(([rows, fieldData]) => {
        if (rows.length) {
            res.status(404).send({ data: [], message: "Email is already exist.Please Try with another email" })
        } else {
            user.userSignUp({ email, password, gender }).then(([rows, fieldData]) => {
                res.status(200).send({
                    message: 'User Created Successfully !', data: {
                        email,
                        password,
                        gender
                    },
                    status: 200
                })
            }).catch((error) => {
                res.status(500).send({ error: error })
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ error: error })
    })


}