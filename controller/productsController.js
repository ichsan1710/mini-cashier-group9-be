const { db, query } = require('../database')

module.exports = {
    createProduct: async (req, res) => {
        const { name, price, category } = req.body
        
        let getQueryName = `SELECT * FROM products WHERE name = ${db.escape(name)}`
        let isNameExist = await query(getQueryName)
        if (isNameExist.lenght > 0) {
            return res.status(400).send ({ message: 'Product is already existed'})
        }

        let addNameQuery = `INSERT INTO products VALUES (null, ${db.escape(name)}, ${db.escape(price)}, ${db.escape(category)}, false)`
        let addNameResult = await query(addNameQuery)
        return res.status(200).send({ data: addNameResult, message: "Register Success" })
    }
}