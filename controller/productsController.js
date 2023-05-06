const { db, query } = require('../database')

module.exports = {
    createProduct: async (req, res) => {
        const { name, price, category } = req.body

        let insertQuery = `INSERT INTO products VALUES (null, ${db.escape(name)}, ${db.escape(price)}, ${db.escape(category)})`
        db.query(insertQuery, (err, result) => {
            if(err) {
                res.status(500).send(err)
            }
            db.query(`SELECT * FROM products WHERE name = ${db.escape(name)}`, (err2, result2) => {
                if (err2) {
                    res.status(500).send(err2)
                }
                res.status(200).send({ message: 'Product has been successfully added', data: result2 })
            })
        })
    },

    getProducts: async (req, res) => {
        let productsQuery = `SELECT * FROM products`
        if (req.query.name){
            productsQuery = `SELECT * FROM products WHERE name = ${db.escape(req.query.name)}`
        }
        db.query(productsQuery, (err, result) => {
            if(err) {
                res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    },

    editProducts: async (req, res) => {
        let productsUpdate = []
        for(let prop in req.body) {
            productsUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
        }
        let updateQuery = `UPDATE products set ${productsUpdate} WHERE id_product = ${req.params.id}`
        db.query(updateQuery, (err, results) => {
            if(err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },

    deleteProducts: async (req, res) => {
        let deleteQuery = `DELETE from products where id_product = ${db.escape(req.params.id)}`
        db.query(deleteQuery, (err, result) => {
            if(err) {
                res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    }
}