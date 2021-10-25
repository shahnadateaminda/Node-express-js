const users = []
const db = require('../db/connection')

module.exports = class userModel {

    constructor(data) {
        this.data = data
    }

    loginValidate(data) {
        const { email, password } = data
        const query = `SELECT * FROM users WHERE email = ? AND password = ?`
        return db.execute(query, [email, password])
    }
    fetchAll() {
        return this.users
    }

}