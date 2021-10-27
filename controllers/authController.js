const authModel = require('../Models/authModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = new authModel()

// login post
exports.login = (req, res, next) => {
    const { email, password } = req.body

    auth.findOne({ email }).then(([rows, fieldData]) => {
        if (rows.length) {
            const userData = { ...rows[0] }
            console.log(password, 'password', userData.password);
            bcrypt.compare(password, userData.password)
                .then((respose) => {
                    if (respose) {
                        const token = jwt.sign({ email }, 'my_secret_key', { expiresIn: '9h' })
                        res.status(200).send({ data: userData, message: 'Logged In Successfully', status: 200, token });
                    } else {
                        res.status(404).send({ error: 'Invalid Password' })
                    }
                }).catch((error) => {
                    res.status(404).send({ error: error, status: 404 })
                })
        } else {
            res.status(404).send({ error: 'User Not Exist', status: 404 })
        }
    }).catch((error) =>
        res.status(500).send({ error: error, status: 500 })
    )

}


// signup
exports.signUp = (req, res, next) => {
    const { email, password, gender } = req.body

    auth.findOne({ email: email }).then(([rows, fieldData]) => {
        if (rows.length) {
            res.status(404).send({ data: [], message: "Email is already exist. Please Try with another email" })
        } else {
            return bcrypt.hash(password, 12).then((hash) => {
                auth.userSignUp({ email, password: hash, gender }).then(([rows, fieldData]) => {
                    res.status(200).send({
                        message: 'User Created Successfully !', data: { email, password: hash, gender }, status: 200
                    })
                }).catch((error) => {
                    res.status(500).send({ error: error, status: 500 })
                })
            }).catch((error) => {
                res.status(404).send({ error: error, status: 404 })
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ error: error, status: 500 })
    })
}

exports.logout = (req, res, next) => {
    res.status(200).send({ message: 'Logged Out Successfully !', status: 200 })
}