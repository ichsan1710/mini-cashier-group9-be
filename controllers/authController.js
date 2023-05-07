const { db, query } = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    register: async (req, res) => {
        const { nama_user, email_user, pw_user } = req.body
            // console.log(`print email: ${db.escape(email_user)}`)
        let getEmailQuery = `SELECT * FROM users WHERE email_user=${db.escape(email_user)}`
        let isEmailExist = await query(getEmailQuery)
        if (isEmailExist.length > 0) {
            return res.status(400).send({ message: 'Email has been used' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(pw_user, salt)

        let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(nama_user)}, ${db.escape(email_user)}, ${db.escape(hashPassword)}, true)`
        let addUserResult = await query(addUserQuery)
        return res.status(200).send({ data: addUserResult, message: "Register success" })
    },
    login: async (req, res) => {

        try {
            const { email_user, pw_user } = req.body
            const isEmailExist = await query(`SELECT * FROM users WHERE email_user=${db.escape(email_user)}`)
            if (isEmailExist.length == 0) {
                return res.status(400).send({ message: "Email or password is invalid" })
            }

            const isValid = await bcrypt.compare(pw_user, isEmailExist[0].pw_user)


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