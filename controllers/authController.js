const { db, query } = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    register: async (req, res) => {
        const { username, email, password } = req.body

        let getEmailQuery = `SELECT * FROM users WHERE email_user=${db.escape(email)}`
        let isEmailExist = await query(getEmailQuery)
        if (isEmailExist.length > 0) {
            return res.status(400).send({ message: 'Email has been used' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(username)}, ${db.escape(email)}, ${db.escape(hashPassword)}, true)`
        let addUserResult = await query(addUserQuery)
        return res.status(200).send({ data: addUserResult, message: "Register success" })
    },
    login: async (req, res) => {

        try {
            const { email, password } = req.body
            const isEmailExist = await query(`SELECT * FROM users WHERE email_user=${db.escape(email)}`)
            if (isEmailExist.length == 0) {
                return res.status(400).send({ message: "Email or password is invalid" })
            }

            const isValid = await bcrypt.compare(password, isEmailExist[0].password)

            if (!isValid) {
                return res.status(400).send({ message: "Email or password is invalid" })
            }

            let payload = { id: isEmailExist[0].id_user, isAdmin: isEmailExist[0].is_admin }
            const token = jwt.sign(payload, 'thisIsTheS3cr3tK3y', { expiresIn: '1h' })

            return res.status(200).send({ token, message: "Login success", data: isEmailExist })

        } catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    },
    fetchAllUser: async (req, res) => {
        try {
            const users = await query(`SELECT * FROM users`)
            return res.status(200).send(users)
        } catch (error) {
            return res.status(error.statusCode || 500).send(error)
        }
    },
    fetchUser: async (req, res) => {
        try {
            const idParams = parseInt(req.params.id)
            if (req.user.id !== idParams) {
                return res.status(401).send("Unauthorized access")
            }

            const users = await query(`SELECT * FROM users WHERE id_user = ${db.escape(idParams)}`)
            return res.status(200).send(users)
        } catch (error) {
            return res.status(error.statusCode || 500).send(error)
        }
    }
}