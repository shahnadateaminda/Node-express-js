const users = []
const db = require('../db/connection')

module.exports = class userModel {

    constructor(data) {
        this.data = data
    }

    loginValidate(data) {
        const { email, password } = data
        const query = `SELECT _id, email, gender, created_at,updated_at FROM users WHERE email = ? AND password = ?`
        return db.execute(query, [email, password])
    }

    fetchAll() {
        return this.users
    }

    userSignUp(data) {
        const { email, password, gender } = data
        const query = `INSERT INTO users (email, password, gender, created_at, updated_at) VALUES (?,?,?,?,?)`
        return db.execute(query, [email, password, gender, new Date(), new Date()])
    }

    findOne(data) {
        const { email } = data
        const query = `SELECT * FROM users WHERE email = ?`
        return db.execute(query, [email])
    }


}