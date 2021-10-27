const userModel = require('../Models/userModels');
const UserModel = require('../Models/userModels')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// login post
exports.login = (req, res, next) => {
    const { email, password } = req.body
    // bcrypt.compare(password, users.password).then((res)=>{

    // }).catch((err)=>{

    // })
    const user = new userModel()
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

// UPDATE USER 
exports.updateUser = (req, res, next) => {
    const { email, password, gender } = req.body
    const { userId } = req.query
    const user = new userModel()
    if (!userId) {
        res.status(404).send({ message: "User id is required*" })
    } else {
        user.findOneById({ id: userId }).then(([data, fieldData]) => {
            if (data?.length) {
                user.updateUserProfile({ email, password, gender, id: userId }).then(([rows, fieldData]) => {
                    res.status(200).send({
                        data: { email, password, gender, }, message: 'User Updated Successfully!', status: 200
                    })
                }).catch((error) => {
                    res.status(500).send({ error: error })
                })
            } else {
                res.status(404).send({ message: "User Not Exist", status: 404 })
            }
        }).catch((error) => {
            res.status(500).send({ error: error })
        })
    }
}


exports.deleteUser = (req, res, next) => {
    const { userId } = req.query
    const user = new userModel()
    if (!userId) {
        res.status(404).send({ message: "User id is required*", status: 404 })
    } else {
        user.findOneById({ id: userId }).then(([rows, fieldData]) => {
            if (rows?.length) {
                user.deleteUser({ id: userId }).then(([resultData, fieldData]) => {
                    const result = { ...rows[0], password: '&^%(^&**()*^)*&%' }
                    res.status(200).send({
                        data: result, message: 'User Deleted Successfully!',
                        status: 200
                    })
                }).catch((error) => {
                    res.status(500).send({ error: error })
                })
            } else {
                res.status(404).send({ message: "User Not Exist", status: 404 })
            }
        }).catch((error) => {
            res.status(500).send({ error: error })
        })
    }
}