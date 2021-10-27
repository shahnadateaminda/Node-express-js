
const db = require('../db/connection')

module.exports = class userModel {

    constructor() {
    }

    // validate login
    loginValidate(data) {
        const { email, password } = data
        const query = `SELECT _id, email, gender, created_at,updated_at FROM users WHERE email = ? AND password = ?`
        return db.execute(query, [email, password])
    }

    // signup user
    userSignUp(data) {
        const { email, password, gender } = data
        const query = `INSERT INTO users (email, password, gender, created_at, updated_at) VALUES (?,?,?,?,?)`
        return db.execute(query, [email, password, gender, new Date(), new Date()])
    }

    // update user
    updateUserProfile(data) {
        const { email, password, gender, id } = data
        const query = `UPDATE users SET email = ?, password = ?, gender = ?, updated_at = ? WHERE _id = ?`
        return db.execute(query, [email, password, gender, new Date(), id])
    }
    // user delete
    deleteUser(data) {
        const { id } = data
        const query = `DELETE FROM users WHERE _id = ?`
        return db.execute(query, [id])
    }

    // find one
    findOne(data) {
        const { email } = data
        const query = `SELECT * FROM users WHERE email = ?`
        return db.execute(query, [email])
    }

    // find one by id
    findOneById(data) {
        const { id } = data
        const query = `SELECT * FROM users WHERE _id = ?`
        return db.execute(query, [id])
    }


}